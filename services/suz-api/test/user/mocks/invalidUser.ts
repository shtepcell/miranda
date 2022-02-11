import { CreateUserDto } from '../../../src/user/dto/create-user.dto';

export const invalidUser: CreateUserDto = {
  login: 'q',
  password: '12345',
  name: 'David',
  email: 'qwerty',
  phone: 'qwerty',
};
