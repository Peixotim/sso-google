import { UserCreateSchema } from "../dtos/user-create-request.dto.js";
import { UserService } from "../services/users.service.js";
import { Request, Response } from "express";

export class UsersController {
  usersService = new UserService();

  public async findAll(req: Request, res: Response) {
    try {
      const users = await this.usersService.findAll();
      return res.status(200).json(users);
    } catch (error) {
      console.error(error);
    }
  }

  public async create(req: Request, res: Response) {
    const validation = UserCreateSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({
        message: "Error of Validation",
        errors: validation.error.format(),
      });
    }

    try {
      const newUser = await this.usersService.create(validation.data);
      return res.status(201).json(newUser);
    } catch (error: any) {
      if (
        error.message ===
        "A user with this email address is already registered!"
      ) {
        return res.status(409).json({ error: error.message });
      }

      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
}
