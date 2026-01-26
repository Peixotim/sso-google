import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { UserService } from "../../users/services/users.service.js";

export class AuthController {
  private userService = new UserService();

  /**
   * Callback do Google OAuth.
   * Executa após o Google validar o usuário e retornar para a aplicação.
   *
   * @fluxo
   * 1. Recebe profile do Google.
   * 2. Cria ou recupera usuário (FindOrCreate).
   * 3. Gera JWT.
   * 4. Define Cookie HttpOnly e redireciona.
   *
   * @architecture_note
   * **Fluxo de Autenticação via Cookie (HttpOnly):**
   *
   * - **Back-end:** Define `res.cookie(...)` e faz `res.redirect('front/dashboard')`.
   * - **Front-end:** Não recebe o token visualmente/manualmente. Apenas sofre o redirect.
   *
   * **Como consumir a API:**
   * O Front-end deve configurar o axios/fetch com `withCredentials: true`.
   * O navegador anexará o cookie automaticamente "por baixo dos panos" em cada request.
   *
   * **Segurança:**
   * - Protege contra roubo de token via XSS (JS não lê o cookie).
   * - Exige proteção contra CSRF em operações críticas de escrita.
   */

  public async googleCallBack(req: Request, res: Response) {
    try {
      const frontendUrl = process.env.FRONTEND_URL as string;
      const googleProfile = req.user as any;
      const user = await this.userService.findOrCreateByGoogle(googleProfile);

      const token = jwt.sign(
        {
          id: user.id,
          role: user.role,
          email: user.email,
        },
        process.env.JWT_SECRET as string,
        {
          expiresIn: "1d",
        },
      );

      // Define o cookie no navegador do usuário
      res.cookie("token", token, {
        httpOnly: true, // Impede acesso via JS no front (document.cookie)
        secure: process.env.NODE_ENV === "production", // HTTPS obrigatório em prod
        maxAge: 24 * 60 * 60 * 1000, // 1 dia em milissegundos
        sameSite: "lax", // Proteção básica contra CSRF
      });

      return res.redirect(`${frontendUrl}/dashboard`);
    } catch (error) {
      console.error(error);
      return res.redirect(
        `${process.env.FRONTEND_URL}/login?error=auth_failed`,
      );
    }
  }
}
