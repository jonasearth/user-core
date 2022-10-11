import { Expose, Exclude } from 'class-transformer';

@Exclude()
export class UserEntity {
  @Expose()
  public id: string;

  @Expose()
  public name: string;

  @Expose()
  public email: string;

  @Exclude()
  public password: string;

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
