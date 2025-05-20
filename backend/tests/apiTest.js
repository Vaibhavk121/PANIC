const axios = require('axios');

// Base URL for API requests
const API_URL = 'http://192.168.141.207:5000/api';
let authToken = '';
let userId = '';
let resourceId = '';
let profileId = '';
let sosId = '';
let lostFoundId = '';

// Test user credentials
const testUser = {
  name: 'Test User',
  email: 'deepu@gmail.com',
  password: 'password',
  phone: '1234567890'
};

// Test resource data
const testResource = {
  type: 'water',
  quantity: 10,
  latitude: 40.7128,
  longitude: -74.0060,
  description: 'Bottled water available'
};

// Test emergency profile data
const testProfile = {
  bloodType: 'O+',
  allergies: ['Peanuts', 'Penicillin'],
  medications: ['Insulin'],
  medicalConditions: ['Diabetes'],
  emergencyContacts: [
    {
      name: 'Emergency Contact',
      relationship: 'Family',
      phone: '9876543210'
    }
  ]
};

// Test SOS data
const testSOS = {
  latitude: 40.7128,
  longitude: -74.0060,
  message: 'Need immediate assistance!'
};

// Test lost/found person data
const testLostFound = {
  name: 'John Doe',
  age: 35,
  gender: 'male',
  status: 'lost',
  description: 'Last seen wearing blue jeans and red shirt',
  latitude: 40.7128,
  longitude: -74.0060,
  contactInfo: 'Call 555-1234'
};

// Test AI prompt data
const testAIPrompt = {
  question: 'What should I do during a flood?',
  location: {
    latitude: 40.7128,
    longitude: -74.0060
  }
};

// Helper function to log test results
const logTest = (testName, success, response = null, error = null) => {
  console.log(`\n----- ${testName} -----`);
  if (success) {
    console.log('✅ SUCCESS');
    if (response) {
      console.log('Response:', JSON.stringify(response.data, null, 2));
    }
  } else {
    console.log('❌ FAILED');
    if (error) {
      console.log('Error:', error.response ? error.response.data : error.message);
    }
  }
};

// Set auth token for authenticated requests
const setAuthHeader = () => {
  return {
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  };
};

// Main test function
const runTests = async () => {
  try {
    console.log('🚀 Starting API tests for PANIC-DSE Backend...\n');

    // 1. Test Auth APIs
    console.log('\n===== TESTING AUTH APIs =====');
    
    // Register user
    try {
      const registerRes = await axios.post(`${API_URL}/auth/register`, testUser);
      logTest('Register User', true, registerRes);
      authToken = registerRes.data.token;
      userId = registerRes.data._id;
    } catch (error) {
      // If user already exists, try logging in
      logTest('Register User', false, null, error);
      console.log('User might already exist. Trying login...');
      
      try {
        const loginRes = await axios.post(`${API_URL}/auth/login`, {
          email: testUser.email,
          password: testUser.password
        });
        logTest('Login User', true, loginRes);
        authToken = loginRes.data.token;
        userId = loginRes.data._id;
      } catch (loginError) {
        logTest('Login User', false, null, loginError);
        console.log('❌ Authentication failed. Stopping tests.');
        return;
      }
    }

    // 2. Test Resource APIs
    console.log('\n===== TESTING RESOURCE APIs =====');
    
    // Create resource
    try {
      const createResourceRes = await axios.post(
        `${API_URL}/resources`,
        testResource,
        setAuthHeader()
      );
      logTest('Create Resource', true, createResourceRes);
      resourceId = createResourceRes.data._id;
    } catch (error) {
      logTest('Create Resource', false, null, error);
    }
    
    // Get all resources
    try {
      const getAllResourcesRes = await axios.get(`${API_URL}/resources`);
      logTest('Get All Resources', true, getAllResourcesRes);
    } catch (error) {
      logTest('Get All Resources', false, null, error);
    }
    
    // Get nearby resources
    try {
      const getNearbyResourcesRes = await axios.get(
        `${API_URL}/resources/nearby?lat=${testResource.latitude}&lng=${testResource.longitude}&radius=5000`
      );
      logTest('Get Nearby Resources', true, getNearbyResourcesRes);
    } catch (error) {
      logTest('Get Nearby Resources', false, null, error);
    }

    // 3. Test Emergency Profile APIs
    console.log('\n===== TESTING EMERGENCY PROFILE APIs =====');
    
    // Create profile
    try {
      const createProfileRes = await axios.post(
        `${API_URL}/profile`,
        testProfile,
        setAuthHeader()
      );
      logTest('Create Emergency Profile', true, createProfileRes);
      profileId = createProfileRes.data._id;
    } catch (error) {
      logTest('Create Emergency Profile', false, null, error);
    }
    
    // Get my profile
    try {
      const getMyProfileRes = await axios.get(
        `${API_URL}/profile/me`,
        setAuthHeader()
      );
      logTest('Get My Emergency Profile', true, getMyProfileRes);
    } catch (error) {
      logTest('Get My Emergency Profile', false, null, error);
    }
    
    // Get profile by userId
    try {
      const getProfileByUserIdRes = await axios.get(
        `${API_URL}/profile/${userId}`,
        setAuthHeader()
      );
      logTest('Get Emergency Profile by UserId', true, getProfileByUserIdRes);
    } catch (error) {
      logTest('Get Emergency Profile by UserId', false, null, error);
    }

    // 4. Test SOS APIs
    console.log('\n===== TESTING SOS APIs =====');
    
    // Create SOS alert
    try {
      const createSOSRes = await axios.post(
        `${API_URL}/sos`,
        testSOS,
        setAuthHeader()
      );
      logTest('Create SOS Alert', true, createSOSRes);
      sosId = createSOSRes.data._id;
    } catch (error) {
      logTest('Create SOS Alert', false, null, error);
    }
    
    // Get my SOS history
    try {
      const getMySOSHistoryRes = await axios.get(
        `${API_URL}/sos/me`,
        setAuthHeader()
      );
      logTest('Get My SOS History', true, getMySOSHistoryRes);
    } catch (error) {
      logTest('Get My SOS History', false, null, error);
    }
    
    // Update SOS status
    if (sosId) {
      try {
        const updateSOSRes = await axios.put(
          `${API_URL}/sos/${sosId}`,
          { status: 'resolved' },
          setAuthHeader()
        );
        logTest('Update SOS Status', true, updateSOSRes);
      } catch (error) {
        logTest('Update SOS Status', false, null, error);
      }
    }

    // 5. Test Lost/Found APIs
    console.log('\n===== TESTING LOST/FOUND APIs =====');
    
    // Report lost/found person
    try {
      const reportPersonRes = await axios.post(
        `${API_URL}/lostfound`,
        testLostFound,
        setAuthHeader()
      );
      logTest('Report Lost/Found Person', true, reportPersonRes);
      lostFoundId = reportPersonRes.data._id;
    } catch (error) {
      logTest('Report Lost/Found Person', false, null, error);
    }
    
    // Get all lost/found reports
    try {
      const getAllReportsRes = await axios.get(`${API_URL}/lostfound`);
      logTest('Get All Lost/Found Reports', true, getAllReportsRes);
    } catch (error) {
      logTest('Get All Lost/Found Reports', false, null, error);
    }
    
    // Get lost/found report by ID
    if (lostFoundId) {
      try {
        const getReportByIdRes = await axios.get(`${API_URL}/lostfound/${lostFoundId}`);
        logTest('Get Lost/Found Report by ID', true, getReportByIdRes);
      } catch (error) {
        logTest('Get Lost/Found Report by ID', false, null, error);
      }
    }
    
    // Update lost/found report
    if (lostFoundId) {
      try {
        const updateReportRes = await axios.put(
          `${API_URL}/lostfound/${lostFoundId}`,
          { resolved: true, additionalInfo: 'Person has been found' },
          setAuthHeader()
        );
        logTest('Update Lost/Found Report', true, updateReportRes);
      } catch (error) {
        logTest('Update Lost/Found Report', false, null, error);
      }
    }

    // 6. Test AI APIs
    console.log('\n===== TESTING AI APIs =====');
    
    // Test Gemini API connection
    try {
      const testGeminiRes = await axios.get(
        `${API_URL}/ai/test`,
        setAuthHeader()
      );
      logTest('Test Gemini API Connection', true, testGeminiRes);
    } catch (error) {
      logTest('Test Gemini API Connection', false, null, error);
    }
    
    // Generate AI prompt
    try {
      testAIPrompt.userId = userId;
      const generatePromptRes = await axios.post(
        `${API_URL}/ai/prompt`,
        testAIPrompt,
        setAuthHeader()
      );
      logTest('Generate AI Prompt', true, generatePromptRes);
    } catch (error) {
      logTest('Generate AI Prompt', false, null, error);
    }

    console.log('\n🏁 API tests completed!');
    console.log(Authorization);
    
  } catch (error) {
    console.error('Error running tests:', error);
  }
};



// Run the tests
runTests();