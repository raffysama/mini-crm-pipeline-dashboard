import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import toast from "react-hot-toast";

function LoginPage() {
  const { login, signup } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isSignUp) {
        await signup(email, password);
        toast.success("Account created successfully");
        setIsSignUp(false);
      } else {
        await login(email, password);
        toast.success("Login successful");
      }
      setEmail("");
      setPassword("");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50">
      <div className="w-full max-w-sm rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
        {/* Logo */}
        <div className="mb-6 flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900">
            <i className="ti ti-chart-dots text-sm text-white" />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900">Mini CRM</p>
            <p className="text-xs text-slate-400">Pipeline Dashboard</p>
          </div>
        </div>

        <h1 className="mb-1 text-lg font-semibold text-slate-900">
          {isSignUp ? "Create account" : "Welcome back"}
        </h1>
        <p className="mb-6 text-sm text-slate-500 ">
          {isSignUp ? "Sign up to get started" : "Sign in to your account"}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-slate-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-slate-400"
              placeholder="you@example.com"
              required
            />
          </div>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 pr-10 text-sm outline-none focus:border-slate-400"
              placeholder="••••••••"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <i
                className={`ti ${showPassword ? "ti-eye-off" : "ti-eye"} text-base`}
              />
            </button>
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-slate-900 py-2 text-sm font-medium text-white hover:bg-slate-800 disabled:opacity-50"
          >
            {loading ? "Please wait..." : isSignUp ? "Sign up" : "Sign in"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-slate-500">
          {isSignUp ? "Already have an account?" : "Don't have an account?"}
          <button
            onClick={() => {
              setIsSignUp(!isSignUp);
              setError("");
            }}
            className="ml-1 font-medium text-slate-900 hover:underline cursor-pointer"
          >
            {isSignUp ? "Sign in" : "Sign up"}
          </button>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
