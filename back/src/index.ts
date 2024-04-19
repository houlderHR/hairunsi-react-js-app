import { Express } from 'express';
import { config } from 'dotenv';
import './database/data-source';
import { v2 as cloudinary } from 'cloudinary';
const swaggerUi = require('swagger-ui-express');
const refParser = require('json-schema-ref-parser');
const swaggerDocument = require('./swagger.json');

import express = require('express');
var cors = require('cors');

import bodyParser = require('body-parser');
import router from './routes/';

config();

cloudinary.config({
  api_secret: process.env.CLOUD_SECRET,
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
});

const port = process.env.PORT || 8080;
const app: Express = express();

app.use(cors());
app.use(bodyParser.json());
app.use(router);

var options = {};

refParser.dereference(swaggerDocument).then((swaggerFile) => {
  app.use(
    '/api-hairunsi-docs',
    (req, res, next) => {
      swaggerDocument.host = req.get('host');
      next();
    },
    swaggerUi.serveFiles(swaggerFile, options),
    swaggerUi.setup(),
  );

  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
});
