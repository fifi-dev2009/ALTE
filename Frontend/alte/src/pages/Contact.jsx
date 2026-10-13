
import { useState } from "react";
import { Link } from "react-router-dom";
import {ArrowLeft, ArrowRight, Clock3, Mail, MessageCircle, Send, Utensils,} from "lucide-react";

const BUSINESS_EMAIL = "atcafricakoladaisiuniversity@gmail.com";

const initialForm = {
  name: "",
  email: "",
  topic: "Order enquiry",
  orderReference: "",
  message: "",
};

function Contact() {
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");

  const emailIsConfigured = BUSINESS_EMAIL !== "YOUR_BUSINESS_EMAIL";

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));

    if (error) setError("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");

    if (!emailIsConfigured) {
      setError(
        "Alte's business email has not been configured yet. Please add the  email address before using this form."
      );
      return;
    }

    const subject = `[Alte] ${form.topic}`;

    const body = [
      `Name: ${form.name.trim()}`,
      `Email: ${form.email.trim()}`,
      `Topic: ${form.topic}`,
      form.orderReference.trim()
        ? `Order reference: ${form.orderReference.trim()}`
        : "",
      "",
      "Message:",
      form.message.trim(),
    ]
      .filter((line) => line !== "")
      .join("\n");

    const mailtoUrl =
      `mailto:${BUSINESS_EMAIL}` +
      `?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoUrl;
  };

  return (
    <main className="min-h-screen overflow-hidden bg-cream text-charcoal">
      {/* HERO */}
      <section className="px-4 pb-10 pt-8 sm:px-6 sm:pb-14 sm:pt-12 lg:px-10">
        <div className="relative mx-auto grid max-w-[1440px] overflow-hidden rounded-[2rem] bg-green/98 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="relative z-10 flex flex-col justify-center px-6 py-12 sm:px-10 sm:py-16 lg:px-16 lg:py-20">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.22em] text-yellow sm:text-sm"> We're all ears </p>

            <h1 className="max-w-xl font-display text-4xl font-bold leading-[1.12] tracking-tight text-soft-white sm:text-5xl md:text-6xl">
              Let's talk.
              <span className="mt-1 block text-yellow">
                We're listening.
              </span>
            </h1>

            <p className="mt-6 max-w-lg text-sm leading-7 text-white/80 sm:text-base sm:leading-8">
              Got a question about an order, something on our menu, or just  want to say hello? Send us an email. We'd love to hear from you. </p>

            <a
              href="#contact-form"
              className="mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-[#E6B84A] px-6 py-3.5 text-sm font-semibold text-[#20251F] transition hover:bg-[#F0C961] focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#245C3A]"
            >
              Send us a message
              <ArrowRight size={17} aria-hidden="true"  />
            </a>

            <div aria-hidden="true" className="absolute -bottom-20 -left-14 h-48 w-48 rounded-full border-[26px] border-white/5 sm:h-60 sm:w-60" />
          </div>

          <div className="relative min-h-[260px] sm:min-h-[360px] lg:min-h-full">
            <img
              src="/images/interior2.jpg"
              className="absolute inset-0 h-full w-full object-cover"
            />

            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-[#163B25]/70 via-[#163B25]/10 to-transparent lg:bg-gradient-to-r lg:from-[#245C3A]/30 lg:to-transparent"
            />

            <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/25 bg-white/15 p-5 text-white shadow-lg backdrop-blur-md sm:bottom-8 sm:left-8 sm:right-8">
              <p className="font-display text-2xl sm:text-3xl">
                Every good conversation starts somewhere.
              </p>
              <p className="mt-2 text-sm leading-6 text-white/80">
                Yours can start right here.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT DETAILS + FORM */}
      <section
        id="contact-form"
        className="mx-auto grid max-w-[1240px] items-start gap-8 px-4 py-10 sm:px-6 sm:py-14 lg:grid-cols-[0.75fr_1.25fr] lg:gap-12 lg:px-10 lg:py-20"
      >
        {/* LEFT: GUIDANCE */}
        <aside className="lg:sticky lg:top-8">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#4F7D50] sm:text-sm">
            Get in touch
          </p>

          <h2 className="max-w-md font-display text-3xl font-bold leading-tight sm:text-4xl">
            How can we make your day a little easier?
          </h2>

          <p className="mt-5 max-w-md text-sm leading-7 text-[#62675F] sm:text-base sm:leading-8">
            Tell us what's on your mind. A little detail helps us understand your question and makes it easier to respond.
          </p>

          <div className="mt-8 space-y-4">
            <div className="flex gap-4 rounded-2xl border border-[#E9E4D9] bg-[#FFFDF8] p-5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#EAF0E5] text-[#245C3A]">
                <Mail size={20} aria-hidden="true" />
              </div>

              <div>
                <h3 className="font-semibold">Email us</h3>
                <p className="mt-1 text-sm leading-6 text-[#62675F]">  For order questions, menu enquiries, and everything else.</p>

                <p className="mt-2 break-all text-sm font-medium text-[#245C3A]">
                  {emailIsConfigured
                    ? BUSINESS_EMAIL
                    : "Business email coming soon"}
                </p>
              </div>
            </div>

            <div className="flex gap-4 rounded-2xl border border-[#E9E4D9] bg-[#FFFDF8] p-5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#F8EBC8] text-[#785D19]">
                <MessageCircle size={20} aria-hidden="true" />
              </div>

              <div>
                <h3 className="font-semibold">Questions about an order?</h3>
                <p className="mt-1 text-sm leading-6 text-[#62675F]">
                  Include your order reference, if you have one, so your message has the context we need.
                </p>
              </div>
            </div>

            <div className="flex gap-4 rounded-2xl border border-[#E9E4D9] bg-[#FFFDF8] p-5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#EAF0E5] text-[#245C3A]">
                <Clock3 size={20} aria-hidden="true" />
              </div>

              <div>
                <h3 className="font-semibold">A quick note</h3>
                <p className="mt-1 text-sm leading-6 text-[#62675F]">
                  We'll respond as soon as we can. We haven't listed a response time because one hasn't been confirmed yet.
                </p>
              </div>
            </div>
          </div>

          <Link  to="/menu" className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-[#245C3A] transition hover:gap-3" >
            <ArrowLeft size={17} aria-hidden="true" />
            Back to the menu
          </Link>
        </aside>

        {/* RIGHT: EMAIL FORM */}
        <div className="rounded-[1.75rem] border border-[#E9E4D9] bg-[#FFFDF8] p-5 shadow-sm sm:p-8 lg:p-10">
          <div className="mb-8">
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#4F7D50]">
              Drop us a line
            </p>

            <h2 className="font-display text-2xl font-bold sm:text-3xl">
              Write us a little note.
            </h2>

            <p className="mt-3 text-sm leading-6 text-[#62675F]">
              Fill in the details below. Your email app will open with your
              message ready for you to review and send.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="contact-name"
                  className="mb-2 block text-sm font-semibold"
                >
                  Your name <span className="text-[#B14D3B]">*</span>
                </label>

                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  value={form.name}
                  onChange={handleChange}
                  minLength={2}
                  maxLength={100}
                  required
                  placeholder="What should we call you?"
                  className="w-full rounded-xl border border-[#DDD7CA] bg-white px-4 py-3.5 text-sm outline-none transition placeholder:text-[#999A91] focus:border-[#4F7D50] focus:ring-2 focus:ring-[#4F7D50]/15"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-email"
                  className="mb-2 block text-sm font-semibold"
                >
                  Email address <span className="text-[#B14D3B]">*</span>
                </label>

                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={handleChange}
                  maxLength={254}
                  required
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-[#DDD7CA] bg-white px-4 py-3.5 text-sm outline-none transition placeholder:text-[#999A91] focus:border-[#4F7D50] focus:ring-2 focus:ring-[#4F7D50]/15"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="contact-topic"
                className="mb-2 block text-sm font-semibold"
              >
                What can we help with?
              </label>

              <select
                id="contact-topic"
                name="topic"
                value={form.topic}
                onChange={handleChange}
                className="w-full rounded-xl border border-[#DDD7CA] bg-white px-4 py-3.5 text-sm outline-none transition focus:border-[#4F7D50] focus:ring-2 focus:ring-[#4F7D50]/15"
              >
                <option>Order enquiry</option>
                <option>Menu question</option>
                <option>Feedback</option>
                <option>General enquiry</option>
              </select>
            </div>

            {form.topic === "Order enquiry" && (
              <div>
                <label
                  htmlFor="contact-order-reference"
                  className="mb-2 block text-sm font-semibold"
                >
                  Order reference{" "}
                  <span className="font-normal text-[#777B72]">
                    (optional)
                  </span>
                </label>

                <input
                  id="contact-order-reference"
                  name="orderReference"
                  type="text"
                  value={form.orderReference}
                  onChange={handleChange}
                  maxLength={100}
                  placeholder="Enter your order reference, if available"
                  className="w-full rounded-xl border border-[#DDD7CA] bg-white px-4 py-3.5 text-sm outline-none transition placeholder:text-[#999A91] focus:border-[#4F7D50] focus:ring-2 focus:ring-[#4F7D50]/15"
                />
              </div>
            )}

            <div>
              <label
                htmlFor="contact-message"
                className="mb-2 block text-sm font-semibold"
              >
                Your message <span className="text-[#B14D3B]">*</span>
              </label>

              <textarea
                id="contact-message"
                name="message"
                value={form.message}
                onChange={handleChange}
                minLength={10}
                maxLength={3000}
                rows={5}
                required
                placeholder="Tell us a little more..."
                className="w-full resize-y rounded-xl border border-[#DDD7CA] bg-white px-4 py-3.5 text-sm leading-6 outline-none transition placeholder:text-[#999A91] focus:border-[#4F7D50] focus:ring-2 focus:ring-[#4F7D50]/15"
              />

              <p className="mt-2 text-right text-xs text-[#777B72]">
                {form.message.length}/3000 characters
              </p>
            </div>

            {error && (
              <p
                role="alert"
                className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm leading-6 text-red-800"
              >
                {error}
              </p>
            )}

            <button
              type="submit"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#245C3A] px-6 py-4 text-sm font-semibold text-white transition hover:bg-[#19472C] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#245C3A] focus-visible:ring-offset-2 sm:w-auto sm:min-w-[200px]"
            >
              Prepare email
              <Send size={17} aria-hidden="true" />
            </button>

            <p className="text-xs leading-5 text-[#777B72]">
              Your email app must be configured to send email. Nothing is  sent automatically by this form.
            </p>
          </form>
        </div>
      </section>

      {/* CLOSING CTA */}
      <section className="px-4 pb-16 sm:px-6 lg:px-10">
        <div className="relative mx-auto max-w-[1440px] overflow-hidden rounded-[2rem] bg-fresh-green px-6 py-12 text-center sm:px-12 sm:py-16">
          <div
            aria-hidden="true"
            className="absolute -left-12 -top-16 h-40 w-40 rounded-full border-[22px] border-white/5 sm:h-56 sm:w-56"
          />

          <div className="relative mx-auto max-w-2xl">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-[#E6B84A]">
              <Utensils size={23} aria-hidden="true" />
            </div>

            <h2 className="mt-5 font-display text-3xl font-bold text-[#FFFDF8] sm:text-4xl">
              While you're here...
            </h2>

            <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-white/75 sm:text-base">
              Your next favourite meal might be waiting on the menu.Go on, have a look.
            </p>

            <Link
              to="/menu"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#E6B84A] px-6 py-3.5 text-sm font-semibold text-[#20251F] transition hover:bg-[#F0C961] focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#245C3A]"
            >
              Explore the menu
              <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Contact;
