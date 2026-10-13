import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerCustomer } from "../services/customerApi";
import {ChefHat} from "lucide-react"

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

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

    if (formData.password !== formData.confirmPassword) {
      setError("Your passwords don't match. Please try again.");
      return;
    }

    setIsSubmitting(true);

    try {
      const { confirmPassword, ...customerCreate } = formData;

      await registerCustomer(customerCreate);

      navigate("/login", {
        replace: true,
        state: {
          message: "Account created successfully! Sign in to start ordering.",
        },
      });
    } catch (err) {
      setError(
        err?.message ||
          "We couldn't create your account. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  const inputClass =
    "w-full rounded-xl border border-white/20 bg-white px-4 py-3 " +
    "text-[#20251F] placeholder:text-gray-400 outline-none transition " +
    "focus:border-[#E6B84A] focus:ring-2 focus:ring-[#E6B84A]/40 " +
    "disabled:cursor-not-allowed disabled:opacity-60";

  return (
    <main className="min-h-screen bg-cream px-4 py-10 sm:px-6 lg:py-16">
      <div className="mx-auto grid w-full max-w-6xl overflow-hidden rounded-3xl bg-soft-white shadow-xl lg:min-h-[680px] lg:grid-cols-2">
       
        <section className="relative hidden overflow-hidden bg-green/95 p-10 text-soft-white lg:flex lg:flex-col lg:justify-between xl:p-14">
          <Link to="/" className="w-fit flex items-center font-display text-3xl font-bold  tracking-tight">Alte 
            <ChefHat size={20} className ="text-yellow" />
          </Link>

          <div className="relative z-10 max-w-md">
            <p className="mb-4 text-sm font-semibold font-sans uppercase tracking-[0.2em] text-yellow"> Good food, good moments</p>

            <h1 className=" text-5xl font-display leading-tight  xl:text-6xl">Good food starts here.</h1>

            <p className="mt-6 max-w-sm text-base leading-7 text-white/80"> Create your account, discover your favourites, and make your next meal something to look forward to.</p>
          </div>

          <p className="text-sm text-white/60">Made for the love of good food.</p>

          
          <div aria-hidden="true"className="absolute right-16 top-24 h-20 w-20 rounded-full bg-yellow/10" />
        </section>

        {/* Registration form */}
        <section className="flex items-center justify-center px-1 py-4 sm:px-6 lg:px-10 xl:px-14">
          <div className="w-full max-w-md px-4">
           

            <div className="mb-8 mt-4 ">
              <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-fresh-green"> Join us </p>

              <h2 className="font-display text-3xl font-bold text-charcoal sm:text-4xl"> Create your account. </h2>

              <p className="mt-3 leading-6 text-[#62675F]">A few details and you're ready to explore the menu. </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="mb-2 block text-sm font-semibold text-[#20251F]"  > Full name </label>
                <input className={inputClass} type="text" name="name" id="name" autoComplete="name"placeholder="e.g. Fiyinfoluwa Kaiyewu" value={formData.name} onChange={handleChange}required minLength={2} disabled={isSubmitting}/>
              </div>

              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-semibold text-[#20251F]" >  Email address </label>
                <input className={inputClass} type="email" name="email" id="email" autoComplete="email" placeholder="you@example.com" value={formData.email}  onChange={handleChange} required disabled={isSubmitting}/>
              </div>

              <div>
                <label htmlFor="phone"  className="mb-2 block text-sm font-semibold text-[#20251F]"  >
                  Phone number
                </label>
                <input  className={inputClass} type="tel"   name="phone" id="phone" autoComplete="tel" placeholder="Your phone number"  value={formData.phone} onChange={handleChange} required disabled={isSubmitting}/>
              </div>

              <div>
                <label htmlFor="password" className="mb-2 block text-sm font-semibold text-[#20251F]" >
                  Password
                </label>
                <input className={inputClass}type="password" name="password" id="password" autoComplete="new-password" placeholder="Create a password" value={formData.password} onChange={handleChange} required minLength={8} disabled={isSubmitting} />
                <p className="mt-2 text-xs leading-5 text-[#62675F]"> Use at least 8 characters, password must be strong.</p>
              </div>

              <div>
                <label htmlFor="confirmPassword" className="mb-2 block text-sm font-semibold text-[#20251F]" >
                  Confirm password
                </label>
                <input className={inputClass} type="password" name="confirmPassword"  id="confirmPassword" autoComplete="new-password"  placeholder="Enter your password again" value={formData.confirmPassword}onChange={handleChange} required disabled={isSubmitting} aria-invalid={Boolean(error)} />
              </div>

              {error && (
                <p role="alert"className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-6 text-red-700" >
                  {error}
                </p>
              )}

              <button type="submit" disabled={isSubmitting} className="flex w-full items-center justify-center rounded-xl bg-[#E6B84A] px-5 py-3.5 font-semibold text-[#20251F] transition hover:bg-[#D9AA37] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#245C3A] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? "Creating your account..." : "Create account"}
              </button>
            </form>

            <p className="mt-7 text-center text-sm text-[#62675F]">
              Already have an account?{" "}
              <Link to="/login" className="font-semibold text-[#245C3A] underline-offset-4 hover:underline focus:outline-none focus-visible:underline" >
                Sign in
              </Link>
            </p>

            <p className="mt-8 text-center text-xs text-[#858980]">By creating an account, you can keep track of your orders and  make ordering easier.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

export default Register;



