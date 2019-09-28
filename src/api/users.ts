import { User } from '../model/auth';
import { ApiRequest } from './model';

const COLLECTION = 'users';

type Dto = Omit<User, 'id'>;

const mapModelToDto = (user: User): Dto => ({
  displayName: user.displayName,
  email: user.email
});

export const setUser = (user: User): ApiRequest => db =>
  db
    .collection(COLLECTION)
    .doc(user.id)
    .set(mapModelToDto(user));
