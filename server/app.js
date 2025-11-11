require('dotenv').config();
const express = require('express')
const app = express();
const getDataRoute = require('./routes/getData')
const cors = require('cors');
app.use(cors(
  {
    origin: ['https://weather-app-one-tawny-64.vercel.app' ,'http://localhost:3000'],
  }));
app.use(express.json());

app.use('/getdata',getDataRoute);

//for uptimebot
app.get("/keep-alive", (req, res) => {
  res.send("I'm alive!");
});

app.listen(process.env.PORT,()=>{
    console.log('app running on',process.env.PORT);
})