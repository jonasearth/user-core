import { BaseException } from '../../helpers/exceptions';
import { UserErrorMessage } from '../enums/error.enum';

export class UserNotFoundException extends BaseException {
  constructor() {
    super();
    this.message = UserErrorMessage.USER_NOT_FOUND;
  }
}
export class UserAlreadyExistsException extends BaseException {
  constructor() {
    super();
    this.message = UserErrorMessage.USER_ALREADY_EXISTS;
  }
}
