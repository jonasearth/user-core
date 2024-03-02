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
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ResponseDTO } from 'src/helpers/response.dto';
import { UserEntity } from './entities/user.entity';
import { CreateUserDTO } from './dto/createUser.dto';
import { GetUserDTO } from './dto/getUser.dto';
import { ListUserDTO } from './dto/listUser.dto';
import { UpdateUserDTO } from './dto/updateUser.dto';
import { AuthGuard } from './guards/auth.guard';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/find')
  async get(@Query() user: GetUserDTO) {
    console.log(user);
    return await this.userService.get(user);
  }
  @Get(':id')
  async find(@Param('id') id: string) {
    return await this.userService.get({ id });
  }
  @Delete(':id')
  async delete(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ResponseDTO<boolean | Error>> {
    return await this.userService.delete(id);
  }
  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() user: UpdateUserDTO,
  ): Promise<ResponseDTO<boolean | Error>> {
    return await this.userService.update(id, user);
  }

  @UseGuards(AuthGuard)
  @Get('')
  async list(@Query() user: ListUserDTO) {
    return await this.userService.list(user);
  }
  @Post(``)
  async create(
    @Body() user: CreateUserDTO,
  ): Promise<ResponseDTO<UserEntity | Error>> {
    return await this.userService.create(user);
  }
}
