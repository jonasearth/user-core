import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional } from 'class-validator';

export class ListUserDTO {
  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  isActive: boolean;
}
