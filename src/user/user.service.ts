import { Inject, Injectable } from '@nestjs/common';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ResponseDTO } from '../helpers/response.dto';
import { UserErrorEnum } from './enums/error.enum';
import {
  UserAlreadyExistsException,
  UserNotFoundException,
} from './exceptions/user.exceptions';
import { CreateUserDTO } from './dto/createUser.dto';
import { ListUserDTO } from './dto/listUser.dto';
import { ErrorEnum } from '../helpers/enums/error.enum';
import { UnexpectedException } from '../helpers/exceptions';
import { Logger } from 'winston';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @Inject('winston') private logger: Logger,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async list(user: ListUserDTO): Promise<ResponseDTO<UserEntity[] | Error>> {
    try {
      const users = await this.userRepository.find({
        where: user,
      });
      return new ResponseDTO(users);
    } catch (error) {
      this.logger.log('warn', error.message);
      return new ResponseDTO(error, false, ErrorEnum.UNEXPECTED_ERROR);
    }
  }

  async get(
    user: Partial<UserEntity>,
  ): Promise<ResponseDTO<UserEntity | Error>> {
    try {
      console.log(user);
      const userData = await this.userRepository.findOne({
        where: user,
      });
      if (userData) {
        return new ResponseDTO(userData);
      }
      return new ResponseDTO(
        new UserNotFoundException(),
        false,
        ErrorEnum.NOT_FOUND,
      );
    } catch (error) {
      this.logger.log('warn', error.message);
      return new ResponseDTO(error, false, ErrorEnum.UNEXPECTED_ERROR);
    }
  }
  async create(user: CreateUserDTO): Promise<ResponseDTO<UserEntity | Error>> {
    try {
      const exists = await this.exists({ email: user.email });
      if (exists) {
        return new ResponseDTO(
          new UserAlreadyExistsException(),
          false,
          UserErrorEnum.USER_ALREADY_EXISTS,
        );
      }
      const userCreated = await this.userRepository.save(
        this.userRepository.create(user),
      );
      if (userCreated.id) {
        return new ResponseDTO(userCreated);
      }
      return new ResponseDTO(
        new UnexpectedException(),
        false,
        ErrorEnum.UNEXPECTED_ERROR,
      );
    } catch (error) {
      this.logger.log('warn', error.message);
      return new ResponseDTO(error, false, ErrorEnum.UNEXPECTED_ERROR);
    }
  }
  async update(
    id: string,
    user: Partial<UserEntity>,
  ): Promise<ResponseDTO<boolean | Error>> {
    try {
      const exists = await this.exists({ id });
      if (!exists) {
        return new ResponseDTO(
          new UserNotFoundException(),
          false,
          ErrorEnum.NOT_FOUND,
        );
      }
      const updateResult = await this.userRepository.update(id, user);
      if (!!updateResult.affected) {
        return new ResponseDTO(true);
      }
      return new ResponseDTO(
        new UnexpectedException(),
        false,
        ErrorEnum.UNEXPECTED_ERROR,
      );
    } catch (error) {
      this.logger.log('warn', error.message);
      return new ResponseDTO(error, false, ErrorEnum.UNEXPECTED_ERROR);
    }
  }
  async delete(id: string): Promise<ResponseDTO<boolean | Error>> {
    try {
      const exists = await this.exists({ id });
      if (!exists) {
        return new ResponseDTO(
          new UserNotFoundException(),
          false,
          ErrorEnum.NOT_FOUND,
        );
      }
      const deleteResult = await this.userRepository.delete(id);
      if (!!deleteResult.affected) {
        return new ResponseDTO(true);
      }
      return new ResponseDTO(
        new UnexpectedException(),
        false,
        ErrorEnum.UNEXPECTED_ERROR,
      );
    } catch (error) {
      this.logger.log('warn', error.message);
      return new ResponseDTO(error, false, ErrorEnum.UNEXPECTED_ERROR);
    }
  }

  private async exists(user: Partial<UserEntity>): Promise<boolean> {
    return await this.userRepository.exists({
      where: user,
    });
  }
}
