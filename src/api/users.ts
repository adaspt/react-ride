import { User } from '../model/auth';
import { ApiRequest } from './model';

const getCollectionPath = () => 'users';

type Dto = Omit<User, 'id'>;

const mapModelToDto = (user: User): Dto => ({
  displayName: user.displayName,
  email: user.email
});

export const setUser = (user: User): ApiRequest => db =>
  db
    .collection(getCollectionPath())
    .doc(user.id)
    .set(mapModelToDto(user));
