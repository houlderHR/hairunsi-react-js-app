const logger = require('pino');

export default logger({
  transport: {
    target: 'pino-pretty',
  },
});
