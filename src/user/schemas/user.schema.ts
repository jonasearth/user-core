import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class UserSchema {
  @Expose()
  public id: string;

  public name: string;

  @Expose()
  public email: string;

  @Expose()
  public cpf: string;

  @Expose()
  public phone: string;

  @Expose()
  public created_at: Date;

  @Expose()
  public updated_at: Date;

  @Expose()
  public deleted_at: Date | null;
}
