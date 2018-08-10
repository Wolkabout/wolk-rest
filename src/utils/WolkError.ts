import { getKeyByValue } from './helpers';
import { AxiosError } from 'axios';
import HTTP_ERRORS from './HTTPErrorsEnum';
import * as fromRoot from '../model';

export class WolkError extends Error {
  private code: number;
  private readonly messages: string[] | undefined;
  type: string | undefined;

  constructor(error: AxiosError) {
    super();

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, WolkError);
    }
    const { data = {}, status = 500, statusText = '' } = error.response as fromRoot.WolkErrorResponse || {};

    this.code = status;
    this.type = getKeyByValue(HTTP_ERRORS, status);
    this.message = data.messages ? data.messages.toString() : '';
    this.stack = `
    Type:${this.type}
    Code:${this.code},
    Message: ${this.message}
    ${this.stack}
    `;
  }
}
