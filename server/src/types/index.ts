import { Schema } from "mongoose";

export interface IUser {
    isModified(arg0: string): unknown;
    _id: Schema.Types.ObjectId,
    firstname: string,
    lastname: string,
    phone: string,
    email: string,
    DOB: Date,
    password: string,
    preferences: string[]
}
