"use server";

import { redirect } from "next/navigation";
import { verifySession } from "@/lib/dal";
import { registerUser } from "@/services/users-service";
import { ApiError, ForbiddenError } from "@/lib/api-client";

export type UserFormState = { error: string; status?: number } | undefined;

const PASSWORD_REQUIREMENTS_MESSAGE =
  "Password must be at least 6 characters and include an uppercase letter and a special character.";

function isValidPassword(password: string): boolean {
  return (
    password.length >= 6 &&
    /[A-Z]/.test(password) &&
    /[^A-Za-z0-9]/.test(password)
  );
}

export async function registerUserAction(
  _prevState: UserFormState,
  formData: FormData
): Promise<UserFormState> {
  const username = formData.get("username");
  const password = formData.get("password");
  const email = formData.get("email");
  const firstName = formData.get("firstName");
  const lastName = formData.get("lastName");
  const role = formData.get("role");

  if (
    typeof username !== "string" ||
    !username.trim() ||
    typeof password !== "string" ||
    !password ||
    typeof email !== "string" ||
    !email.trim() ||
    (role !== "Admin" && role !== "User")
  ) {
    return { error: "Username, password, email, and a valid role are required." };
  }

  if (!isValidPassword(password)) {
    return { error: PASSWORD_REQUIREMENTS_MESSAGE };
  }

  const session = await verifySession();

  try {
    await registerUser(
      {
        username: username.trim(),
        password,
        email: email.trim(),
        firstName: typeof firstName === "string" && firstName.trim() ? firstName.trim() : undefined,
        lastName: typeof lastName === "string" && lastName.trim() ? lastName.trim() : undefined,
        role,
      },
      session.token
    );
  } catch (err) {
    if (err instanceof ForbiddenError) {
      return { error: err.message, status: err.status };
    }
    if (err instanceof ApiError) {
      return {
        error: err.message || "Could not create the user.",
        status: err.status,
      };
    }
    return { error: "Unable to reach the server. Please try again." };
  }

  redirect("/dashboard/users");
}
