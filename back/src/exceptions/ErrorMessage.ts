export class ErrorMessage {
  property?: string;
  status?: number;
  message: {} | string;

  constructor(message: {} | string, property?: string, status?: number) {
    this.property = property;
    this.status = status;
    this.message = message;
  }
}
