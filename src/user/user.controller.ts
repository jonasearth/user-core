import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from './entities/user.entity';
import { CreateUserDTO } from './dto/createUser.dto';
import { GetUserDTO } from './dto/getUser.dto';
import { ListUserDTO } from './dto/listUser.dto';
import { UpdateUserDTO } from './dto/updateUser.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/find')
  async get(@Query() user: GetUserDTO): Promise<UserEntity> {
    return await this.userService.get(user);
  }
  @Get(':id')
  async find(@Param('id') id: string): Promise<UserEntity> {
    return await this.userService.get({ id });
  }
  @Delete(':id')
  async delete(@Param('id', ParseUUIDPipe) id: string): Promise<boolean> {
    return await this.userService.delete(id);
  }
  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() user: UpdateUserDTO,
  ): Promise<boolean> {
    return await this.userService.update(id, user);
  }

  @Get('')
  async list(@Query() user: ListUserDTO): Promise<UserEntity[]> {
    return await this.userService.list(user);
  }
  @Post('')
  async create(@Body() user: CreateUserDTO): Promise<UserEntity> {
    return await this.userService.create(user);
  }
}
