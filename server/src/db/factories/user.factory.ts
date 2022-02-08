import { email, firstName, lastName } from 'minifaker';
import 'minifaker/locales/en';
import { define } from 'typeorm-seeding';
import { User } from '../../modules/users/entities/user';

define(User, (_) => {
  const user = new User(firstName(), lastName(), email());
  return user;
});
