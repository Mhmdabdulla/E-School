import { IAuthRepository } from "./interfaces/IAuthRepository";
import { User, IUser } from "../models/user.model";


export class AuthRepository implements IAuthRepository {
  async findUserByEmail(email: string):Promise<IUser|null> {
    return User.findOne({ email });
  }



  async createUser(name: string, email: string, hashedPassword: string):Promise<IUser|null> {
    return User.create({ name, email, password: hashedPassword });
  }

  async findUserById(id:string):Promise<IUser|null>{
    return User.findOne({ _id: id, status: 'active' })
  }


  async updateUserPassword(id:string, password:string):Promise<IUser|null>{
    return User.findByIdAndUpdate(id,{password}, {new:true})
  }
}
