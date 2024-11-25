import mongoose, { Document, model, ObjectId, Schema } from "mongoose";

export interface IArticleMOdel extends Document {
    userId: ObjectId
    title: string;
    description: string;
    imageUrl: string;
    tags: string;
    references: string;
    likes: number
    dislikes: number
    userInteractions:[{
        userId:ObjectId,
        type:string,
    }]
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
        type: Number,
    },
    dislikes: {
        type: Number,
    },
    userInteractions:[{
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        type: { type: String, enum: ['like', 'dislike'] },
    }],
    blocks: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Users'
    }
})

export const ArticlModel = model<IArticleMOdel>('Articles', articleSchema)