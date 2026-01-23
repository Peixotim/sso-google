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
}
