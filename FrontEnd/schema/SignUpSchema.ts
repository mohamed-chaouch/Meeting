import { z } from "zod";

export const SignUpSchema = z.object({
  username: z
    .string()
    .nonempty({ message: "Name is required" })
    .min(3,{
      message : "Username must be at least 3 characters"
    })
    .trim(),

  // gender: z.string().trim().nonempty({ message: "Gender is required" }),

  // phoneNumber: z
  //   .string()
  //   .trim()
  //   .nonempty({ message: "Phone Number is required" }),

  email: z
    .string()
    .nonempty({ message: "Email is required" })
    .email()
    .trim()
    .toLowerCase(),


    password: z
    .string()
    .nonempty({ message: "Password is required" })
    .regex(/[0-9]/, { message: "Password must contain at least one number" })   // Check for at least one number
    .regex(/[!@#$%^&*(),.?":{}|<>]/, {
      message: "Password must contain at least one special character"
    })   // Check for at least one special character
    .min(8, {
      message: "Password must be at least 8 characters long"
    })
    .trim(),

});
