import { User } from './User';

export class NotFoundUser extends User {
  constructor() {
    super('User Not Found', '', '분류안됨');
    super.id = -1;
  }
}

export const isFoundUser = (user: User) => {
  try {
    user as NotFoundUser;
    return false;
  } catch (err) {
    return true;
  }
};
