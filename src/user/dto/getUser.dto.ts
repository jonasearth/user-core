import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsOptional,
  IsUUID,
  ValidateIf,
} from 'class-validator';

export class GetUserDTO {
  @ApiProperty()
  @IsUUID()
  @IsOptional()
  @ValidateIf(
    (o: GetUserDTO) =>
      (o.email == undefined && o.isActive == undefined) || !!o.id,
  )
  id: string;

  @ApiProperty()
  @IsEmail()
  @IsOptional()
  @ValidateIf(
    (o: GetUserDTO) =>
      (o.id == undefined && o.isActive == undefined) || !!o.email,
  )
  email: string;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  @ValidateIf(
    (o: GetUserDTO) =>
      (o.email == undefined && o.id == undefined) || !!o.isActive,
  )
  isActive: boolean;
}
