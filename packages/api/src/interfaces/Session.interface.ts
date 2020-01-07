interface Session {
    id: number;
    token: string;
    user_id: number;

    created_at: Date;
    updated_at: Date;
}

export default Session;
