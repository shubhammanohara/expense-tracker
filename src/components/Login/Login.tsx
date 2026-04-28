import { useState } from "react";
import { Eye, EyeOff, ChevronRight } from "lucide-react";
import Button from "../Button";

const Login = ({
  setIsLoggedIn,
}: {
  setIsLoggedIn: (isLoggedIn: boolean) => void;
}) => {
  const [showPassword, setShowPassword] = useState(false);

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
            <label className="mb-2 block text-sm font-semibold text-on-surface-variant">
              Email Address
            </label>

            <input
              type="email"
              placeholder="name@company.com"
              className="h-14 w-full rounded-lg bg-surface-container-high px-5 text-on-surface placeholder:text-on-surface-variant/50 outline-none transition focus:ring-2 focus:ring-primary/30"
            />
          </div>

          {/* Password */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <label className="text-sm font-semibold text-on-surface-variant">
                Password
              </label>

              <button
                type="button"
                className="text-sm font-semibold text-primary hover:opacity-80"
              >
                Forgot Password?
              </button>
            </div>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="h-14 w-full rounded-lg bg-surface-container-high px-5 pr-14 text-on-surface placeholder:text-on-surface-variant/50 outline-none transition focus:ring-2 focus:ring-primary/30"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant"
              >
                {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
              </button>
            </div>
          </div>

          {/* Login Button */}
          <Button
            onClick={() => setIsLoggedIn(true)}
            size="lg"
            className="w-full mt-2"
          >
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
