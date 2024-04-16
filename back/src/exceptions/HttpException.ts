class HttpException extends Error {
  constructor(private status: number, private error: string | object) {
    super();
  }
}

export default HttpException;
