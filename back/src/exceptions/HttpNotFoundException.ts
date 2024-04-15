import HttpException from './HttpException';

class HttpNotFoundException extends HttpException {
  constructor(cause: string | object) {
    super(404, cause);
  }
}

export default HttpNotFoundException;
