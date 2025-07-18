const express = require('express');
const Router = express.Router();
const {locInputData,locData} = require('../controllers/getDataController')

Router.post('/getLocInputInfo',locInputData);
Router.post('/getLocInfo',locData);

module.exports = Router;