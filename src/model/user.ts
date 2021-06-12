import { model, Schema } from 'mongoose';
import { updateHook } from './hook/updateHook';

const UserSchema = new Schema({
    email: String,
    password: String,
    createdAt: {
        type: Date
    },
    updatedAt: {
        type: Date
    }
});

UserSchema.pre('save', updateHook);

const UserModel = model('users', UserSchema);

export default UserModel;