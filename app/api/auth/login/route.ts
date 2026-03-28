import { createAuthModule } from "@modules/auth/auth.module";
import {
  InvalidCredentialsError,
  InvalidEmailError,
} from "@modules/auth/domain/errors/errors.entity";
import { prisma } from "@/lib/prisma";
import { LoginRequestSchema } from "../schemas";

/** POST /api/auth/login — wires `createAuthModule`, maps domain errors to HTTP. */
export async function POST(request: Request) {
  const auth = createAuthModule({
    prisma,
    resendApiKey: process.env.RESEND_API_KEY!,
  });

  try {
    const rawBody: unknown = await request.json();
    const parsed = LoginRequestSchema.safeParse(rawBody);
    if (!parsed.success) {
      const messages = parsed.error.issues
        .map((issue: { message: string }) => issue.message)
        .join(", ");
      return Response.json({ error: messages }, { status: 400 });
    }
    const body = parsed.data;
    const result = await auth.login.execute(body);
    return Response.json(result);
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return Response.json({ error: error.message }, { status: 401 });
    }
    if (error instanceof InvalidEmailError) {
      return Response.json({ error: error.message }, { status: 400 });
    }
    console.error("Login failed:", error);
    return Response.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
