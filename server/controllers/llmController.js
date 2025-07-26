const axios = require('axios');
const { Together } = require('together-ai');
require('dotenv').config();

// Initialize Together AI SDK
const together = new Together({
  apiKey: process.env.TOGETHER_API,
});

//  Route: Get fun fact based on location array
const funFactAi = async (req, res) => {
  try {

    const locationArr = req.body.location;
    if (!Array.isArray(locationArr) || locationArr.length === 0) {
      return res.status(400).json({ error: 'Location must be a non-empty array.' });
    }

    const loc = locationArr.join(',');

    const response = await together.chat.completions.create({
      model: 'lgai/exaone-3-5-32b-instruct',
      messages: [
        {
          role: 'system',
          content: 'You are an expert in knowing the geolocation and funfact and general knowledge and you will be asked a question. Give answer strictly in less than 40 words.'
        },
        {
          role: 'user',
          content: `Tell me a fun fact about ${loc}`
        }
      ]
    });

    const answer = response.choices?.[0]?.message?.content?.trim() || "No response from AI.";
    return res.status(200).json({ response: answer });

  } catch (error) {
    console.error('❌ Error in funFactAi:', error.response?.data || error.message);
    return res.status(500).json({ error: 'Failed to fetch fun fact from Together AI' });
  }
};


const askTogetherAI = async (req, res) => {
  let chat = [...req.body.aiResponse,{role:'user',content:req.body.userPrompt}]
  console.log(chat);
  try {
    const { systemPrompt, userPrompt } = req.body;
    const response = await axios.post(
      'https://api.together.xyz/v1/chat/completions',
      {
        model: 'meta-llama/Llama-3-8b-chat-hf',
        messages: [{ role: 'system', content: 'ALWAYS ANSWER IN LESS THEN 30 WORDS' }, ...chat],
        temperature: 0.7,
        max_tokens: 1024,
        top_p: 0.9
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.TOGETHER_API}`,
          'Content-Type': 'application/json'
        }
      }
    );

    res.status(200).json({response:response.data.choices[0].message.content.trim()});
    
  } catch (error) {
    console.error(' Error in askTogetherAI:', error.response?.data || error.message);
    throw new Error('Failed to get response from Together AI');
    res.status(200).json({response:'sorry the ai is under maintanece right now'});
  }
};

module.exports = { funFactAi, askTogetherAI };
