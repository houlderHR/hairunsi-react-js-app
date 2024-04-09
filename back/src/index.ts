import { Express, Request, Response } from "express";
import express = require('express');
import dotenv = require('dotenv')
import bodyParser = require("body-parser");


dotenv.config();

const port = process.env.PORT || 8080;
const app: Express = express();

app.use(bodyParser.json())

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});