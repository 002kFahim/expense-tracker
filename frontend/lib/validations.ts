import { z } from "zod";

export const expenseSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title must be less than 100 characters"),
  amount: z.number().min(0.01, "Amount must be greater than 0"),
  category: z.enum([
    "Food",
    "Transport",
    "Shopping",
    "Entertainment",
    "Health",
    "Education",
    "Bills",
    "Others",
  ]),
  date: z.string().min(1, "Date is required"),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export const registerSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type ExpenseFormData = z.infer<typeof expenseSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
