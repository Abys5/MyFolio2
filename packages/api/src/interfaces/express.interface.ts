import { Request } from 'express';
import IUser from './User.interface';

interface RequestWithUser extends Request {
    user?: IUser;
}

export { RequestWithUser };
