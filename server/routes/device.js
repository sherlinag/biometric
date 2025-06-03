const express = require('express');
const axios = require('axios');
const db = require('../db/database');
const { encrypt } = require('../utils/encryption');

const router = express.Router();

router.post('/auth-device', async (req, res) => {
  const { ip, username, password } = req.body;

  if (!ip || !username || !password) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  const url = `http://${ip}/ISAPI/System/deviceInfo?format=json&devIndex=8B218013-9AAF-4153-8445-9D83EE25E688`;

  try {
    const response = await axios.get(url, {
      auth: { username, password },
      timeout: 5000,
    });

    const encryptedPassword = encrypt(password);

    db.run(
      `INSERT INTO device_auth (ip, username, password, response) VALUES (?, ?, ?, ?)`,
      [ip, username, encryptedPassword, JSON.stringify(response.data)],
      function (err) {
        if (err) return res.status(500).json({ error: 'DB Error', detail: err.message });

        res.json({ success: true, message: 'Login successful', data: response.data });
      }
    );
  } catch (error) {
    res.status(401).json({ error: 'Authentication failed', detail: error.message });
  }
});

module.exports = router;
