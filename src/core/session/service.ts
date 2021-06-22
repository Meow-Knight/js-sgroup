import { Query } from "mongoose";
import envConfig from "../../env";
import SessionModel, { ISessionSchema, SessionPayload } from "../../model/session";
import { ISessionService } from "./serviceImpl";

class SessionService implements ISessionService {
    findByUserId(userId: string): Query<ISessionSchema | null, ISessionSchema, {}> {
        return SessionModel.findOne({
            'user._id': userId
        });
    }
    create(user: SessionPayload) {
        return SessionModel.create({
            user,
            expired: Date.now() + envConfig.SESSION_EXPIRED,
            renewTime: Date.now() + envConfig.SESSION_RENEW,
        });
    }
    async deleteByUserId(userId: string): Promise<void> {
        await SessionModel.deleteOne({
            'user._id': userId
        });
    }

    async deleteById(sessionId: String) : Promise<void> {
        await SessionModel.deleteOne({
            _id: sessionId,
        });
    }
}

export const sessionService : ISessionService = new SessionService();