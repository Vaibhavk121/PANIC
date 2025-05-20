const { GoogleGenerativeAI } = require('@google/generative-ai');

// Simple rate limiting variables
let lastRequestTime = 0;
const MIN_REQUEST_INTERVAL = 10000; // 10 seconds between requests

// Helper function to wait for a specified time
const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// @desc    Generate an AI prompt based on user input
// @route   POST /api/ai/prompt
// @access  Private
exports.generatePrompt = async (req, res) => {
  try {
    const { question, location, userId } = req.body;
    
    // Validate input
    if (!question) {
      return res.status(400).json({ message: 'Question is required' });
    }
    
    // Get user information if userId is provided
    let userContext = '';
    if (userId) {
      try {
        const User = require('../models/User');
        const EmergencyProfile = require('../models/EmergencyProfile');
        
        const user = await User.findById(userId);
        const profile = await EmergencyProfile.findOne({ userId });
        
        if (user) {
          userContext = `User Information: Name: ${user.name}, `;
          
          if (profile) {
            userContext += `Blood Type: ${profile.bloodType}, `;
            if (profile.medicalConditions && profile.medicalConditions.length > 0) {
              userContext += `Medical Conditions: ${profile.medicalConditions.join(', ')}, `;
            }
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        // Continue without user data if there's an error
      }
    }
    
    // Get location context if provided
    let locationContext = '';
    if (location && location.latitude && location.longitude) {
      locationContext = `User Location: Latitude ${location.latitude}, Longitude ${location.longitude}. `;
      
      // Optionally, you could fetch nearby resources or hazards here
      try {
        const Resource = require('../models/Resource');
        const nearbyResources = await Resource.find({
          location: {
            $near: {
              $geometry: {
                type: 'Point',
                coordinates: [location.longitude, location.latitude]
              },
              $maxDistance: 5000 // 5km radius
            }
          }
        }).limit(5);
        
        if (nearbyResources.length > 0) {
          locationContext += `Nearby resources: ${nearbyResources.map(r => 
            `${r.type} (${r.quantity} units)`).join(', ')}. `;
        }
      } catch (error) {
        console.error('Error fetching nearby resources:', error);
        // Continue without nearby resources if there's an error
      }
    }
    
    // Generate the prompt
    const promptText = `
You are a disaster management assistant for the PANIC Disaster Support and Emergency system.

${userContext}
${locationContext}

User Question: ${question}

Please provide a concise, clear, and well-formatted answer (preferably in bullet points or short paragraphs). 
Limit your response to the most important information. 
If the question is about immediate danger, emphasize safety first and recommend contacting emergency services.
If you don't know specific local information, be honest about your limitations.
`;

    // Check if GEMINI_API_KEY is set
    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ 
        message: 'Gemini API key not configured',
        prompt: promptText.trim()
      });
    }

    // Apply rate limiting
    const now = Date.now();
    const timeSinceLastRequest = now - lastRequestTime;
    
    if (timeSinceLastRequest < MIN_REQUEST_INTERVAL) {
      const waitTime = MIN_REQUEST_INTERVAL - timeSinceLastRequest;
      await wait(waitTime);
    }
    
    // Initialize Gemini API with the correct model
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    // Generate content with Gemini
    let result;
    try {
      lastRequestTime = Date.now();
      result = await model.generateContent(promptText);
    } catch (error) {
      if (error.status === 429) {
        // If we hit rate limits, extract retry delay from error
        const retryDelay = error.errorDetails?.find(d => d['@type'] === 'type.googleapis.com/google.rpc.RetryInfo')?.retryDelay;
        const delayMs = retryDelay ? parseInt(retryDelay.replace('s', '')) * 1000 : 60000;
        
        // Return a more user-friendly message
        return res.status(429).json({
          message: 'AI service is currently busy. Please try again in a minute.',
          prompt: promptText.trim(),
          retryAfter: delayMs / 1000
        });
      }
      throw error;
    }
    
    const response = result.response;
    // Try to get markdown or bullet points if available, else fallback to plain text
    let aiResponse = response.text();

    // Optionally, trim long responses (e.g., max 1200 chars)
    if (aiResponse.length > 1200) {
      aiResponse = aiResponse.slice(0, 1200) + '\n\n...response truncated for brevity.';
    }

    res.json({ 
      prompt: promptText.trim(),
      response: aiResponse,
      metadata: {
        hasUserContext: !!userContext,
        hasLocationContext: !!locationContext
      }
    });
    
  } catch (error) {
    console.error('Error generating AI response:', error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Test Gemini API connection
// @route   GET /api/ai/test
// @access  Private
exports.testGeminiAPI = async (req, res) => {
  try {
    // Check if GEMINI_API_KEY is set
    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ 
        success: false,
        message: 'Gemini API key not configured'
      });
    }

    // Apply rate limiting
    const now = Date.now();
    const timeSinceLastRequest = now - lastRequestTime;
    
    if (timeSinceLastRequest < MIN_REQUEST_INTERVAL) {
      const waitTime = MIN_REQUEST_INTERVAL - timeSinceLastRequest;
      await wait(waitTime);
    }

    // Initialize Gemini API with the correct model
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    // Simple test prompt
    const testPrompt = "Hello, can you provide a brief response to test the API connection?";

    // Generate content with Gemini
    let result;
    try {
      lastRequestTime = Date.now();
      result = await model.generateContent(testPrompt);
    } catch (error) {
      if (error.status === 429) {
        // If we hit rate limits, extract retry delay from error
        const retryDelay = error.errorDetails?.find(d => d['@type'] === 'type.googleapis.com/google.rpc.RetryInfo')?.retryDelay;
        const delayMs = retryDelay ? parseInt(retryDelay.replace('s', '')) * 1000 : 60000;
        
        return res.status(429).json({
          success: false,
          message: 'AI service quota exceeded. Please try again later.',
          retryAfter: delayMs / 1000
        });
      }
      throw error;
    }
    
    const response = result.response;
    const aiResponse = response.text();

    res.json({ 
      success: true,
      message: 'Gemini API connection successful',
      response: aiResponse
    });
    
  } catch (error) {
    console.error('Error testing Gemini API:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Gemini API connection failed', 
      error: error.message 
    });
  }
};