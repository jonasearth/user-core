import { ErrorEnum } from './enums/error.enum';

export class BaseException extends Error {
  data: unknown;
  constructor(message?: string, data?: unknown) {
    super(message);

    this.data = data;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class UnexpectedException extends BaseException {
  constructor() {
    super();
    this.message = ErrorEnum.UNEXPECTED_ERROR;
  }
}
