import { CallbackError, Document, model, Schema } from "mongoose";
import { IUser } from "../types";
import bcrypt from 'bcrypt'
const SALT_ROUNDS = 10

export interface IUserDocument extends IUser, Omit<Document,'isModified'> {
    comparePassword(enteredPassword: string): Promise<boolean>;
}

const UserSchema = new Schema<IUserDocument>({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    dob: {
        type: Date,
        required: true
    },
    password: {
        type: String,
        required: true

    },
    preferences: { type: [String], required: true }
    // preferences: {
    //     type: [{
    //         value: { type: String, required: true }
    //     }],
    //     required: true
    // }
})



UserSchema.pre<IUser>('save', async function (next) {
    if (!this.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(SALT_ROUNDS);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error as CallbackError);
    }
});


UserSchema.methods.comparePassword = async function (enteredPassword: string): Promise<boolean> {
    return bcrypt.compare(enteredPassword, this?.password)
}

export const UserModel = model<IUserDocument>('Users', UserSchema)