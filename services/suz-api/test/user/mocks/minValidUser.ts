import { CreateUserDto } from '../../../src/user/dto/create-user.dto';

export const minValidUser: CreateUserDto = {
  login: 'qwe',
  password: '12345',
  name: 'David',
};
