import {
  ClassSerializerInterceptor,
  INestApplication,
  ValidationPipe,
} from '@nestjs/common';
import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { Test } from '@nestjs/testing';
import { assert } from 'chai';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import 'reflect-metadata';
import * as sinon from 'sinon';
import * as winston from 'winston';
import validationPipeConfigs from '../../config/class-validator/validation.config';
import { AxiosErrorInterceptor } from '../../shared/interceptors/axios-error.interceptor';
import { UserController } from '../user.controller';

describe('User controller', () => {
  const logger = sinon.stub(winston.createLogger());

  let app: INestApplication;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [UserController],
      providers: [

        {
          provide: APP_INTERCEPTOR,
          useClass: ClassSerializerInterceptor,
        },
        {
          provide: APP_PIPE,
          useValue: new ValidationPipe(validationPipeConfigs),
        },
        {
          provide: APP_INTERCEPTOR,
          useClass: AxiosErrorInterceptor,
        },
        {
          provide: WINSTON_MODULE_PROVIDER,
          useValue: logger,
        },
      ],
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  afterEach(() => {
    sinon.reset();
  });

  it('to-do', async () => {
    assert.equal(true, true);
  });
});
