import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserErrorMessage } from './enums/error.enum';
import {
  UserAlreadyExistsException,
  UserNotFoundException,
} from './exceptions/user.exceptions';
import { CreateUserDTO } from './dto/createUser.dto';
import { ListUserDTO } from './dto/listUser.dto';
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

  async list(user: ListUserDTO): Promise<UserEntity[]> {
    try {
      const users = await this.userRepository.find({
        where: user,
      });
      return users;
    } catch (error) {
      this.logger.error('LIST USER: ', error.message);
      throw error;
    }
  }

  async get(user: Partial<UserEntity>): Promise<UserEntity> {
    try {
      console.log(user);
      const userData = await this.userRepository.findOne({
        where: user,
      });
      if (!userData) {
        throw new NotFoundException(UserErrorMessage.USER_NOT_FOUND);
      }
      return userData;
    } catch (error) {
      this.logger.error('GET USER: ', error.message);
      throw error;
    }
  }
  async create(user: CreateUserDTO): Promise<UserEntity> {
    try {
      const exists = await this.exists({ email: user.email });
      if (exists) {
        throw new UserAlreadyExistsException();
      }
      const userCreated = await this.userRepository.save(
        this.userRepository.create(user),
      );
      if (!userCreated.id) {
        throw new UnexpectedException();
      }
      return userCreated;
    } catch (error) {
      this.logger.error('CREATE USER: ', error.message);
      throw error;
    }
  }
  async update(id: string, user: Partial<UserEntity>): Promise<boolean> {
    try {
      const exists = await this.exists({ id });
      if (!exists) {
        throw new UserNotFoundException();
      }
      const updateResult = await this.userRepository.update(id, user);

      return !!updateResult.affected;
    } catch (error) {
      this.logger.error('UPDATE USER: ', error.message);
      throw error;
    }
  }
  async delete(id: string): Promise<boolean> {
    try {
      const exists = await this.exists({ id });
      if (!exists) {
        throw new UserNotFoundException();
      }
      const deleteResult = await this.userRepository.softDelete(id);

      return !!deleteResult.affected;
    } catch (error) {
      this.logger.error('DELETE USER: ', error.message);
      throw error;
    }
  }

  private async exists(user: Partial<UserEntity>): Promise<boolean> {
    return await this.userRepository.exists({
      where: user,
    });
  }
}
