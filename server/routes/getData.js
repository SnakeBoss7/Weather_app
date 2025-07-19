const express = require('express');
const Router = express.Router();
const {locInputData,locData} = require('../controllers/getDataController')
const {funFactAi} = require('../controllers/llmController')
Router.post('/getLocInputInfo',locInputData);
Router.post('/getLocInfo',locData);
Router.post('/getFunFact',funFactAi);

module.exports = Router;