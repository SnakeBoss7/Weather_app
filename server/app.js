require('dotenv').config();
const express = require('express')
const app = express();
const getDataRoute = require('./routes/getData')
const cors = require('cors');
app.use(cors(
  {
    origin: process.env.FRONTEND_URI,
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