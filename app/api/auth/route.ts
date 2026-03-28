import { createAuthModule } from "@modules/auth/auth.module";
import {
  UserAlreadyExistsError,
  InvalidEmailError,
} from "@modules/auth/domain/errors/errors.entity";
import { prisma } from "@/lib/prisma";

/** Legacy POST /api/auth — prefer `/api/auth/register`; same handler shape as register route. */
export async function POST(request: Request) {
  const auth = createAuthModule({
    prisma,
    resendApiKey: process.env.RESEND_API_KEY!,
  });

  try {
    const body = await request.json();
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