import { User } from './User';

export class NotFoundUser extends User {
  constructor() {
    super("-1", 'User Not Found', '', '분류안됨');
  }
  isNotFoundUser(): boolean {
    return true;
  }
}

export const isNotFoundUser = (_user: User): boolean => {
  const user = _user as NotFoundUser;
  try {
    user.isNotFoundUser();
    return true;
    // TODO: 어딘가 좀 이상한 방법... 주객이 전도되었다.. 공부가 부족한 것으로..
  } catch (e) {
    return false;
  }
};
