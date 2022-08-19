// Referência https://stackoverflow.com/questions/31626231/custom-error-class-in-typescript

export default class CustomError extends Error {
  public statusCode: number;
  public message: string;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
  }
}
