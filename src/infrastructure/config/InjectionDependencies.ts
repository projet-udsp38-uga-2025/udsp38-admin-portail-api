import { UserRepository } from '@/domain/repositories/UserRepository';
import { container } from 'tsyringe';
import { UserPrismaRepository } from '../database/prisma/repositories/UserPrismaRepository';

container.register<UserRepository>('IUserRepository', {
  useClass: UserPrismaRepository,
});