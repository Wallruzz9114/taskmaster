import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import { User } from '../../modules/users/entities/user';

export default class UserSeed implements Seeder {
  public async run(factory: Factory, _: Connection): Promise<void> {
    await factory(User)().createMany(10);
  }
}
