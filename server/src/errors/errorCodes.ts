export type ErrorCode =
  | "NOT_FOUND"
  | "VALIDATION_ERROR"
  | "INTERNAL_ERROR"
  | "DUPLICATE_RESOURCE";

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
    statusCode: 402,
  },
  INTERNAL_ERROR: {
    message: "Internal server error",
    statusCode: 500,
  },
};
