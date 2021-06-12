import SessionModel from "../model/session";
import { NextFunction, Request, Response } from "express";

export const authRequired = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const {savedSession} = req.signedCookies;

    if (!savedSession){
        return res.redirect('auth/login');
    }

    const session = await SessionModel.findById(savedSession.sessionId);

    if (session.lock !== savedSession.lock){
        return res.redirect('/auth/login');
    }

    return next();
};

export const authNotRequired = async (req: Request, res: Response, next: NextFunction) => {
    const {savedSession} = req.signedCookies;

    if (savedSession) {
        return res.redirect('/');
    }

    return next();
}