import { IUser } from "../types";
import { UserRepository } from "../repository/user.repository";
import ErrorResponse from "../utils/errorResponse";
export class UserService{
    private userRepository:UserRepository 
    constructor(userRepository:UserRepository){
        this.userRepository=userRepository
    }
    async register(data:IUser):Promise<IUser>{
        let existing=await this.userRepository.findByEmail(data.email)
        if(existing){
            throw ErrorResponse.badRequest('email already exist')
        }
        return this.userRepository.create(data)
    }
}