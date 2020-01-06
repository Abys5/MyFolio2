interface User {
    id: number;
    first_name: string;
    last_name: string;
    username: string;
    email: string;
    password: string;

    image: string;
    description: string;
    isAdmin: boolean;

    created_at: Date;
    updated_at: Date;
}

export default User;
