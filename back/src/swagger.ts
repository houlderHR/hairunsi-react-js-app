const swaggerAutogen = require('swagger-autogen');

const doc = {
  info: {
    title: 'Hairun SI API documentation',
    description: 'Description',
  },
  host: 'localhost:8080',
  components: {
    schemas: {},
  },
};

const outputFile = './swagger.json';
const routes = ['./routes/index.ts'];

swaggerAutogen()(outputFile, routes, doc);
