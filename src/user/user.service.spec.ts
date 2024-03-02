import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
describe('UserService', () => {
  let service: UserService;
  let userRepository: Repository<UserEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(UserEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    userRepository = module.get<Repository<UserEntity>>(
      getRepositoryToken(UserEntity),
    );
  });

  it('should list users', async () => {
    const users: UserEntity[] = [
      {
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
        isActive: true,
        email: 'email@mail.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    jest.spyOn(userRepository, 'find').mockResolvedValue(users);

    const result = await service.list({ isActive: true });

    expect(result).toEqual(users);
  });

  it('should create user', async () => {
    const newUser: UserEntity = {
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
      isActive: true,
      email: 'email@mail.com',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    jest.spyOn(userRepository, 'save').mockResolvedValue(newUser);

    const result = await service.create(newUser);

    expect(result).toEqual(newUser);
  });

  it('should update user', async () => {
    const updatedUser: UserEntity = {
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
      isActive: true,
      email: 'email@mail.com',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    jest.spyOn(userRepository, 'update').mockResolvedValue(undefined);
    jest.spyOn(userRepository, 'findOne').mockResolvedValue(updatedUser);

    const result = await service.update('1', updatedUser);

    expect(result).toEqual(true);
  });

  it('should delete user', async () => {
    jest.spyOn(userRepository, 'delete').mockResolvedValue(undefined);

    const result = await service.delete('1');

    expect(result).toEqual(true);
  });

  it('should get user', async () => {
    const user: UserEntity = {
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
      isActive: true,
      email: 'email@mail.com',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    jest.spyOn(userRepository, 'findOne').mockResolvedValue(user);

    const result = await service.get({ id: '1' });

    expect(result).toEqual(user);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
