import { NextFunction, Request, Response } from "express";
import SessionModel from "../../model/session";
import { loginDto } from './dto/login.dto';
import envConfig from "../../env";
import { authService } from "./service";


class Controller {
    private authService;

    constructor (){
        this.authService = authService;
    }
    login = async (req : Request, res: Response, next: NextFunction) => {
        const loginCase = Number.parseInt(req.query.case as string);

        try {
            const sessionId = await this.authService.loginWithCase(loginDto(req.body), loginCase);

            if (!sessionId) {
                return res.render('pages/error.pug', {
                    error: 'This account is using!'
                });
            }

            res.cookie('sessionId', sessionId, {
                httpOnly: true,
                signed: true,
                maxAge: Date.now() + envConfig.SESSION_EXPIRED
            });
            return res.redirect('/');
        } catch (error) {
            return res.render('pages/error.pug', {
                error: error
            });
        }
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