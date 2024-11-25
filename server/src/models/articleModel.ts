import mongoose, { Document, model, ObjectId, Schema } from "mongoose";

export interface IArticleMOdel extends Document {
    userId: ObjectId
    title: string;
    description: string;
    imageUrl: string;
    tags: string;
    references: string;
    likes: mongoose.Types.ObjectId[];
    dislikes: mongoose.Types.ObjectId[];
    blocks: mongoose.Types.ObjectId[];
}

const articleSchema = new Schema<IArticleMOdel>({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    }
    ,
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    tags: {
        type: String,
        required: true
    },
    references: {
        type: String,
        required: true
    },
    likes: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Users'
    },
    dislikes: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Users'
    },
    blocks: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Users'
    }
})

export const ArticlModel = model<IArticleMOdel>('Articles', articleSchema)