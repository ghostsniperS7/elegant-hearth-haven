import { z } from "zod";

// Auth validation schemas
export const emailSchema = z
  .string()
  .trim()
  .min(1, "Email is required")
  .email("Please enter a valid email address")
  .max(255, "Email must be less than 255 characters");

export const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .max(72, "Password must be less than 72 characters")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[0-9]/, "Password must contain at least one number");

export const fullNameSchema = z
  .string()
  .trim()
  .min(1, "Full name is required")
  .max(100, "Name must be less than 100 characters")
  .regex(/^[a-zA-Z\s'-]+$/, "Name can only contain letters, spaces, hyphens, and apostrophes");

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, "Password is required"),
});

export const signupSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  fullName: fullNameSchema,
});

// Profile validation schemas
export const phoneSchema = z
  .string()
  .trim()
  .max(20, "Phone number is too long")
  .regex(
    /^$|^\+?[1-9]\d{0,2}[-.\s]?\(?\d{1,4}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/,
    "Please enter a valid phone number"
  )
  .optional()
  .or(z.literal(""));

export const profileUpdateSchema = z.object({
  full_name: z
    .string()
    .trim()
    .max(100, "Name must be less than 100 characters")
    .regex(/^[a-zA-Z\s'-]*$/, "Name can only contain letters, spaces, hyphens, and apostrophes")
    .optional()
    .or(z.literal("")),
  phone: phoneSchema,
});

// Address validation schemas
export const addressSchema = z.object({
  label: z
    .string()
    .trim()
    .min(1, "Label is required")
    .max(50, "Label must be less than 50 characters"),
  street_address: z
    .string()
    .trim()
    .min(1, "Street address is required")
    .max(200, "Address must be less than 200 characters"),
  city: z
    .string()
    .trim()
    .min(1, "City is required")
    .max(100, "City must be less than 100 characters"),
  state: z
    .string()
    .trim()
    .min(1, "State is required")
    .max(50, "State must be less than 50 characters"),
  postal_code: z
    .string()
    .trim()
    .min(1, "Postal code is required")
    .max(20, "Postal code must be less than 20 characters")
    .regex(/^[a-zA-Z0-9\s-]+$/, "Please enter a valid postal code"),
  country: z
    .string()
    .trim()
    .min(1, "Country is required")
    .max(100, "Country must be less than 100 characters"),
});

// Types inferred from schemas
export type LoginFormData = z.infer<typeof loginSchema>;
export type SignupFormData = z.infer<typeof signupSchema>;
export type ProfileUpdateData = z.infer<typeof profileUpdateSchema>;
export type AddressFormData = z.infer<typeof addressSchema>;

// Helper to get user-friendly error messages
export function getAuthErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    const message = error.message.toLowerCase();
    
    if (message.includes("invalid login credentials")) {
      return "Invalid email or password. Please try again.";
    }
    if (message.includes("email already registered") || message.includes("user already registered")) {
      return "An account with this email already exists. Please sign in instead.";
    }
    if (message.includes("email not confirmed")) {
      return "Please verify your email address before signing in.";
    }
    if (message.includes("too many requests")) {
      return "Too many attempts. Please wait a moment and try again.";
    }
    if (message.includes("network")) {
      return "Network error. Please check your connection and try again.";
    }
    
    // Return a sanitized version of the error (avoid exposing technical details)
    return "An error occurred. Please try again.";
  }
  return "An unexpected error occurred. Please try again.";
}
