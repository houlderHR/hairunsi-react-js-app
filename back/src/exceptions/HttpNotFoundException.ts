import HttpException from './HttpException';

class HttpNotFoundException extends HttpException {
  constructor(error: string | object) {
    super(404, error);
  }
}

export default HttpNotFoundException;
