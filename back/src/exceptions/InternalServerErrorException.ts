import { StatusCodes } from 'http-status-codes';
import HttpException from './HttpException';

class InternalServerErrorException extends HttpException {
  constructor() {
    super(StatusCodes.INTERNAL_SERVER_ERROR, 'Internal server error');
  }
}

export default InternalServerErrorException;
