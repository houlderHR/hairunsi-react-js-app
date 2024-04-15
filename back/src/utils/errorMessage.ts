const ERROR = {
  INTERNAL_SERVER: {
    status: 500,
    message: 'Internal server error',
  },
  NOT_FOUND: {
    status: 404,
    message: 'Not found exception',
  },
  UNAUTHORIZED: {
    status: 402,
    message: 'Unauthorized request',
  },
  DUPLICATED: {
    status: 409,
    message: 'Duplicated value',
  },
};

export default ERROR;
