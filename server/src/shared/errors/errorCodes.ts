export type ErrorCode =
  | "NOT_FOUND"
  | "VALIDATION_ERROR"
  | "INTERNAL_ERROR"
  | "DUPLICATE_RESOURCE"
  | "AUTH_INVALID_CREDENTIALS"
  | "AUTH_PASSWORD_MISMATCH"
  | "EMAIL_EXISTS";

export interface IErrorCodeDetails {
  message: string;
  statusCode: number;
}

export const ERROR_CODES: Record<ErrorCode, IErrorCodeDetails> = {
  NOT_FOUND: {
    message: "Resource not found",
    statusCode: 404,
  },
  VALIDATION_ERROR: {
    message: "Validation failed",
    statusCode: 400,
  },
  DUPLICATE_RESOURCE: {
    message: "Resource already exists",
    statusCode: 409,
  },
  EMAIL_EXISTS: {
    message: "Email already exists",
    statusCode: 409,
  },
  INTERNAL_ERROR: {
    message: "Internal server error",
    statusCode: 500,
  },
  AUTH_INVALID_CREDENTIALS: {
    message: "Invalid credentials",
    statusCode: 400,
  },
  AUTH_PASSWORD_MISMATCH: {
    message: "Email or password wrong",
    statusCode: 400,
  },
};
