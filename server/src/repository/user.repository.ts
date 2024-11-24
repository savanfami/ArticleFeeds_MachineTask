import { IUserDocument,UserModel } from "../models/userModel";
import { IUser } from "../types";

export class UserRepository{
    async create(data:IUser){
        return await UserModel.create(data)
    }
    async findByEmail(email: string):Promise<IUserDocument> {
        return await UserModel.findOne({ email }).exec() as IUserDocument
    }
}
