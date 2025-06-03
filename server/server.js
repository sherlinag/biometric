// backend/server.js
const express = require('express');
const cors = require('cors');
const DigestFetch = require('digest-fetch').default;
const https = require('https');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// HTTPS agent to skip self-signed certificate errors
const agent = new https.Agent({
  rejectUnauthorized: false,
});

app.post('/fetch', async (req, res) => {
  try {
    const { url, username, password, body } = req.body;

    if (!url || !username || !password || !body) {
      return res.status(400).json({ error: 'Missing required fields.' });
    }

    const client = new DigestFetch(username, password);
    const response = await client.fetch(url, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
      agent,
    });

    const json = await response.json();
    res.json(json);
  } catch (error) {
    console.error('Error in /fetch:', error);
    res.status(500).json({ error: error.message });
  }
});

app.post('/sendtoserver', (req, res) => {
  const { dataFromFrontend } = req.body;

  if (!dataFromFrontend) {
    return res.status(400).json({ error: 'No data received' });
  }

  console.log('Data received from frontend:', dataFromFrontend);
  // TODO: process/store the data (e.g., forward to ERP, save to DB)

  res.json({ status: 'Success', received: dataFromFrontend });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
