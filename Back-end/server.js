const express = require('express');
const connectDb = require('./config/Dbconnection');
const cors = require('cors');
const app = express();
app.use(cors());
const bodyparser = require("body-parser")
const dotenv = require('dotenv').config();
app.use(bodyparser.json());
app.use("/",require("./Route/Contactroute"))
const port = process.env.PORT || 5001
// app.use(express.json());
connectDb();
app.listen(port, ()=>{
    console.log(`server running on http://localhost:${port}`);
})