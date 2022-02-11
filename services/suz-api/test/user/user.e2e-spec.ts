import { Test, TestingModule } from '@nestjs/testing';
import { MongooseModule } from '@nestjs/mongoose';
import * as request from 'supertest';

import {
  closeInMongodConnection,
  rootMongooseTestModule,
} from '../../utils/MongooseTestModule';
import { UserService } from '../../src/user/user.service';
import { UserController } from '../../src/user/user.controller';
import { UserSchema } from '../../src/user/schemas/user.shema';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { maxValidUser, minValidUser } from './mocks';
import * as _ from 'lodash';
import { invalidUser } from './mocks/invalidUser';

const EXCLUDED_PATHS = ['_id', 'created', '__v', 'status'];
const SENSITIVE_PATHS = ['password'];

const withoutSensitive = (data: any) => _.omit(data, SENSITIVE_PATHS);

describe('UserService', () => {
  let app: INestApplication;
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [
        rootMongooseTestModule(),
        MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
      ],
      controllers: [UserController],
      providers: [UserService],
    }).compile();

    app = module.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    await app.init();
  });

  it('should be defined', () => {
    expect(app).toBeDefined();
  });

  describe('Create user', () => {
    it('Create empty user', async () => {
      const response = await request(app.getHttpServer())
        .post('/users')
        .send({});

      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        error: 'Bad Request',
        message: [
          'name should not be empty',
          'login must be longer than or equal to 3 characters',
          'login should not be empty',
          'password should not be empty',
        ],
        statusCode: 400,
      });
    });

    it('Create minimum valid user', async () => {
      const response = await request(app.getHttpServer())
        .post('/users')
        .send(minValidUser);

      expect(response.status).toBe(201);
      expect(response.body).toMatchObject(withoutSensitive(minValidUser));
    });

    it('Create maximum valid user', async () => {
      const response = await request(app.getHttpServer())
        .post('/users')
        .send(maxValidUser);

      expect(response.status).toBe(201);
      expect(response.body.status).toBe('active');
      expect(response.body.created).toBeDefined();
      expect(response.body.password).toBeUndefined();

      const user = _.omit(response.body, EXCLUDED_PATHS);

      expect(user).toEqual(withoutSensitive(maxValidUser));
    });

    it('Create invalid user', async () => {
      const response = await request(app.getHttpServer())
        .post('/users')
        .send(invalidUser);

      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        statusCode: 400,
        message: [
          'login must be longer than or equal to 3 characters',
          'email must be an email',
          'phone must be a valid phone number',
        ],
        error: 'Bad Request',
      });
    });
  });

  describe('Get users', () => {
    beforeEach(async () => {
      await request(app.getHttpServer()).post('/users').send(minValidUser);
    });

    it('Get users', async () => {
      const response = await request(app.getHttpServer()).get('/users');

      expect(response.status).toBe(200);
      expect(response.body[0].password).toBeUndefined();
      expect(response.body).toMatchObject([withoutSensitive(minValidUser)]);
    });
  });

  afterAll(async () => {
    await closeInMongodConnection();
  });
});
