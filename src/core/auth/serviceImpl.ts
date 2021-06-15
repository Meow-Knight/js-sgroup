import { SocialCase } from "src/enum/socialCase";
import { ILoginDto } from "./dto/login.dto";
import { AuthService } from "./service";

class AuthServiceImpl implements AuthService {
    loginWithCase<T>(body: T, type: SocialCase): Promise<string | null> {
        throw new Error("Method not implemented.");
    }
    defaultLogin(loginDto: ILoginDto): Promise<string | null> {
        throw new Error("Method not implemented.");
    }

}