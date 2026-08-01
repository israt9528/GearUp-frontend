"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import {
  Loader2,
  Lock,
  Mail,
  User,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { authApi } from "@/api/auth.api";
import { useAuthStore } from "@/store/useAuthStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Logo } from "@/components/common/logo";

const registerSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["CUSTOMER", "PROVIDER"], {
    error: "Role is required",
  }),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { role: "CUSTOMER" },
  });

  const mutation = useMutation({
    mutationFn: authApi.register,
    onSuccess: (data) => {
      if (data.data) {
        setAuth(data.data.user, data.data.token);
        toast.success("Account created successfully!");
        router.push("/");
      }
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = (data: RegisterFormValues) => {
    mutation.mutate(data);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50/20 to-indigo-50/30 dark:from-slate-950 dark:to-slate-900 flex flex-col items-center justify-center p-4 sm:p-6">
      {/* Brand Header */}
      <div className="mb-6">
        <Logo />
      </div>

      {/* Registration Card Container */}
      <Card className="w-full max-w-md border-border/80 shadow-xl bg-card/95 backdrop-blur-xl rounded-3xl overflow-hidden">
        <CardHeader className="space-y-1 text-center px-6  py-3">
          <CardTitle className="text-2xl font-bold tracking-tight text-foreground">
            Create an Account
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            Join GearUp to rent professional equipment or list your own gear
          </CardDescription>
        </CardHeader>

        <CardContent className="px-6 pb-8 pt-2">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Name Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  {...register("name")}
                  type="text"
                  placeholder="John Doe"
                  className="pl-10 h-11 rounded-xl bg-background/50 focus-visible:ring-blue-950"
                />
              </div>
              {errors.name && (
                <p className="text-red-500 text-xs font-medium mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  {...register("email")}
                  type="email"
                  placeholder="you@example.com"
                  className="pl-10 h-11 rounded-xl bg-background/50 border-border focus-visible:ring-blue-950"
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-xs font-medium mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  {...register("password")}
                  type="password"
                  placeholder="••••••••"
                  className="pl-10 h-11 rounded-xl bg-background/50 border-border focus-visible:ring-blue-950"
                />
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs font-medium mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Account Role Selector */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                I want to...
              </label>
              <select
                {...register("role")}
                className="flex h-11 w-full rounded-xl border border-border bg-background/50 px-3 py-2 text-sm text-foreground ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-950 focus-visible:ring-offset-2 transition-colors"
              >
                <option value="CUSTOMER">Rent Gear (Customer)</option>
                <option value="PROVIDER">List Gear (Provider)</option>
              </select>
              {errors.role && (
                <p className="text-red-500 text-xs font-medium mt-1">
                  {errors.role.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full h-11 rounded-xl bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold shadow-md transition-all gap-2 mt-2"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Creating
                  account...
                </>
              ) : (
                <>
                  Get Started <ArrowRight className="h-4 w-4" />
                </>
              )}
            </Button>
          </form>

          {/* Login Redirect Link */}
          <div className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold text-primary hover:underline transition-colors"
            >
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Security Footer Notice */}
      <div className="mt-8 flex items-center gap-1.5 text-xs text-muted-foreground">
        <ShieldCheck className="h-4 w-4 text-green-600" />
        <span>Secure registration & verified onboarding</span>
      </div>
    </div>
  );
}
