import { createAuthModule } from "@modules/auth/auth.module";
import {
  UserAlreadyExistsError,
  InvalidEmailError,
} from "@modules/auth/domain/errors/errors.entity";
import { prisma } from "@/lib/prisma";
import { RegisterRequestSchema } from "../schemas";

/** POST /api/auth/register — wires `createAuthModule`, maps domain errors to HTTP. */
export async function POST(request: Request) {
  const auth = createAuthModule({
    prisma,
    resendApiKey: process.env.RESEND_API_KEY!,
  });

  try {
    const rawBody: unknown = await request.json();
    const parsed = RegisterRequestSchema.safeParse(rawBody);
    if (!parsed.success) {
      const messages = parsed.error.issues
        .map((issue: { message: string }) => issue.message)
        .join(", ");
      return Response.json({ error: messages }, { status: 400 });
    }
    const body = parsed.data;
    const result = await auth.registerUser.execute(body);
    return Response.json(result);
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return Response.json({ error: error.message }, { status: 409 });
    }
    if (error instanceof InvalidEmailError) {
      return Response.json({ error: error.message }, { status: 400 });
    }
    console.error("Registration failed:", error);
    return Response.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
