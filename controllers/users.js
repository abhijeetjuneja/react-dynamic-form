var mongoose = require('mongoose');
var express = require('express');
var app         = express();
var userRouter  = express.Router();
var config = require('../config/config');


//Export controller function
module.exports.controllerFunction = function(app) {

    userRouter.get('/fields/all', (req, res) => {
      res.status(200).json({ fields : config.fields });
    });


    //name api
    app.use('/api/users', userRouter);




};//end contoller code
