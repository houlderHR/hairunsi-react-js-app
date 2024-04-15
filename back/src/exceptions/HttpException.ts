class HttpException extends Error {
  constructor(private status: number, private cause: string | object) {
    super();
  }
}

export default HttpException;
