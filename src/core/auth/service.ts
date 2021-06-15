import UserModel from "../../model/user";
import { SocialCase } from "../../enum/socialCase";
import { sessionService } from "../session/service";
import { ILoginDto } from "./dto/login.dto";
import bcrypt from 'bcrypt';
import { SessionPayload } from "../../model/session";
import { loginDto } from "./dto/login.dto";

export interface AuthService  {
    loginWithCase<T>(body: T, type: SocialCase): Promise<string | null>;
    defaultLogin(loginDto: ILoginDto): Promise<string | null>;
}

class AuthServiceImpl implements AuthService {
    private sessionService;

    constructor(){
        this.sessionService = sessionService;
    }

    loginWithCase<T>(body: T, type: SocialCase): Promise<string | null> {
        switch (type) {
            case SocialCase.DEFAULT:
                return this.defaultLogin(loginDto(body));
            case SocialCase.FACEBOOK:
            case SocialCase.GOOGLE:
            case SocialCase.TWITTER:
            default:
                throw new Error("Method not supported.");
        }
    }

    async defaultLogin(loginDto: ILoginDto): Promise<string | null> {
        const user = await UserModel.findOne({
            email: loginDto.email
        });
    
        if (!user || !bcrypt.compareSync(loginDto.password, user.password)) {
            throw new Error('Email or password is not correct');
        }

        const sessionPayload : SessionPayload = {
            _id: user._id,
            username: user.username
        }
    
        const currentSession = await this.sessionService.findByUserId(user.id);

        if (currentSession){
            if (currentSession.expired < Date.now() || currentSession.renewTime < Date.now()){
                await this.sessionService.deleteByUserId(user._id);
            } else {
                throw new Error('This account is using');
            }
        }
    
        const newSession = this.sessionService.create(sessionPayload);
        return newSession._id;
    }
}

export const authService : AuthService = new AuthServiceImpl();