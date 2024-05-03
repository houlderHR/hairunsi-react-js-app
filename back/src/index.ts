import { Express, NextFunction, Request } from 'express';
import './utils/config';
import './database/data-source';
import { v2 as cloudinary } from 'cloudinary';
const swaggerUi = require('swagger-ui-express');
const refParser = require('json-schema-ref-parser');
const swaggerDocument = require('./swagger.json');

import express = require('express');
var cors = require('cors');

import bodyParser = require('body-parser');
import router from './routes/';
import logger from './utils/logger';

cloudinary.config({
  api_secret: process.env.CLOUD_SECRET,
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
});

const port = process.env.PORT || 8080;
const app: Express = express();

app.use(cors());
app.use((_, response: express.Response, next: NextFunction) => {
  response.header(
    'Access-Control-Allow-Origin',
    process.env.FRONT_END_BASE_ROUTE.toString().slice(
      0,
      process.env.FRONT_END_BASE_ROUTE.toString().length - 1,
    ),
  );
  response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
app.use(bodyParser.json());
app.use(router);

var options = {};

refParser.dereference(swaggerDocument).then((swaggerFile) => {
  app.get('/', function (req, res) {
    res.sendFile('index.html', { root: __dirname + '/' });
  });
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
    logger.info(
      `Server is running ${process.env.NODE_ENV === 'dev' ? 'at http://localhost:' + port : ''}`,
    );
  });
});
