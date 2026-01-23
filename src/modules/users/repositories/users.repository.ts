import { UserCreateDTO } from "../dtos/user-create.dto.js";
import User from "../entities/users.model.js";
import { UserRole } from "../enums/UserRole.enum.js";

export class UserRepository {
  public async findAll(): Promise<User[]> {
    return await User.findAll();
  }

  public async create(data: UserCreateDTO): Promise<User> {
    const newUser = await User.create({
      name: data.name,
      email: data.email,
      googleId: data.googleId || null,
      avatarUrl: data.avatarUrl || null,
      role: data.role || UserRole.USER,
      isActive: data.isActive ?? true,
    });

    return newUser;
  }
}
