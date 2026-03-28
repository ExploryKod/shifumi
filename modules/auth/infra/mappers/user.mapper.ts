import {
  Email,
  Feature,
  User,
  UserId,
  UserProfile,
  UserStatus,
} from "@modules/auth/domain/entities/user.entity";
import type {
  PrismaUserRecord,
  PrismaUserPersistence,
} from "../repositories/prisma/prisma-user.types";

/** Maps Prisma user rows to domain `User` (and back). */
export class UserMapper {
  static toDomain(record: PrismaUserRecord): User {
    const id = UserId.create(record.id);
    const email = Email.create(record.email);
    const profile = UserProfile.create({
      name: record.name ?? "",
      tier: [] as Feature[],
    });
    const status = record.status ? UserStatus.active() : UserStatus.inactive();

    return User.create({
      id,
      email,
      profile,
      password: record.passwordHash,
      status,
    });
  }

  static toPersistence(user: User): PrismaUserPersistence {
    return {
      id: user.id.value,
      email: user.email.value,
      name: user.profile.name,
      passwordHash: user.getPasswordHash(),
      status: user.isActive(),
    };
  }
}