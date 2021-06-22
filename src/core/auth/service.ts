import { SocialCase } from "../../enum/socialCase";
import { ILoginDto } from "./dto/login.dto";

export interface AuthService  {
    loginWithCase<T>(body: T, type: SocialCase): Promise<string | null>;
    defaultLogin(loginDto: ILoginDto): Promise<string | null>;
    register(dto: ILoginDto): Promise<void>;
}