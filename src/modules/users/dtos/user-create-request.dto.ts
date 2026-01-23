import { z } from "zod";
import { UserRole } from "../enums/UserRole.enum.js";

export const UserCreateSchema = z.object({
  name: z
    .string({ error: "O nome é obrigatório" })
    .min(2, "O nome deve ter no mínimo 2 caracteres"),

  email: z
    .string({ error: "O e-mail é obrigatório" })
    .email("Formato de e-mail inválido"),

  googleId: z.string(),

  avatarUrl: z.string().url("URL do avatar inválida"),

  role: z.nativeEnum(UserRole),

  isActive: z.boolean(),
});

export type UserCreateDTO = z.infer<typeof UserCreateSchema>;
