import User from "../entities/users.model.js";
import { UserRepository } from "../repositories/users.repository.js";
import { UserCreateDTO } from "../dtos/user-create.dto.js";
import { Profile } from "passport-google-oauth20";
import { UserRole } from "../enums/UserRole.enum.js";

export class UserService {
  private userRepository = new UserRepository();

  public async findAll(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  public async findByEmail(email: string) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      return [];
    }

    return user;
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

  public async findOrCreateByGoogle(profile: Profile) {
    const email = profile.emails?.[0]?.value;
    const google_id = profile.id;
    const avatarUrl = profile.photos?.[0]?.value || "";
    const name = profile.displayName;

    if (!email) {
      throw new Error(`Google account without email`);
    }

    let user = await User.findOne({
      where: { google_id: google_id },
    });

    if (user) {
      //Se já possuir um usuario cadastrado só retornar os dados dele do dba
      return user;
    }

    user = await User.findOne({
      where: { email: email },
    });

    if (user) {
      user.google_id = google_id;
      user.avatarUrl = avatarUrl || user.avatarUrl;

      await user.save();

      return user;
    }

    const newUser = await User.create({
      email: email,
      google_id: google_id,
      name: name,
      avatarUrl: avatarUrl,
      role: UserRole.USER,
      isActive: true,
    });

    return newUser;
  }
}
