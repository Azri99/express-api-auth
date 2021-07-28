const express = require('express');
const router = express.Router();

const jwt = require('../middleware/jwt');


router.post('/signin' , (req, res, next) => {
    res.json(jwt.signIn({email:req.body.email}));
});

router.get('/verify', jwt.verifyToken , (req, res, next) => {
  res.json({
    message : 'token verified'
  });
});

module.exports = router;
