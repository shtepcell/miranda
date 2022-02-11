import { CreateUserDto } from '../../../src/user/dto/create-user.dto';

export const maxValidUser: CreateUserDto = {
  login: 'qwerty',
  password: '54321',
  name: 'Ivan',
  email: 'some@ya.ru',
  phone: '+79181231223',
};
