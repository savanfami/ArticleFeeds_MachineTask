
export enum HttpStatusCode {
    OK = 200,
    CREATED = 201,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    INTERNAL_SERVER_ERROR = 500
}

export default class ErrorResponse extends Error {
    public status: number;
    public message: string;
    public success: boolean;

    constructor(status: number, message: string) {
        super(message);
        this.status = status;
        this.message = message;
        this.success = false;
    }

    static badRequest(msg: string): ErrorResponse {
        return new ErrorResponse(HttpStatusCode.BAD_REQUEST, msg || "Bad Request");
    }

    static unauthorized(msg: string): ErrorResponse {
        return new ErrorResponse(HttpStatusCode.UNAUTHORIZED, msg || "Unauthorized");
    }

    static forbidden(msg: string): ErrorResponse {
        return new ErrorResponse(HttpStatusCode.FORBIDDEN, msg || "Forbidden");
    }

    static notFound(msg: string): ErrorResponse {
        return new ErrorResponse(HttpStatusCode.NOT_FOUND, msg || "Not Found");
    }
    static conflict(msg: string): ErrorResponse {
        return new ErrorResponse(409, msg || "Conflict");
    }

    static internalError(msg: string): ErrorResponse {
        return new ErrorResponse(HttpStatusCode.INTERNAL_SERVER_ERROR, msg || "internal Server Error");
    }
}