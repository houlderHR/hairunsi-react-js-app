import ERROR from '../utils/statusCode';
import HttpException from './HttpException';

class HttpNotFoundException extends HttpException {
  constructor(error: string | object) {
    super(404, error);
  }
}

export default HttpNotFoundException;
