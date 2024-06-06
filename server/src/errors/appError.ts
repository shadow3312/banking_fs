import { ERROR_CODES, ErrorCode } from "./errorCodes";

export class AppError extends Error {
  public readonly statusCode: number;

  constructor(code: ErrorCode, message?: string) {
    const errorCode = ERROR_CODES[code];
    super(message || errorCode.message);
    this.statusCode = errorCode.statusCode;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
