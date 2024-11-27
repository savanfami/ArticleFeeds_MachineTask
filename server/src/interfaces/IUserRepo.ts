import { IUserDocument } from "../models/userModel";
import { IUser } from "../types";


export interface IUserRepo{
    create(data:IUser):Promise<IUserDocument>;
    findByEmail(email:string):Promise<IUserDocument>;
    findByEmailOrPhone(email:string):Promise<IUserDocument>;
    getUser(_id:string):Promise<IUser|null>;
    updateProfile(_id:string,data:IUser):Promise<IUser|null>;
    findById(id:string):Promise<IUser>;
    updatePassword(id:string,newPassword:string):Promise<any|null>;
    updatePreference(id:string,data:string):Promise<any|null>;
}