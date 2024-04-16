const STATUS_CODE = {
  OK: {
    status: 200,
  },
  CREATED: {
    status: 201,
  },
  UNAUTHORIZED: {
    status: 402,
    message: 'Unauthorized request',
  },
  NOT_FOUND: {
    status: 404,
    message: 'Not found exception',
  },
  DUPLICATED: {
    status: 409,
    message: 'Duplicated value',
  },
  UNPROCESSABLE_ENTITY: {
    status: 422,
    message: 'Unprocessable entity error',
  },
  INTERNAL_SERVER: {
    status: 500,
    message: 'Internal server error',
  },
};

export default STATUS_CODE;
