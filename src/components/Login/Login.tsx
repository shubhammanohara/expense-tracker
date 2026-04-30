import { ChevronRight } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useLogin, useRegister } from "@/src/hooks/useAuth";

import Button from "../Button";
import { Input } from "../Input";

const Login = () => {
  const [isRegister, setIsRegister] = useState(false);

  const [name, setName] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);

  const navigate = useNavigate();

  const { mutate: login, isPending: loginLoading } = useLogin();
  const { mutate: register, isPending: registerLoading } = useRegister();

  const isPending = loginLoading || registerLoading;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isRegister) {
      if (name && email && password) {
        register(
          { name, email, password },
          {
            onSuccess: () => navigate("/dashboard"),
          },
        );
      }
    } else {
      if (email && password) {
        login(
          { email, password },
          {
            onSuccess: () => navigate("/dashboard"),
          },
        );
      }
    }
  };

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center p-6">
      {/* Background Glow */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-10 left-10 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-10 right-10 h-72 w-72 rounded-full bg-secondary/10 blur-3xl" />
      </div>

      {/* Card */}
      <div className="w-full max-w-md rounded-lg glass-card p-8 md:p-10">
        {/* Logo */}
        <h1 className="font-headline text-3xl font-extrabold tracking-tight text-primary">
          SpendWise
        </h1>

        {/* Header */}
        <div className="mt-12">
          <h2 className="font-headline text-4xl font-bold text-on-surface">
            {isRegister ? "Create Account" : "Sign In"}
          </h2>

          <p className="mt-4 text-md leading-relaxed text-on-surface-variant">
            {isRegister
              ? "Create your account to start tracking expenses."
              : "Enter your credentials to access your vault."}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-10 space-y-6">
          {/* Name */}
          {isRegister && (
            <Input
              label="Full Name"
              type="text"
              placeholder="John Doe"
              onChange={(e) => setName(e.target.value)}
            />
          )}

          {/* Email */}
          <Input
            label="Email Address"
            type="email"
            placeholder="name@company.com"
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Password */}
          <div>
            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              onChange={(e) => setPassword(e.target.value)}
            />

            {!isRegister && (
              <div className="mt-2 text-sm">
                <span className="text-on-surface-variant">Trouble signing in?</span>

                <button
                  type="button"
                  className="ml-2 font-semibold text-primary hover:opacity-80"
                >
                  Reset Password
                </button>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <Button type="submit" size="lg" className="w-full mt-2" disabled={isPending}>
            {isPending ? "Please wait..." : isRegister ? "Register" : "Login"}{" "}
            <ChevronRight size={20} />
          </Button>
        </form>

        {/* Divider */}
        <div className="my-10 flex items-center gap-4">
          <div className="h-px flex-1 bg-black/10" />
          <span className="text-sm font-semibold uppercase text-on-surface-variant/60">
            or continue with
          </span>
          <div className="h-px flex-1 bg-black/10" />
        </div>

        {/* Social Buttons */}
        <div className="grid grid-cols-2 gap-4">
          <Button className="h-14 rounded-2xl bg-surface-container-high flex items-center justify-center font-semibold text-on-surface">
            Google
          </Button>

          <Button className="h-14 rounded-2xl bg-black text-white flex items-center justify-center font-semibold">
            Apple
          </Button>
        </div>

        {/* Footer */}
        <p className="mt-10 text-center text-sm text-on-surface-variant">
          {isRegister ? "Already have an account?" : "New to SpendWise?"}

          <button
            onClick={() => setIsRegister(!isRegister)}
            className="ml-2 font-semibold text-primary hover:underline"
          >
            {isRegister ? "Sign In" : "Create an account"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
