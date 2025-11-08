import 'reflect-metadata';
import '@/infrastructure/config/InjectionDependencies';
import { UsersService } from "@/application/services/UserService";


/**
 * @openapi
 * /api/users:
 *   get:
 *     tags:
 *       - Users routes
 *     summary: Liste tous les utilisateurs
 *     responses:
 *       200:
 *         description: Succès
 */
export async function GET() {
  const userService = new UsersService();
  const users = await userService.listUsers();
  
  return new Response(JSON.stringify(users), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}