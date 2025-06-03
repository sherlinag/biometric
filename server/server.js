const express = require('express');
const https = require('https');
const axios = require('axios');
const crypto = require('crypto');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(express.json());
app.use(cors());

// Serve the UI HTML on root
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Helper: parse WWW-Authenticate header for digest auth
function parseWWWAuthenticate(header) {
  const parts = header.match(/(\w+)="?([^",]+)"?/g);
  const obj = {};
  if (!parts) return obj;
  parts.forEach((part) => {
    const [key, val] = part.split('=');
    obj[key] = val.replace(/"/g, '');
  });
  return obj;
}

// Helper: generate digest auth header
function generateDigestAuthHeader({ username, password, method, uri, wwwAuth, nc, cnonce }) {
  const realm = wwwAuth.realm;
  const nonce = wwwAuth.nonce;
  const qop = wwwAuth.qop;
  const algorithm = wwwAuth.algorithm || 'MD5';

  // HA1 = MD5(username:realm:password)
  const ha1 = crypto.createHash('md5').update(`${username}:${realm}:${password}`).digest('hex');

  // HA2 = MD5(method:uri)
  const ha2 = crypto.createHash('md5').update(`${method}:${uri}`).digest('hex');

  // Response = MD5(HA1:nonce:nonceCount:cnonce:qop:HA2)
  const response = crypto
    .createHash('md5')
    .update(`${ha1}:${nonce}:${nc}:${cnonce}:${qop}:${ha2}`)
    .digest('hex');

  // Construct Authorization header value
  return `Digest username="${username}", realm="${realm}", nonce="${nonce}", uri="${uri}", algorithm=${algorithm}, response="${response}", qop=${qop}, nc=${nc}, cnonce="${cnonce}"`;
}


app.post('/sendtoserver', async (req, res) => {
  try {
    const dataFromFrontend = req.body;

    // Forward to https://campus.ordinal.in/api/callback
    const response = await fetch('https://campus.ordinal.in/api/callback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
          dataFromFrontend:dataFromFrontend
        })
    });

    const responseData = await response.json();

    // Send the response back to the frontend
    res.status(response.status).json(responseData);
  } catch (err) {
    console.error('Error sending to callback:', err);
    res.status(500).json({ error: 'Failed to send to callback' });
  }
});



app.post('/fetch', async (req, res) => {
  const { url, username, password, body } = req.body;

  if (!url || !username || !password || !body) {
    return res.status(400).json({ error: 'Missing required parameters: url, username, password, body' });
  }

  try {
    // First unauthenticated request to get the 401 challenge
    const initialResponse = await axios({
      method: 'POST',
      url,
      headers: {
        'User-Agent': 'Node.js Client',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      data: body,
      httpsAgent: new https.Agent({ rejectUnauthorized: false }),
      validateStatus: null,
    });

    if (initialResponse.status !== 401) {
      return res.status(500).json({ error: 'Unexpected success without authentication' });
    }

    const wwwAuthHeader = initialResponse.headers['www-authenticate'];
    if (!wwwAuthHeader) {
      return res.status(500).json({ error: 'No WWW-Authenticate header received' });
    }

    const wwwAuth = parseWWWAuthenticate(wwwAuthHeader);

    const nc = '00000001';
    const cnonce = crypto.randomBytes(8).toString('hex');
    const method = 'POST';
    const urlObj = new URL(url);
    const uri = urlObj.pathname + urlObj.search;

    const authHeader = generateDigestAuthHeader({ username, password, method, uri, wwwAuth, nc, cnonce });

    try {
      // Authenticated request to Hikvision device
      const response = await axios({
        method: 'POST',
        url,
        headers: {
          'Authorization': authHeader,
          'User-Agent': 'Node.js Client',
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        httpsAgent: new https.Agent({ rejectUnauthorized: false }),
        data: body,
      });

      const receivedData = response.data;

      // ✅ Forward to target API endpoint
      const callbackUrl = 'https://campus.ordinal.in/api/callback';
      try {
        await axios.post(callbackUrl, receivedData, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
      } catch (callbackErr) {
        console.error('Error forwarding data to callback:', callbackErr.message);
      }

      // Return response to the frontend regardless
      return res.json(receivedData);

    } catch (authErr) {
      return res.status(500).json({
        error: 'Authenticated request failed',
        detail: authErr.response?.data || authErr.message || authErr.toString(),
      });
    }

  } catch (error) {
    return res.status(500).json({
      error: 'Initial request failed',
      detail: error.response?.data || error.message || error.toString(),
    });
  }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Digest Auth Proxy Server listening on port ${PORT}`);
});
