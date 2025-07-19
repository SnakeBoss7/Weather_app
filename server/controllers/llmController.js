const Together = require('together-ai');


const together = new Together({
  apiKey: 'd7d0b6c58e52f937c8730086974749e12a4a7e5995cc51de7c0c8a0e021ef6c9'
});

// Route to call Together AI for Fun fact
const funFactAi= async (req, res) => {
    try {
      console.log('chatting')
    console.log('chatting')
    const loc = req.body.location.join(',');
    const response = await together.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: 'You are an expert in knowing the geolocation and funfact and general knowledge and you will be asked a question Give answer Stricly in less then 40 words'
        },
        {
            role: 'user',
          content: `Tell me a fun fact about ${loc}`
        }
      ],
      model: 'lgai/exaone-3-5-32b-instruct'
    });

    const answer = response.choices[0].message.content;
    res.status(200).json({response:answer});
  } catch (error) {
    console.error('Error calling Together AI:', error);
    res.status(500).json({ error: 'Failed to fetch from Together AI' });
  }
};
module.exports = {funFactAi};