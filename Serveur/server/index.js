const express = require("express");
const app = express();
const cors = require('cors')
const bodyParser = require("body-parser");
const {userRouter}=require('../database/router/users')
app.set("port", 3333);
app.use(cors());
app.use(express.json());
app.use('/',userRouter)

module.exports = app;