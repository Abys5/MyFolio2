interface Session {
    id: number;
    token: string;
    userID: number;

    created_at: Date;
    updated_at: Date;
}

export default Session;
