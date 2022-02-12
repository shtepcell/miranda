import { createStore, createEffect } from 'effector'
import { request } from '../lib/request';
import { User } from '../types/User';

export const getUsersFx = createEffect(async () => {
  const response = await request.get('/users');

  return response.data;
});

export const $users = createStore<User[]>([])
  .on(getUsersFx.doneData, (_, users) => users);
