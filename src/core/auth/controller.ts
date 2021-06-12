import { NextFunction, Request, Response } from "express";
import UserModel from "../../model/user";
import bcrypt from 'bcrypt';
import SessionModel from "../../model/session";
import { v4 as uuidv4 } from 'uuid';
import { loginDto, ILoginDto } from './dto/login.dto';
import envConfig from "../../env";


class Controller {
    login = async (req : Request, res: Response, next: NextFunction) => {
        const dto : ILoginDto = loginDto(req);
    
        const user = await UserModel.findOne({
            email: dto.email
        });
    
        if (!user || !bcrypt.compareSync(dto.password, user.password)) {
            return res.render('pages/error.pug', {
                error: `Email not found to login`
            });
        }
    
        const currentSession = await SessionModel.findOne({
            'user._id': user._id
        });
    
        if (currentSession){
            if (currentSession.expired < Date.now() || currentSession.renew < Date.now()){
                await SessionModel.deleteOne(currentSession);
            } else {
                return res.redirect('/auth/login');
            }
        }
    
        const newSession = await SessionModel.create({
            user: user,
            expired: Date.now() + envConfig.SESSION_EXPIRED,
            renewTime: Date.now() + envConfig.SESSION_RENEW
        });
    
        res.cookie('sessionId', newSession._id, {
            httpOnly: true,
            signed: true,
            maxAge: Date.now() + envConfig.SESSION_EXPIRED
        });
        return res.redirect('/');
    }
    
    logout = async (req: Request, res: Response, next: NextFunction) => {
        const sessionId = req.signedCookies;
    
        if (!sessionId){
            return res.send("You didn't login");
        }
    
        let session = await SessionModel.findOne({
            _id: sessionId
        });
    
        if (!session){
            return res.send("Invalid user session");
        }
    
        try {
            await SessionModel.deleteOne({
                _id: sessionId
            });
    
            return res.status(203).json({
                "message": "logout success!"
            });
        } catch (error) {
            console.log(error);
            return res.status(400).json({
                "message": "cannot logout",
            })
        }
    }
}


export const AuthController = new Controller();