import { Express } from 'express';
import { config } from 'dotenv';
import express = require('express');
import bodyParser = require('body-parser');

config();

const port = process.env.PORT || 8080;
const app: Express = express();

app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
