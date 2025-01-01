import { Response } from 'src/graphql.schema';

export default class Res {
  response: Response;
  constructor(success: boolean, message?: string) {
    this.response = {
      success,
      message,
    };
  }
}
