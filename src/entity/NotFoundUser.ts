import { User } from './User';

export class NotFoundUser extends User {
  constructor() {
    super('User Not Found', '', '분류안됨');
  }
}

export const isNotFoundUser = (user: User) => {
  try {
    user as NotFoundUser;
    return true;
  } catch (err) {
    return false;
  }
};
