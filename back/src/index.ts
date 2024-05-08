import { Express, NextFunction, Request } from 'express';
import './utils/config';
import './database/data-source';
import { v2 as cloudinary } from 'cloudinary';
const swaggerUi = require('swagger-ui-express');
const refParser = require('json-schema-ref-parser');
const swaggerDocument = require('./swagger.json');
const httpolyglot = require('httpolyglot');

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
const originHost = process.env.HOST_SERVER;
swaggerDocument.host = originHost;

if (
  process.env.SERVER_CERTIFICATE !== null &&
  process.env.SERVER_CERTIFICATE !== '' &&
  process.env.SERVER_CERTIFICATE !== undefined &&
  process.env.SERVER_KEY !== null &&
  process.env.SERVER_KEY !== '' &&
  process.env.SERVER_KEY !== undefined
) {
  swaggerDocument.servers = [
    { url: `http://${originHost}`, description: 'HTTP' },
    { url: `https://${originHost}`, description: 'HTTPS' },
  ];
}

app.use((req: Request, response: express.Response, next: NextFunction) => {
  const url = process.env.FRONT_END_BASE_ROUTE.toString().slice(
    0,
    process.env.FRONT_END_BASE_ROUTE.toString().length - 1,
  );
  const origin = [url, req.get('host')];
  if (origin.includes(req.headers.origin))
    response.header('Access-Control-Allow-Origin', req.headers.origin);
  response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
app.use(cors());
app.use(bodyParser.json());
app.use(router);

var options = {};

refParser.dereference(swaggerDocument).then((swaggerFile) => {
  app.get('/', function (req, res) {
    res.sendFile('index.html', { root: __dirname + '/' });
  });
  app.use('/api-hairunsi-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));

  if (
    process.env.SERVER_CERTIFICATE !== null &&
    process.env.SERVER_CERTIFICATE !== '' &&
    process.env.SERVER_CERTIFICATE !== undefined &&
    process.env.SERVER_KEY !== null &&
    process.env.SERVER_KEY !== '' &&
    process.env.SERVER_KEY !== undefined
  ) {
    const httpsOptions = {
      key: process.env.SERVER_KEY,
      cert: process.env.SERVER_CERTIFICATE,
    };

    const server = httpolyglot.createServer(httpsOptions, app);
    server.listen(port, () => {
      logger.info(
        `Server is running ${
          process.env.NODE_ENV === 'dev' ? 'at (https || http)://localhost:' + port : ''
        }`,
      );
    });
  } else {
    app.listen(port, () => {
      logger.info(
        `Server is running ${process.env.NODE_ENV === 'dev' ? 'at http://localhost:' + port : ''}`,
      );
    });
  }
});
