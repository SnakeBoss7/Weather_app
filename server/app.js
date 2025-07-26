const express = require('express')
const app = express();
const getDataRoute = require('./routes/getData')
const cors = require('cors');
app.use(cors());
app.use(express.json());
require('dotenv').config();
app.use('/getdata',getDataRoute);
app.get("/keep-alive", (req, res) => {
  res.send("I'm alive!");
});
app.listen(process.env.PORT,()=>{
    console.log('app running on',process.env.PORT);
})