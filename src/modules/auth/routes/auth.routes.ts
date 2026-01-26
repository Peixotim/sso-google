import { Router } from "express";
import { AuthController } from "../controllers/auth.controller.js";
import passport from "passport";

const authRoutes = Router();
const controller = new AuthController();

authRoutes.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  }),
);

authRoutes.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/login",
  }),
  controller.googleCallBack.bind(controller),
);

export default authRoutes;
