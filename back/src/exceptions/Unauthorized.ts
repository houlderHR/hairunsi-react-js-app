import HttpException from './HttpException';

class Unauthorized extends HttpException {
  constructor(error: string | object) {
    super(401, error);
  }
}

export default Unauthorized;
