import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const registrationMessage = location.state?.message || "";

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setError("");
    setIsSubmitting(true);

    try {
      await login(formData);

      navigate("/menu", { replace: true });
    } catch (err) {
      setError(
        err?.message ||
          "We couldn't sign you in. Check your details and try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  const inputClass ="w-full rounded-xl border border-charcoal/70 bg-white px-4 py-3 " +"text-[#20251F] placeholder:text-gray-400 outline-none transition " + "focus:border-yellow focus:ring-2 focus:ring-yellow/20 " + "disabled:cursor-not-allowed disabled:opacity-60";

  return (
    <main className="min-h-screen bg-cream px-4 py-10 sm:px-2  lg:py-16">
      <div className="mx-auto grid w-full max-w-6xl overflow-hidden rounded-3xl bg-soft-white shadow-xl lg:min-h-[600px] lg:grid-cols-2">

        <section className="relative hidden overflow-hidden bg-green/95 p-10 text-soft-white lg:flex lg:flex-col lg:justify-between xl:p-14">
       

          <div className="relative z-10 max-w-md">
            <p className="mb-4 text-sm font-semibold  uppercase tracking-[0.2em] text-yellow">
              Welcome back
            </p>

            <h1 className="font-display text-5xl leading-tight xl:text-6xl">
              Your next favourite meal is waiting.
            </h1>

            <p className="mt-6 max-w-sm text-base leading-7 text-white/80">
              Come back to discover delicious meals and make your next order
              with ease.
            </p>
          </div>

          <p className="text-sm text-white/60"> Good food, good moments.</p>

          <div
            aria-hidden="true"
            className="absolute right-16 top-24 h-20 w-20 rounded-full bg-[#E6B84A]/10"
          />
        </section>

        {/* Login form */}
        <section className="flex items-center justify-center px-1 py-4 sm:px-6 sm:py-10 lg:px-10 xl:px-14 my-6">
          <div className="w-full px-4 max-w-md">

            <div className="mb-8 ">
              <p className="mb-2 text-sm font-semibold  uppercase tracking-widest text-green"> Your table is waiting </p>

              <h2 className="font-display text-3xl font-bold text-charcoal sm:text-4xl"> Welcome back. </h2>

              <p className="mt-3 leading-6 text-charcoal/70"> Sign in to continue your food journey.</p>
            </div>

            {registrationMessage && (
              <p role="status" className="mb-6 rounded-xl border border-[#C9DEC8] bg-[#EDF5E9] px-4 py-3 text-sm leading-6 text-[#245C3A]">
                {registrationMessage}
              </p>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-semibold text-charcoal"> Email address</label>

                <input className={inputClass} type="email" name="email" id="email" autoComplete="email" placeholder="you@example.com" value={formData.email} onChange={handleChange} required disabled={isSubmitting} />
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between gap-3">
                  <label  htmlFor="password"  className="block text-sm font-semibold text-charcoal" >  Password </label>
                </div>

                <div className="relative">
                  <input className={`${inputClass} pr-20`}type={showPassword ? "text" : "password"}  name="password"  id="password" autoComplete="current-password" placeholder="Enter your password" value={formData.password} onChange={handleChange} required  disabled={isSubmitting} />

                  <button type="button"
                    onClick={() => setShowPassword((previous) => !previous)}
                    className="absolute inset-y-0 right-3 my-auto rounded-md px-2 text-sm font-semibold text-green hover:bg-cream focus:outline-none focus-visible:ring-2 focus-visible:ring-green"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    aria-pressed={showPassword}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              {error && (
                <p role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-6 text-red-700"
                >
                  {error}
                </p>
              )}

              <button type="submit" disabled={isSubmitting}className="w-full rounded-xl bg-[#245C3A] px-5 py-3.5 font-semibold text-white transition hover:bg-[#19472B] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#245C3A] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"  >
                {isSubmitting ? "Signing you in..." : "Sign in"}
              </button>
            </form>

            <p className="mt-7 text-center text-sm text-[#62675F]">
              New to Alte?{" "}
              <Link to="/register" className="font-semibold text-[#245C3A] underline-offset-4 hover:underline focus:outline-none focus-visible:underline" >
                Create an account
              </Link>
            </p>

            <p className="mt-8 text-center text-sm">
              <Link   to="/menu" className="font-medium text-[#62675F] underline-offset-4 hover:text-[#245C3A] hover:underline" >
                Continue exploring the menu
              </Link>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

export default Login;



