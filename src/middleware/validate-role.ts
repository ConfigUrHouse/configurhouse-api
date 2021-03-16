import { Response, Request, NextFunction } from 'express';
import { User } from '../components/user/user.class';
import UserService from '../components/user/user.service';

export async function validateAdminRole(req: Request, res: Response, next: NextFunction): Promise<void> {
    const user = await User.findOne({ where: { id: res.locals.userId }})
    if (!user) {
        res.status(403).send({ success: 'false', message: 'Unauthorized' });
        return
    }
    if (await UserService.isAdmin(user)) {
        next()
    } else {
        res.status(403).send({ success: 'false', message: 'Unauthorized' });
    }
  };