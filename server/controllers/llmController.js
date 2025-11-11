const axios = require('axios');
const { OpenAI } = require("openai");
const { response } = require("express");

require('dotenv').config();
const USERNAME = process.env.USERNAME_KEY || null;
const openai_NVIDIA = new OpenAI({
  apiKey: process.env.NVIDIA_API_KEY,
  baseURL: "https://integrate.api.nvidia.com/v1",
});



//  Route: Get fun fact based on location array
const funFactAi = async (req, res) => {
  const { lat,lng } = req.body.location;

const url = `  http://api.geonames.org/findNearbyPlaceNameJSON?lat=${lat}&lng=${lng}&username=${USERNAME}`

  
  try {
    const response  = await axios.get(url, { timeout: 8000 });
    const {adminName1,toponymName,countryName}=response.data.geonames[0];

     const completion = await openai_NVIDIA.chat.completions.create({
      model: "nvidia/llama-3.3-nemotron-super-49b-v1.5", // Fast + high quality
      messages: [
        {
          role: "system",
          content: 'You are an expert in knowing the geolocation and funfact and general knowledge and you will be asked a question. Give answer strictly in less than 30 words. and only fact text no greeting of explanation' + `/no_think`,
        },
        {
          role: "user",
          content: `Tell me a fun fact about ${adminName1} ,${toponymName},${countryName}`,
        },
      ],
      temperature: 0.6,
      top_p: 0.7,
      max_tokens: 2048,
      stream: false, // No streaming
    });

   console.log(completion.choices[0].message.content);  // CORRECT
    const answer = completion.choices?.[0]?.message?.content?.trim() || "No response from AI.";
    return res.status(200).json({ response: answer });

  } catch (error) {
    console.error('❌ Error in funFactAi:', error.response?.data || error.message);
    return res.status(500).json({ error: 'Failed to fetch fun fact from Together AI' });
  }
};


const askTogetherAI = async (req, res) => {
  try {
    const { systemPrompt, userPrompt, aiResponse = [] } = req.body;
    
    // Validate inputs
    if (!userPrompt?.trim()) {
      return res.status(400).json({ 
        response: '<p style="color: #ff4444;">Please provide a valid question.</p>' 
      });
    }

    // Build conversation history
    const chat = [
      ...aiResponse,
      { role: 'user', content: userPrompt }
    ];

    console.log('Chat history:', chat);

    // Enhanced system prompt with no_think instruction
    const enhancedSystemPrompt = ` Keep answers under 10 words. Use HTML tags for formatting. Use <span style="color: #45BBFF"> for highlights. Use <strong> for emphasis. Keep it concise and well-structured. NO markdown, only HTML.` +'/no_think';

    // API call with error handling
    const completion = await openai_NVIDIA.chat.completions.create({
      model: "nvidia/llama-3.3-nemotron-super-49b-v1.5",
      messages: [
        { role: 'system', content: enhancedSystemPrompt },
        ...chat
      ],
      temperature: 0.6,
      top_p: 0.7,
      max_tokens: 2048,
      stream: false
    });

    // Extract and format response
    const aiMessage = completion.choices[0]?.message?.content?.trim();
    
    if (!aiMessage) {
      return res.status(500).json({ 
        response: '<p style="color: #ff9800;">AI returned empty response. Please try again.</p>' 
      });
    }

    // Return formatted response
    return res.status(200).json({ 
      response: aiMessage 
    });

  } catch (error) {
    console.error('AI API Error:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data
    });

    // Handle specific error types
    if (error.response?.status === 401) {
      return res.status(401).json({ 
        response: '<p style="color: #ff4444;"><strong>Authentication Error:</strong> Invalid API key. Please check configuration.</p>' 
      });
    }

    if (error.response?.status === 429) {
      return res.status(429).json({ 
        response: '<p style="color: #ff9800;"><strong>Rate Limit:</strong> Too many requests. Please wait a moment.</p>' 
      });
    }

    // Generic error response
    return res.status(500).json({ 
      response: '<p style="color: #ff6b6b;">AI service temporarily unavailable. <span style="color: #45BBFF;">Please try again in a moment.</span></p>' 
    });
  }
};

module.exports = { funFactAi, askTogetherAI };
