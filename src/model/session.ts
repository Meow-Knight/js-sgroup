import { Document, model, Schema } from 'mongoose';

export interface SessionPayload {
    _id: string;
    username: string;
}

export interface ISessionSchema extends Document {
    user: {
        _id: String,
        username: String,
    },
    expired: Number,
    renewTime: Number
}

const SessionSchema = new Schema<ISessionSchema>({
    user: {
        _id: String,
        username: String,
    },
    expired: Number,
    renewTime: Number
});

const SessionModel = model<ISessionSchema>('session', SessionSchema);

export default SessionModel;