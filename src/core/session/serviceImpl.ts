import { Query } from "mongoose";
import { ISessionSchema, SessionPayload } from "../../model/session";

export interface ISessionService {
    findByUserId(userId: string) : Query<ISessionSchema | null, ISessionSchema, {}>;
    create(user: SessionPayload): any;
    deleteByUserId(userId: string): Promise<void>;
    deleteById(sessionId: String) : Promise<void>;
}