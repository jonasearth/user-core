import { Exclude, Expose } from 'class-transformer';
import { BooleanResponse } from '../enums/boolean-response.enum';

@Exclude()
export class BooleanResponseSchema {
  constructor(value: BooleanResponse) {
    this.value = value;
  }

  @Expose()
  public value: BooleanResponse;
}
