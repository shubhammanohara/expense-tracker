import { useState } from "react";
import { Eye, EyeOff, ChevronRight } from "lucide-react";
import Button from "../Button";
import { useLogin } from "@/src/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Input } from "../Input";

const Login = () => {
  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const navigate = useNavigate();

  const { mutate: login, isPending, isError, error } = useLogin();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      login(
        { email, password },
        {
          onSuccess: () => {
            navigate("/dashboard");
          },
          onError: (err) => {
            console.error("Login failed:", err);
          },
        },
      );
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
            Sign In
          </h2>

          <p className="mt-4 text-md leading-relaxed text-on-surface-variant">
            Enter your credentials to access your vault.
          </p>
        </div>

        {/* Form */}
        <form className="mt-10 space-y-6">
          {/* Email */}
          <div>
            <Input
              label="Email Address"
              type="email"
              placeholder="name@company.com"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div>
            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              type="button"
              className="absolute font-semibold text-primary hover:opacity-80"
            >
              Forgot Password?
            </button>
          </div>

          {/* Login Button */}
          <Button onClick={handleSubmit} size="lg" className="w-full mt-2">
            Login <ChevronRight size={20} />
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
          <Button className="h-14 rounded-2xl bg-surface-container-high flex items-center justify-center font-semibold text-on-surface transition hover:bg-surface-container-high">
            Google
          </Button>

          <Button className="h-14 rounded-2xl bg-black text-white flex items-center justify-center font-semibold transition hover:opacity-90">
            Apple
          </Button>
        </div>

        {/* Footer */}
        <p className="mt-10 text-center text-sm text-on-surface-variant">
          New to SpendWise?
          <button className="ml-2 font-semibold text-primary hover:underline">
            Create an account
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
