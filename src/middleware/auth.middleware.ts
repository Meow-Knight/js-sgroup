import SessionModel from "../model/session";
import { NextFunction, Request, Response } from "express";
import envConfig from "../env";
import { Session } from "inspector";
import { SessionPayload } from '../dto/SessionPayload';

interface ExtendedRequestWithUser extends Request {
    user?: SessionPayload
}

export const authRequired = async (req: Request, res: Response, next: NextFunction) => {
    const {sessionId} = req.signedCookies;

    if (!sessionId){
        return res.redirect('auth/login');
    }

    const session = await SessionModel.findById(sessionId);

    if (!session){
        res.clearCookie('sessionId');
        return res.redirect('/auth/login');
    }

    if (session.expired < Date.now()){
        res.clearCookie('sessionId');
        await SessionModel.deleteOne({
            _id: sessionId
        });
        return res.redirect('/auth/login');
    }

    if (session.renewTime < Date.now()){
        await SessionModel.updateOne({ _id: sessionId}, {
            renewTime: Date.now() + envConfig.SESSION_RENEW
        })
    }

    (req as ExtendedRequestWithUser).user = session.user;

    return next();
};

export const authNotRequired = async (req: Request, res: Response, next: NextFunction) => {
    const {savedSession} = req.signedCookies;

    if (savedSession) {
        return res.redirect('/');
    }

    return next();
}