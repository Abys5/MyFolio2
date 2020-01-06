import { Request } from 'express';
import IUser from './User';

interface RequestWithUser extends Request {
    user?: IUser;
}

export { RequestWithUser };
