import { UserRole } from '../UserRoles';

interface User {
    id: number;
    first_name: string;
    last_name: string;
    username: string;
    email: string;
    password: string;

    image: string;
    description: string;
    roles: UserRole[];

    created_at: Date;
    updated_at: Date;
}

export default User;
