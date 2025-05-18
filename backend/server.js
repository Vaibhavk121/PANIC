// Make sure dotenv is loaded at the very beginning
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const connectDB = require('./db');
const authRoutes = require('./routes/authRoutes');
const resourceRoutes = require('./routes/resourceRoutes');
const profileRoutes = require('./routes/profileRoutes');
const sosRoutes = require('./routes/sosRoutes');
const lostFoundRoutes = require('./routes/lostFoundRoutes');
const aiRoutes = require('./routes/aiRoutes');
const WebSocket = require('ws');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
connectDB();

// Base route
app.get('/', (req, res) => {
  res.send('PANIC Backend API is running');
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/resources', resourceRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/sos', sosRoutes);
app.use('/api/lostfound', lostFoundRoutes);
app.use('/api/ai', aiRoutes);

// Initialize WebSocket server
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const wss = new WebSocket.Server({ server });

// Keep track of all connected clients
const clients = new Set();
const activeUsers = new Map(); // Map to store deviceId -> ws connection

// Handle WebSocket connections
wss.on('connection', (ws, req) => {
  const clientIp = req.socket.remoteAddress;
  console.log(`Client connected from ${clientIp}`);
  
  // Add client to our set
  clients.add(ws);
  console.log(`Total connected clients: ${clients.size}`);
  
  // Send a welcome message to the newly connected client
  ws.send(JSON.stringify({
    type: 'system',
    message: 'Connected to PANIC WebSocket Server',
    timestamp: new Date().toISOString(),
    time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
  }));

  ws.on('message', (message) => {
    console.log(`Received message from ${clientIp}: ${message}`);
    try {
      const parsedMessage = JSON.parse(message);
      
      // Add timestamp and time if not present
      if (!parsedMessage.timestamp) {
        parsedMessage.timestamp = new Date().toISOString();
      }
      
      // Add formatted time for display
      parsedMessage.time = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
      
      // If this is a join message, store the device ID
      if (parsedMessage.type === 'join' && parsedMessage.deviceId) {
        activeUsers.set(parsedMessage.deviceId, ws);
        console.log(`Device ${parsedMessage.deviceId} joined. Total active users: ${activeUsers.size}`);
        
        // Broadcast the join to all clients
        const joinNotification = {
          type: 'system',
          message: `User ${parsedMessage.deviceId.substring(0, 8)} joined the chat`,
          timestamp: new Date().toISOString(),
          time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
        };
        
        broadcastMessage(joinNotification);
        return;
      }
      
      // Make sure the message has a type
      if (!parsedMessage.type) {
        parsedMessage.type = 'message';
      }
      
      // Log the message for debugging
      console.log('Broadcasting message:', JSON.stringify(parsedMessage));
      
      // Broadcast the message to all connected clients
      broadcastMessage(parsedMessage);
      
    } catch (error) {
      console.error('Invalid JSON message received:', error);
      // Send error back to client
      ws.send(JSON.stringify({
        type: 'error',
        message: 'Invalid message format. Please send valid JSON.',
        timestamp: new Date().toISOString(),
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
      }));
    }
  });

  ws.on('close', () => {
    console.log(`Client disconnected from ${clientIp}`);
    
    // Find and remove the device ID from activeUsers
    for (const [deviceId, client] of activeUsers.entries()) {
      if (client === ws) {
        activeUsers.delete(deviceId);
        console.log(`Device ${deviceId} left. Total active users: ${activeUsers.size}`);
        
        // Broadcast the leave to all clients
        const leaveNotification = {
          type: 'system',
          message: `User ${deviceId.substring(0, 8)} left the chat`,
          timestamp: new Date().toISOString(),
          time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
        };
        
        broadcastMessage(leaveNotification);
        break;
      }
    }
    
    clients.delete(ws);
    console.log(`Total connected clients: ${clients.size}`);
  });
  
  // Handle errors
  ws.on('error', (error) => {
    console.error(`WebSocket error for client ${clientIp}:`, error);
  });
});

// Function to broadcast a message to all clients
function broadcastMessage(message) {
  const jsonMessage = JSON.stringify(message);
  let broadcastCount = 0;
  
  clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(jsonMessage);
      broadcastCount++;
    }
  });
  
  console.log(`Broadcasted message to ${broadcastCount} clients`);
}

// Ping clients every 30 seconds to keep connections alive
setInterval(() => {
  clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.ping();
    }
  });
}, 30000);