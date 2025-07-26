const express = require('express');
const Router = express.Router();
const {locInputData,locData,weathData} = require('../controllers/getDataController')
const {funFactAi, askTogetherAI} = require('../controllers/llmController')
Router.post('/getLocInputInfo',locInputData);
Router.post('/getLocInfo',locData);
Router.post('/getFunFact',funFactAi);
Router.post('/getWeathData',weathData);
Router.post('/askTogetherAi',askTogetherAI);

module.exports = Router;