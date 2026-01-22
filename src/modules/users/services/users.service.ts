import User from "../entities/users.model.js";
import { UserRepository } from "../repositories/users.repository.js";

export class UserService{
  private userRepository = new UserRepository();


  public async findAll():Promise<User[]>{
    return this.userRepository.findAll();
  }
}