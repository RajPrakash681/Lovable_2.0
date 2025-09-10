const WebSocket = require('ws');
const http = require('http');
const url = require('url');

// Create HTTP server
const server = http.createServer();

// Create WebSocket server
const wss = new WebSocket.Server({ server });

// Store active connections
const connections = new Map();

wss.on('connection', (ws, req) => {
  console.log('Client connected to proxy');
  
  const parsedUrl = url.parse(req.url, true);
  const targetUrl = parsedUrl.query.target;
  const token = parsedUrl.query.token;
  
  if (!targetUrl || !token) {
    console.error('Missing target URL or token');
    ws.close(1008, 'Missing target URL or token');
    return;
  }
  
  console.log('Connecting to target:', targetUrl);
  
  // Create connection to Beam Cloud with headers
  const beamWs = new WebSocket(targetUrl, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  
  const connectionId = Date.now();
  connections.set(connectionId, { client: ws, beam: beamWs });
  
  beamWs.on('open', () => {
    console.log('Connected to Beam Cloud');
    ws.send(JSON.stringify({ type: 'connected', data: 'Connected to Beam Cloud' }));
  });
  
  beamWs.on('message', (data) => {
    console.log('Received from Beam:', data.toString());
    ws.send(data.toString());
  });
  
  beamWs.on('close', (code, reason) => {
    console.log('Beam connection closed:', code, reason);
    ws.close(code, reason);
    connections.delete(connectionId);
  });
  
  beamWs.on('error', (error) => {
    console.error('Beam connection error:', error);
    ws.send(JSON.stringify({ type: 'error', error: error.message }));
    connections.delete(connectionId);
  });
  
  ws.on('message', (data) => {
    console.log('Received from client:', data.toString());
    if (beamWs.readyState === WebSocket.OPEN) {
      beamWs.send(data.toString());
    }
  });
  
  ws.on('close', () => {
    console.log('Client disconnected');
    beamWs.close();
    connections.delete(connectionId);
  });
  
  ws.on('error', (error) => {
    console.error('Client connection error:', error);
    beamWs.close();
    connections.delete(connectionId);
  });
});

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
  console.log(`WebSocket proxy server running on port ${PORT}`);
  console.log(`Connect to: ws://localhost:${PORT}?target=${encodeURIComponent('wss://73b5d12d-8c0b-461d-bbb4-d4162938cf2c.app.beam.cloud')}&token=YOUR_TOKEN`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('Shutting down proxy server...');
  connections.forEach(({ client, beam }) => {
    client.close();
    beam.close();
  });
  server.close(() => {
    console.log('Proxy server stopped');
    process.exit(0);
  });
}); 