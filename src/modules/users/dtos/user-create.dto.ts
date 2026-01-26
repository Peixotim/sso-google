import { UserRole } from "../enums/UserRole.enum.js";

export interface UserCreateDTO {
  name: string;
  google_id: string;
  email: string;
  avatarUrl?: string;
  role: UserRole;
  isActive: boolean;
}
