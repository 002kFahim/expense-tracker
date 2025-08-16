import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import Link from "next/link";
import { registerSchema, type RegisterFormData } from "@/lib/validations";
import { authApi } from "@/lib/api";
import { setAuthData } from "@/lib/auth";
import Input from "./ui/Input";
import Button from "./ui/Button";
import { Card, CardContent } from "./ui/Card";

const RegisterForm: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setLoading(true);
      setError("");
      const response = await authApi.register(
        data.name,
        data.email,
        data.password
      );
      setAuthData(response.token, response.user);
      router.push("/");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "Registration failed");
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Or{" "}
            <Link
              href="/auth/login"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              sign in to your existing account
            </Link>
          </p>
        </div>

        <Card>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <Input
                label="Full Name"
                {...register("name")}
                error={errors.name?.message}
                placeholder="Enter your full name"
              />

              <Input
                label="Email"
                type="email"
                {...register("email")}
                error={errors.email?.message}
                placeholder="Enter your email"
              />

              <Input
                label="Password"
                type="password"
                {...register("password")}
                error={errors.password?.message}
                placeholder="Enter your password (min 6 characters)"
              />

              <Button type="submit" loading={loading} className="w-full">
                Create Account
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RegisterForm;
