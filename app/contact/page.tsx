"use client";

import { useRef, useState, useEffect, FormEvent } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { MapPin, Phone, Mail, CheckCircle2 } from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { useLang } from "@/lib/language-context";

type FormState = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  captchaAnswer: string;
  honeypot: string;
};

const INIT: FormState = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
  captchaAnswer: "",
  honeypot: "",
};

export default function ContactPage() {
  return (
    <main className="overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <ContactSection />
      <Footer />
    </main>
  );
}

function HeroSection() {
  const { t } = useLang();

  return (
    <section
      className="relative flex items-end min-h-[68vh] pt-[72px]"
      style={{ backgroundColor: "#140810" }}
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 60% 50%, rgba(75,36,56,0.35) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 section-container pb-16 md:pb-24 w-full">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-[11px] tracking-[0.42em] uppercase mb-5"
          style={{ color: "rgba(168,128,144,0.85)" }}
        >
          {t.contact.heroLabel}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
          className="font-normal text-white leading-none mb-3"
          style={{ fontSize: "clamp(48px, 8vw, 110px)", letterSpacing: "-0.02em" }}
        >
          {t.contact.heroTitle}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="text-sm italic"
          style={{ color: "rgba(255,255,255,0.42)" }}
        >
          {t.contact.heroSub}
        </motion.p>
      </div>
    </section>
  );
}

function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-5%" });
  const { t } = useLang();

  const [form, setForm] = useState<FormState>(INIT);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  // Math captcha
  const [captchaA, setCaptchaA] = useState(0);
  const [captchaB, setCaptchaB] = useState(0);
  useEffect(() => {
    setCaptchaA(Math.floor(Math.random() * 9) + 1);
    setCaptchaB(Math.floor(Math.random() * 9) + 1);
  }, []);

  const validate = (): boolean => {
    const e: Partial<Record<keyof FormState, string>> = {};
    const f = t.contact.fields;

    if (!form.name.trim()) e.name = t.contact.errors.required;
    if (!form.email.trim()) e.email = t.contact.errors.required;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = t.contact.errors.email;
    if (!form.subject.trim()) e.subject = t.contact.errors.required;
    if (!form.message.trim()) e.message = t.contact.errors.required;
    if (!form.captchaAnswer.trim()) e.captchaAnswer = t.contact.errors.required;
    else if (parseInt(form.captchaAnswer) !== captchaA + captchaB)
      e.captchaAnswer = t.contact.errors.captcha;

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormState]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    if (form.honeypot) return; // bot detected

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          subject: form.subject,
          message: form.message,
        }),
      });

      if (res.ok) {
        setStatus("success");
        setForm(INIT);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const fields = t.contact.fields;

  return (
    <section ref={ref} className="py-16 md:py-24 bg-brand-bg">
      <div className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-14 md:gap-8">
          {/* Left — Company info */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-4"
          >
            <p className="section-label mb-4">{t.contact.infoTitle}</p>
            <div className="w-8 h-px bg-secondary/40 mb-8" />

            <div className="space-y-8">
              <div>
                <p className="text-primary/90 font-normal mb-0.5">
                  華資粧業股份有限公司
                </p>
                <p className="text-xs text-primary/48 tracking-[0.15em]">
                  HWA TSU COSMETICS CO., LTD.
                </p>
              </div>

              <div className="flex gap-4">
                <MapPin size={14} className="text-secondary mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                <p className="text-sm text-primary/70 font-normal leading-relaxed">
                  {t.contact.address}
                </p>
              </div>

              <a
                href="tel:+886223613585"
                className="flex gap-4 group"
              >
                <Phone size={14} className="text-secondary mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                <span className="text-sm text-primary/70 group-hover:text-primary transition-colors duration-300">
                  {t.contact.phone}
                </span>
              </a>

              <a
                href={`mailto:${t.contact.email}`}
                className="flex gap-4 group"
              >
                <Mail size={14} className="text-secondary mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                <span className="text-sm text-primary/70 group-hover:text-primary transition-colors duration-300">
                  {t.contact.email}
                </span>
              </a>
            </div>

            {/* Decorative */}
            <div className="mt-14 pt-10 border-t border-primary/10">
              <p className="text-[10px] tracking-[0.38em] uppercase text-primary/30 mb-3">
                WE SPARK BEAUTY
              </p>
              <p className="text-xs text-primary/45 font-normal italic leading-relaxed">
                Beauty is not something to wait for.<br />
                It is something to ignite.
              </p>
            </div>
          </motion.div>

          {/* Right — Form */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-8"
          >
            <p className="section-label mb-4">{t.contact.formTitle}</p>
            <div className="w-8 h-px bg-secondary/40 mb-8" />

            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="flex flex-col items-center justify-center py-20 text-center"
                >
                  <CheckCircle2 size={40} className="text-secondary mb-5" strokeWidth={1} />
                  <h3 className="text-2xl font-normal text-primary mb-3">
                    {t.contact.success.title}
                  </h3>
                  <p className="text-sm text-primary/60 font-normal">
                    {t.contact.success.desc}
                  </p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="mt-8 text-[11px] tracking-[0.3em] uppercase border-b pb-0.5 border-secondary/40 text-secondary/70 hover:text-secondary hover:border-secondary transition-all duration-300"
                  >
                    {fields.submit === "送出訊息" ? "再次傳送" : "Send Again"}
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  noValidate
                  className="space-y-6"
                >
                  {/* Honeypot — hidden from users, visible to bots */}
                  <div className="absolute opacity-0 pointer-events-none" aria-hidden="true" tabIndex={-1}>
                    <input
                      name="honeypot"
                      value={form.honeypot}
                      onChange={handleChange}
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>

                  {/* Name + Email */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Field
                      label={fields.name}
                      required
                      error={errors.name}
                    >
                      <input
                        name="name"
                        type="text"
                        placeholder={fields.namePh}
                        value={form.name}
                        onChange={handleChange}
                        className={inputCls(!!errors.name)}
                      />
                    </Field>
                    <Field
                      label={fields.email}
                      required
                      error={errors.email}
                    >
                      <input
                        name="email"
                        type="email"
                        placeholder={fields.emailPh}
                        value={form.email}
                        onChange={handleChange}
                        className={inputCls(!!errors.email)}
                      />
                    </Field>
                  </div>

                  {/* Phone + Subject */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Field label={fields.phone} error={errors.phone}>
                      <input
                        name="phone"
                        type="tel"
                        placeholder={fields.phonePh}
                        value={form.phone}
                        onChange={handleChange}
                        className={inputCls(!!errors.phone)}
                      />
                    </Field>
                    <Field label={fields.subject} required error={errors.subject}>
                      <input
                        name="subject"
                        type="text"
                        placeholder={fields.subjectPh}
                        value={form.subject}
                        onChange={handleChange}
                        className={inputCls(!!errors.subject)}
                      />
                    </Field>
                  </div>

                  {/* Message */}
                  <Field label={fields.message} required error={errors.message}>
                    <textarea
                      name="message"
                      rows={5}
                      placeholder={fields.messagePh}
                      value={form.message}
                      onChange={handleChange}
                      className={inputCls(!!errors.message) + " resize-none"}
                    />
                  </Field>

                  {/* Captcha */}
                  <div className="pt-2 pb-1 border-t border-primary/10">
                    <Field
                      label={fields.captchaLabel}
                      required
                      error={errors.captchaAnswer}
                    >
                      <div className="flex items-center gap-4">
                        <span
                          className="text-sm font-normal text-primary/75 bg-brand-cream px-4 py-2.5 border border-primary/15 select-none whitespace-nowrap"
                          style={{ letterSpacing: "0.05em" }}
                        >
                          {captchaA} + {captchaB} = ?
                        </span>
                        <input
                          name="captchaAnswer"
                          type="number"
                          inputMode="numeric"
                          placeholder={fields.captchaAnswer}
                          value={form.captchaAnswer}
                          onChange={handleChange}
                          className={inputCls(!!errors.captchaAnswer) + " w-28"}
                        />
                      </div>
                    </Field>
                  </div>

                  {/* Error banner */}
                  {status === "error" && (
                    <p className="text-xs text-red-500/80 tracking-[0.15em]">
                      {t.contact.errors.server}
                    </p>
                  )}

                  {/* Submit */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className="group relative overflow-hidden px-10 py-3.5 text-[11px] tracking-[0.35em] uppercase font-medium
                                 text-white transition-all duration-500 disabled:opacity-60"
                      style={{ backgroundColor: "#4B2438" }}
                    >
                      <span className="relative z-10">
                        {status === "sending" ? fields.sending : fields.submit}
                      </span>
                      {/* Hover fill */}
                      <span
                        className="absolute inset-0 -translate-x-full group-hover:translate-x-0 transition-transform duration-500"
                        style={{ backgroundColor: "#2d1424" }}
                      />
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  required,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[11px] tracking-[0.28em] uppercase text-primary/55 font-medium">
        {label}
        {required && <span className="text-secondary ml-0.5">*</span>}
      </label>
      {children}
      {error && (
        <span className="text-[11px] tracking-[0.1em] text-red-400/80">{error}</span>
      )}
    </div>
  );
}

function inputCls(hasError: boolean) {
  return [
    "w-full bg-transparent border-b py-2.5 text-sm text-primary font-normal",
    "placeholder:text-primary/32 outline-none",
    "transition-colors duration-300",
    "focus:border-primary/60",
    hasError
      ? "border-red-400/60"
      : "border-primary/20 hover:border-primary/35",
  ].join(" ");
}
