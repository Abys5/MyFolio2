import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { UserRole } from '../../UserRoles';
import { User } from '../entity/User';

export default class UserSeed implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {
        // Removes all Existing Entries in Users
        connection
            .createQueryBuilder()
            .delete()
            .from('users')
            .execute();
        // Runs the User Factory with 50 Users
        await factory(User)({ roles: [UserRole.USER] }).seedMany(50);
    }
}
