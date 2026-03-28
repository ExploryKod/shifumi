import { PrismaClient } from '@/generated/prisma/client';

import { RegisterUserUseCase } from './use-cases/commands/register-user.usecase';
import { PrismaUserRepository } from './infra/repositories/prisma/prisma-user.reposirory';
import { ResendEmailService } from './infra/services/resend-email.service';
import { BCryptPasswordHasher } from '@modules/auth/infra/services/bcrypt-password-hasher';
import { LoginUseCase } from './use-cases/commands/login-user.usecase';

// -----------------------------------------------------------------------------
// Module factory
// -----------------------------------------------------------------------------

export function createAuthModule(config: {
  prisma: PrismaClient;
  resendApiKey: string;
}) {
  const userRepo = new PrismaUserRepository(config.prisma);
  const passwordHasher = new BCryptPasswordHasher();
  const emailService = new ResendEmailService(config.resendApiKey);

  const registerUserUseCase = new RegisterUserUseCase(
    userRepo,
    emailService,
    passwordHasher
  );

  const loginUseCase = new LoginUseCase(userRepo, passwordHasher);

  return {
    registerUser: registerUserUseCase,
    login: loginUseCase,
  };
}
