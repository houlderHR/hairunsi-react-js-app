import ERROR from '../utils/statusCode';
import HttpException from './HttpException';

class InternalServerErrorException extends HttpException {
  constructor() {
    super(ERROR.INTERNAL_SERVER.status, ERROR.INTERNAL_SERVER.message);
  }
}

export default InternalServerErrorException;
