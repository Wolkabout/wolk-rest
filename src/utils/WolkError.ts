import * as fromUtils from './index';
import { AxiosError } from 'axios';
import HTTP_ERRORS from './HTTPErrorsEnum';
import WolkErrorResponse from '../model/WolkErrorResponse';

export class WolkError extends Error {
  private code: number;
  private readonly messages: string[] | undefined;
  errorName: string | undefined;

  constructor(error: AxiosError) {
    super();

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, WolkError);
    }
    const { data = {}, status = 500, statusText = ''   } = error.response as WolkErrorResponse || {};

    this.code = status;
    this.errorName = fromUtils.getKeyByValue(HTTP_ERRORS, status);
    this.messages = data.messages;
  }
}
