import { IUser } from "../../models/user.model"

export interface IAuthRepository {
    findUserByEmail(email: string):Promise<IUser|null>
    createUser(name: string, email: string, hashedPassword: string):Promise<IUser|null>
    findUserById(id:string):Promise<IUser|null>
    updateUserPassword(id:string, password:string):Promise<IUser|null>
}