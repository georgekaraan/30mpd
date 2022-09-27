import { atom } from 'recoil'

export const isLoggedIn = atom({
  key: 'isLoggedIn',
  default: false,
});

export const usersMode = atom({
  key: 'usersMode',
  default: 'learner',
});
export const userEmail = atom({
  key: 'userEmail',
  default: '',
});

export const userData = atom({
  key: 'userData',
  default: {},

})