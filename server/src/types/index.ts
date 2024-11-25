import { ObjectId } from "mongoose";



export interface IUser {
    comparePassword: any;
    isModified(arg0: string): unknown;
    firstName: string,
    lastName: string,
    phone: string,
    email: string,
    dob: Date,
    password: string,
    preferences: string[]
}

export interface ILogin {
    email?: string,
    phone?: string,
    password: string
}

export interface IArticle {
    userId: ObjectId,
    title: string
    content: string
    description: string;
    image: string;
    tags: string[];
    category: string;
    likes: string[]
}