import User from "../entities/users.model.js";
import { UserRepository } from "../repositories/users.repository.js";
import { UserCreateDTO } from "../dtos/user-create.dto.js";

export class UserService {
  private userRepository = new UserRepository();

  public async findAll(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  public async create(data: UserCreateDTO) {
    const existsUser = await this.userRepository.existsUserByEmail(data.email);
    if (!data) {
      throw new Error(`Data is empty !`);
    }

    if (existsUser) {
      throw new Error(`A user with this email address is already registered!`);
    }

    const newUser = await this.userRepository.create(data);

    return newUser;
  }
}
