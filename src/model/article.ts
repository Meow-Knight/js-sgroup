import { model, Schema } from 'mongoose';
import { updateHook } from './hook/updateHook';

const ArticleSchema = new Schema({
    title: String,
    content: String,
    slug: String,
    imgUrl: 
    {
        type: String,
        default: 'https://res.cloudinary.com/ddqzgiilu/image/upload/v1624367527/default.jpg',
    },
    createdAt: {
        type: Date
    },
    updatedAt: {
        type: Date
    }
});
ArticleSchema.pre('save', updateHook);

const ArticleModel = model('articles', ArticleSchema);

export default ArticleModel;