import { model, Schema } from 'mongoose';
import { updateHook } from './hook/updateHook';

const ArticleSchema = new Schema({
    title: String,
    content: String,
    slug: String,
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