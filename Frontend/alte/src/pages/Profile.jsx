import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {ArrowLeft, ArrowRight, CheckCircle2, CircleUserRound, ClipboardList, LoaderCircle, LogOut, Mail, Phone, Save, Utensils, X,} from "lucide-react";
import { useAuth } from "../context/AuthContext";

const inputClass =
  "w-full rounded-xl border border-[#DED8CC] bg-soft-white px-4 py-3 text-sm text-charcoal outline-none transition placeholder:text-[#99968D] focus:border-green focus:ring-2 focus:ring-green/10 disabled:cursor-not-allowed disabled:bg-[#F1EDE4]";

export default function Profile() {
  const {
    customer,
    loading,
    isAuthenticated,
    updateProfile,
    logout,
  } = useAuth();

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    phone: "",
  });

  const [saving, setSaving] = useState(false);
  const [signingOut, setSigningOut] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (customer) {
      setForm({
        name: customer.name ?? "",
        phone: customer.phone ?? "",
      });
    }
  }, [customer]);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate("/login", { replace: true });
    }
  }, [loading, isAuthenticated, navigate]);

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));

    setError("");
    setSuccess("");
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const name = form.name.trim();
    const phone = form.phone.trim();

    if (!name) {
      setError("Please enter your name.");
      return;
    }

    if (!phone) {
      setError("Please enter your phone number.");
      return;
    }

    const hasChanges =
      name !== customer.name || phone !== customer.phone;

    if (!hasChanges) {
      setError("You haven't made any changes.");
      return;
    }

    setSaving(true);
    setError("");
    setSuccess("");

    try {
      await updateProfile({ name, phone });
      setSuccess("Your profile has been updated successfully.");
    } catch (err) {
      setError(
        err?.message ||
          "We couldn't update your profile. Please try again."
      );
    } finally {
      setSaving(false);
    }
  }

  async function handleLogout() {
    setSigningOut(true);
    setError("");

    try {
      await logout();
      navigate("/login", { replace: true });
    } catch {
      setError("Something went wrong while signing out.");
    } finally {
      setSigningOut(false);
    }
  }

  if (loading || !isAuthenticated || !customer) {
    return (
      <main className="min-h-screen bg-[#F8F2E5] px-5 py-12">
        <div className="mx-auto max-w-5xl animate-pulse space-y-6">
          <div className="h-5 w-32 rounded bg-[#E7E0D2]" />
          <div className="h-36 rounded-3xl bg-[#E7E0D2]" />
          <div className="h-80 rounded-3xl bg-[#FFFDF8]" />
        </div>
      </main>
    );
  }

  const initials =
    customer.name
      ?.trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part[0])
      .join("")
      .toUpperCase() || "A";

  return (
    <main className="min-h-screen bg-[#F8F2E5] px-4 py-8 text-charcoal sm:px-6 sm:py-12 overflow-hidden">
      <div className="mx-auto max-w-5xl">
        <Link to="/" className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-green transition hover:gap-3"  >
          <ArrowLeft size={17} aria-hidden="true" />
          Back to home
        </Link>

        <section className="relative overflow-hidden rounded-3xl bg-green p-6 text-soft-white sm:p-9">
          <div className="pointer-events-none absolute -right-12 -top-16 h-48 w-48 rounded-full border-[28px] border-white/5" aria-hidden="true"  />

          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-yellow"> Your Alte account </p>

          <h1 className="max-w-xl font-display text-3xl leading-tight sm:text-5xl"> Good to see you again. </h1>

          <p className="mt-3 max-w-lg text-sm leading-6 text-white/75 sm:text-base"> Your details, your orders, all in one place. </p>

          <div className="mt-7 flex items-center gap-4 border-t border-white/15 pt-6">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-yellow font-serif text-xl font-bold text-green">
              {initials}
            </div>

            <div className="min-w-0">
              <p className="truncate font-semibold">{customer.name}</p>
              <p className="truncate text-sm text-white/70">
                {customer.email}
              </p>
            </div>
          </div>
        </section>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.4fr_0.8fr]">
          <section className="rounded-3xl border border-[#E9E2D6] bg-soft-white p-5 sm:p-8">
            <div className="mb-7 flex items-start gap-3">
              <div className="rounded-xl bg-green/10 p-3 text-green">
                <CircleUserRound size={23} aria-hidden="true" />
              </div>

              <div>
                <h2 className="font-display text-2xl"> Personal details</h2>
                <p className="mt-1 text-sm leading-6 text-[#77766D]">  Keep your contact information up to date. </p>
              </div>
            </div>

            {error && (
              <div role="alert" className="mb-5 flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-800" >
                <X size={18} className="mt-0.5 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {success && (
              <div role="status" className="mb-5 flex items-start gap-2 rounded-xl border border-green-200 bg-green-50 p-3 text-sm text-green-800" >
                <CheckCircle2
                  size={18}
                  className="mt-0.5 shrink-0"
                />
                <span>{success}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name"  className="mb-2 block text-sm font-semibold" > Full name </label>
                <input id="name" name="name" type="text" autoComplete="name" value={form.name} onChange={handleChange} className={inputClass} placeholder="Enter your full name" maxLength={100}  required  disabled={saving}/>
              </div>

              <div>
                <label  htmlFor="email" className="mb-2 block text-sm font-semibold">  Email address </label>

                <div className="relative">
                  <Mail size={18}  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#77766D]"  aria-hidden="true" />
                  <input id="email" type="email" value={customer.email} className={`${inputClass} pl-11`} disabled  readOnly  />
                </div>

                <p className="mt-2 text-xs text-[#77766D]"> Email changes aren't available yet.</p>
              </div>

              <div>
                <label    htmlFor="phone" className="mb-2 block text-sm font-semibold"  >  Phone number </label>

                <div className="relative">
                  <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#77766D]" aria-hidden="true" />
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    value={form.phone}
                    onChange={handleChange}
                    className={`${inputClass} pl-11`}
                    placeholder="Enter your phone number"
                    maxLength={20}
                    required
                    disabled={saving}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={saving}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#245C3A] px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-[#19472B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#245C3A] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
              >
                {saving ? (
                  <>
                    <LoaderCircle
                      size={18}
                      className="animate-spin"
                    />
                    Saving changes...
                  </>
                ) : (
                  <>
                    <Save size={18} aria-hidden="true" />
                    Save changes
                  </>
                )}
              </button>
            </form>
          </section>

          <aside className="space-y-5">
            <section className="rounded-3xl border border-[#E9E2D6] bg-soft-white p-5 sm:p-6">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#E6B84A]/25 text-[#245C3A]">
                <ClipboardList size={22} aria-hidden="true" />
              </div>

              <h2 className="font-display text-xl">Your orders</h2>

              <p className="mt-2 text-sm leading-6 text-[#77766D]"> Revisit your orders and open your receipts whenever you need them.</p>

              <Link to="/orderhistory" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-green hover:gap-3"  >
                View order history
                <ArrowRight size={17} aria-hidden="true" />
              </Link>
            </section>

            <section className="rounded-3xl border border-yellow bg-soft-white p-5 sm:p-6">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-green/10 text-green">
                <Utensils size={22} aria-hidden="true" />
              </div>

              <h2 className="font-display text-xl"> Hungry for something?</h2>

              <p className="mt-2 text-sm leading-6 text-[#77766D]">  Find your next favourite meal on the Alte menu. </p>

              <Link to="/menu" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-green hover:gap-3" >
                Explore the menu
                <ArrowRight size={17} aria-hidden="true" />
              </Link>
            </section>

            <button   type="button"  onClick={handleLogout} disabled={signingOut} className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 bg-transparent px-5 py-3.5 text-sm font-semibold text-red-700 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60">
              {signingOut ? (
                <LoaderCircle size={18} className="animate-spin" />
              ) : (
                <LogOut size={18} aria-hidden="true" />
              )}
              {signingOut ? "Signing out..." : "Sign out"}
            </button>
          </aside>
        </div>

        <footer className="py-8 text-center text-xs text-[#77766D]">    Made for good food and good moments. </footer>
      </div>
    </main>
  );
}
