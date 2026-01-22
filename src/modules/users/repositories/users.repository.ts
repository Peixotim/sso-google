import User from "../entities/users.model.js";

export class UserRepository{
  
  public async findAll():Promise<User[]>{
    const users = await User.findAll();
    if(!users){
      return [];
    } 
    
      return users;
  }
}