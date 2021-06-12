import { NextFunction, Request, Response } from "express";

export function validate(req: Request, res: Response, next: NextFunction) {
    const body = req.body;

    if (!body.email || !body.email.match(/\S+@\S+\.\S+/)){
        return res.send('Email is unvalid');
    }

    if (!body.password){
        return res.send("Password is unvalid");
    }

    return next();
}