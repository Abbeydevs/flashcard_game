"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { Argon2id } from "oslo/password";
import { cookies } from "next/headers";
import { lucia, prisma } from "@/lib/auth";
import { revalidatePath } from "next/cache";

const signupSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

interface ActionResult {
  error: string | null;
}

export async function signup(formData: FormData) {
  const rawData = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const result = signupSchema.safeParse(rawData);

  if (!result.success) {
    return { error: result.error.flatten().fieldErrors };
  }

  const { email, password } = result.data;

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return { error: "User already exists" };
    }

    const hashedPassword = await new Argon2id().hash(password);

    const userId = crypto.randomUUID();

    await prisma.user.create({
      data: {
        id: userId,
        email,
        hashedPassword,
      },
    });

    const session = await lucia.createSession(userId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);

    (await cookies()).set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );
  } catch (e) {
    if ((e as any).digest?.startsWith("NEXT_REDIRECT")) throw e;

    console.error(e);
    return { error: "An unexpected error occurred" };
  }

  return redirect("/dashboard");
}

export async function logout(): Promise<ActionResult> {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get(lucia.sessionCookieName)?.value ?? null;

  if (!sessionId) {
    return { error: "Not logged in" };
  }

  await lucia.invalidateSession(sessionId);

  const sessionCookie = lucia.createBlankSessionCookie();
  cookieStore.set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );

  revalidatePath("/");
  return redirect("/login");
}
