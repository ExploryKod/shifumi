/** Port: hash/compare without tying the domain to bcrypt/argon2. */

export type PasswordHash = string;

export interface PasswordHasher {
  hash(plainPassword: string): Promise<PasswordHash>;
  compare(plainPassword: string, passwordHash: PasswordHash): Promise<boolean>;
}
