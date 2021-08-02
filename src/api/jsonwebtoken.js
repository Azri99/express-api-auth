const express = require('express');
const router = express.Router();

const jwt = require('../middleware/jwt');

router.post('/signin' , (req, res, next) => {
    res.json(jwt.signIn({email:req.body.email}));
});

router.get('/verify', jwt.verifyToken , (req, res, next) => {
  res.json({
      accesstoken: req.headers['newaccesstoken'] ? req.headers['newaccesstoken'] :  req.headers['accesstoken'],
      publictoken: req.headers['publictoken'],
      refreshtoken : req.headers['newaccesstoken'] ? true : false
  });
});

router.get('/signout', jwt.signOut , (req, res, next) => {
  res.json({
      message : 'sign out bye'
  });
});


module.exports = router;
