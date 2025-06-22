import { IAuthRepository } from "./interfaces/IAuthRepository";
import { User, IUser } from "../models/user.model";
import { Admin,IAdmin } from "../models/Admin.model";

export class AuthRepository implements IAuthRepository {
  async findUserByEmail(email: string):Promise<IUser|null> {
    return User.findOne({ email });
  }

  async findAdminByEmail(email:string):Promise<IAdmin|null>{
    return Admin.findOne({email})
  }

  async createUser(name: string, email: string, hashedPassword: string):Promise<IUser|null> {
    return User.create({ name, email, password: hashedPassword });
  }

  async findUserById(id:string):Promise<IUser|null>{
    return User.findOne({ _id: id, status: 'active' })
  }

  async findAdminById(id:string):Promise<IAdmin|null>{
    return Admin.findById(id)
  }

  async updateUserPassword(id:string, password:string):Promise<IUser|null>{
    return User.findByIdAndUpdate(id,{password}, {new:true})
  }
}
