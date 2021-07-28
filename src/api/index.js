const express = require('express');

const emojis = require('./emojis');
const jsonwebtoken = require('./jsonwebtoken');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏'
  });
});

router.use('/emojis', emojis);
router.use('/jwt', jsonwebtoken);

module.exports = router;
