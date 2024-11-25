import { IUserDocument, UserModel } from "../models/userModel";
import { IUser } from "../types";
import bcrypt from 'bcrypt'

export class UserRepository {
    async create(data: IUser) {
        return await UserModel.create(data)
    }
    async findByEmail(email: string): Promise<IUserDocument> {
        return await UserModel.findOne({ email }).exec() as IUserDocument
    }
    async findByEmailOrPhone(email: string): Promise<IUserDocument> {
        return await UserModel.findOne({
            $or: [
                { email: email },
                { phone: email },
            ],
        }).exec() as IUserDocument
    }
    async getUser(_id: string): Promise<IUser | null> {
        return await UserModel.findOne({ _id }).select('-password')
    }
    async updateProfile(_id: string, data: IUser): Promise<IUser | null> {
        return await UserModel.findOneAndUpdate(
            { _id },
            {
                $set: { ...data }
            },
            { new: true }
        ).select('-password')
    }
    async findById(id: string): Promise<IUser> {
        return await UserModel.findById(id) as IUser
    }

    async updatePassword(id: string, newPassword: any): Promise<any | null> {
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        const updateUser = await UserModel.findByIdAndUpdate(
            id,
            { password: hashedPassword },
            { new: true }
        )
        return updateUser
    }

    async updatePreference(id: string, data: string): Promise<any | null> {
        const update = await UserModel.findByIdAndUpdate(
            id,
            { preferences: data },
            { new: true }
        )
        return update
    }
}
