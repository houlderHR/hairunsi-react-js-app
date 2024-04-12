class ValidationError extends Error {
  constructor(data: string, private status: number, private errors: object) {
    super(data);
    this.errors = errors;
    this.status = 500;
  }
}

export default ValidationError;
