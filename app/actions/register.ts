"use server";

import { z } from "zod";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import { hashPassword } from "@/lib/password";

const registerSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must contain at least 2 characters.")
    .max(80, "Name is too long."),

  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Please enter a valid email address."),

  password: z
    .string()
    .min(8, "Password must contain at least 8 characters.")
    .refine(
      (password) => Buffer.byteLength(password, "utf8") <= 72,
      "Password must not exceed 72 bytes.",
    ),
});

export type RegisterState = {
  success: boolean;
  message: string;
  errors?: {
    name?: string[];
    email?: string[];
    password?: string[];
  };
};

export async function registerUser(
  _prevState: RegisterState,
  formData: FormData,
): Promise<RegisterState> {
  // 1. Validate the submitted form data
  const validatedFields = registerSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      success: false,
      message: "Please correct the highlighted fields.",
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { name, email, password } = validatedFields.data;

  try {
    // 2. Connect to MongoDB
    await connectDB();

    // 3. Prevent duplicate accounts
    const existingUser = await User.exists({ email });

    if (existingUser) {
      return {
        success: false,
        message: "An account with this email already exists.",
      };
    }

    // 4. Hash the password before saving
    const passwordHash = await hashPassword(password);

    // 5. Create the user
    await User.create({
      name,
      email,
      passwordHash,
    });

    return {
      success: true,
      message: "Account created successfully!",
    };
  } catch (error) {
    // Handle a duplicate email inserted by another request
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === 11000
    ) {
      return {
        success: false,
        message: "An account with this email already exists.",
      };
    }

    console.error("Registration failed:", error);

    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }
}
