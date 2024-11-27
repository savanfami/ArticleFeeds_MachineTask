import { ILogin, IUser } from "../types";
import { UserRepository } from "../repository/user.repository";
import ErrorResponse from "../utils/errorResponse";
import { IUserDocument } from "../models/userModel";

export class UserService {
    private userRepository: UserRepository
    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository
    }
    async register(data: IUser): Promise<IUserDocument> {
        let existing = await this.userRepository.findByEmail(data.email)
        if (existing) {
            throw ErrorResponse.badRequest('email already exist')
        }
        return this.userRepository.create(data)
    }
    async login(data: ILogin): Promise<IUserDocument | null> {
        let user
        if (data?.email) {
            user = await this.userRepository.findByEmailOrPhone(data.email)
        }
        if (!user) {
            throw ErrorResponse.badRequest('No user found')
        }
        let res = await user.comparePassword(data.password)
        if (res) {
            return user as any
        } else {
            return null
        }
    }
    async getUser(id: string): Promise<IUser | null> {
        return await this.userRepository.getUser(id)
    }

    async updateProfile(id: string, data: IUser): Promise<IUser | null> {
        return await this.userRepository.updateProfile(id, data)
    }

    async updatePassword(id: string, data: any): Promise<any | null> {
        const { currentPassword, newPassword } = data;
        const user = await this.userRepository.findById(id)
        if (!user) {
            throw ErrorResponse.notFound('User not found');
        }
        const isPasswordValid = await user.comparePassword(currentPassword)
        if (!isPasswordValid) {
            throw ErrorResponse.badRequest('Current password is incorrect');
        }
        const updatedUser = await this.userRepository.updatePassword(id, newPassword);
        if (updatedUser) {
            return updatedUser
        }
    }

    async updatePreference(id: string, data: string): Promise<any | null> {
        return await this.userRepository.updatePreference(id, data)
    }
}