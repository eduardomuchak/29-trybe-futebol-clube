// Referência https://stackoverflow.com/questions/31626231/custom-error-class-in-typescript

export default class CustomError extends Error {
  constructor(public statusCode: number, public message: string) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
  }
}
