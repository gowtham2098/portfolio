import { useState, type FormEvent } from "react";
import { Github, Linkedin, Mail, MapPin, Phone, Send } from "lucide-react";
import type { ContactInfo } from "@/types/resume";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

interface ContactProps {
  contact: ContactInfo;
  name: string;
}

export function Contact({ contact, name }: ContactProps) {
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  const contactItems = [
    contact.email && {
      icon: Mail,
      label: "Email",
      value: contact.email,
      href: `mailto:${contact.email}`,
    },
    contact.phone && {
      icon: Phone,
      label: "Phone",
      value: contact.phone,
      href: `tel:${contact.phone.replace(/\s+/g, "")}`,
    },
    contact.location && {
      icon: MapPin,
      label: "Location",
      value: contact.location,
      href: undefined,
    },
    contact.linkedin && {
      icon: Linkedin,
      label: "LinkedIn",
      value: prettifyUrl(contact.linkedin),
      href: contact.linkedin,
    },
    contact.github && {
      icon: Github,
      label: "GitHub",
      value: prettifyUrl(contact.github),
      href: contact.github,
    },
  ].filter(Boolean) as {
    icon: typeof Mail;
    label: string;
    value: string;
    href?: string;
  }[];

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const nameValue = String(data.get("name") || "").trim();
    const emailValue = String(data.get("email") || "").trim();
    const messageValue = String(data.get("message") || "").trim();

    if (!nameValue || !emailValue || !messageValue) {
      setStatus("error");
      return;
    }

    setStatus("submitting");
    const subject = `Portfolio enquiry from ${nameValue}`;
    const body = `Name: ${nameValue}\nEmail: ${emailValue}\n\n${messageValue}`;
    const mailtoLink = `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoLink;
    setStatus("success");
    form.reset();
  };

  return (
    <section id="contact" className="section-padding">
      <div className="section-container">
        <Reveal>
          <SectionHeading
            eyebrow="07 / Contact"
            title={`Let's work together`}
            description="Have a role or project in mind? Send a message and I'll get back to you."
          />
        </Reveal>

        <div className="grid gap-8 lg:grid-cols-2">
          <Reveal delay={100}>
            <div className="card-base h-full p-6 sm:p-8">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                Get in touch
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                Reach out through any of the channels below. I'm open to
                frontend and React.js roles.
              </p>

              <ul className="mt-6 space-y-3">
                {contactItems.map(({ icon: Icon, label, value, href }) => (
                  <li key={label}>
                    {href ? (
                      <a
                        href={href}
                        target={href.startsWith("http") ? "_blank" : undefined}
                        rel={
                          href.startsWith("http")
                            ? "noopener noreferrer"
                            : undefined
                        }
                        className="group flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800"
                      >
                        <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-600 transition-colors group-hover:text-brand-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:group-hover:text-brand-400">
                          <Icon size={16} aria-hidden="true" />
                        </span>
                        <span className="flex flex-col">
                          <span className="font-mono text-xs text-slate-500 dark:text-slate-400">
                            {label}
                          </span>
                          <span className="text-sm font-medium break-words text-slate-900 dark:text-white">
                            {value}
                          </span>
                        </span>
                      </a>
                    ) : (
                      <div className="flex items-center gap-3 p-2">
                        <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
                          <Icon size={16} aria-hidden="true" />
                        </span>
                        <span className="flex flex-col">
                          <span className="font-mono text-xs text-slate-500 dark:text-slate-400">
                            {label}
                          </span>
                          <span className="text-sm font-medium break-words text-slate-900 dark:text-white">
                            {value}
                          </span>
                        </span>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <form
              className="card-base p-6 sm:p-8"
              onSubmit={handleSubmit}
              noValidate
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Name" htmlFor="name">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-brand-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500"
                    placeholder="Your name"
                  />
                </Field>
                <Field label="Email" htmlFor="email">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-brand-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500"
                    placeholder="you@example.com"
                  />
                </Field>
              </div>
              <Field label="Message" htmlFor="message" className="mt-4">
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  className="w-full resize-y rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-brand-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500"
                  placeholder="Tell me about the role or project..."
                />
              </Field>

              <button
                type="submit"
                disabled={status === "submitting"}
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
              >
                <Send size={16} aria-hidden="true" />
                {status === "submitting"
                  ? "Opening mail client…"
                  : `Send message to ${name.split(" ")[0]}`}
              </button>

              {status === "success" && (
                <p
                  className="mt-3 text-sm text-emerald-600 dark:text-emerald-400"
                  role="status"
                >
                  Your email client should now be open with the message
                  pre-filled.
                </p>
              )}
              {status === "error" && (
                <p
                  className="mt-3 text-sm text-red-600 dark:text-red-400"
                  role="alert"
                >
                  Please fill in all fields before sending.
                </p>
              )}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  htmlFor,
  children,
  className = "",
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label
        htmlFor={htmlFor}
        className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300"
      >
        {label}
      </label>
      {children}
    </div>
  );
}

function prettifyUrl(url: string): string {
  return url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
}
