"use client";

import { useActionState } from "react";
import { CheckCircle2, AlertCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { submitContact } from "@/app/contact/actions";
import { initialContactState, type ContactField } from "@/lib/contact";
import { cn } from "@/lib/cn";

interface ServiceOption {
  slug: string;
  title: string;
}

interface ContactFormProps {
  services: ServiceOption[];
  /** წინასწარ არჩეული სერვისი (სერვისის გვერდიდან გადმოსვლისას) */
  defaultService?: string;
}

const inputBase =
  "w-full rounded-md border bg-white px-4 py-3 text-ink-950 placeholder:text-ink-400 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-ink-950";

export function ContactForm({ services, defaultService }: ContactFormProps) {
  const [state, formAction, pending] = useActionState(submitContact, initialContactState);

  const errorFor = (name: ContactField) => state.errors?.[name];
  const inputClass = (name: ContactField) =>
    cn(inputBase, errorFor(name) ? "border-red-400" : "border-ink-300");

  if (state.status === "success") {
    return (
      <div
        role="status"
        className="flex flex-col items-center rounded-2xl border border-green-200 bg-green-50 p-8 text-center"
      >
        <CheckCircle2 className="size-12 text-green-600" aria-hidden="true" />
        <h3 className="mt-4 text-xl font-bold text-ink-900">განაცხადი გაგზავნილია</h3>
        <p className="mt-2 text-ink-600">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={formAction} noValidate className="space-y-5">
      {state.status === "error" && state.message && (
        <p
          role="alert"
          className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800"
        >
          <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          {state.message}
        </p>
      )}

      {/* Honeypot — მომხმარებლისთვის უხილავი */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="company">კომპანია</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="სახელი *" htmlFor="name" error={errorFor("name")}>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="თქვენი სახელი"
            className={inputClass("name")}
            aria-invalid={Boolean(errorFor("name"))}
          />
        </Field>
        <Field label="ტელეფონი *" htmlFor="phone" error={errorFor("phone")}>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            placeholder="+995 5__ __ __ __"
            className={inputClass("phone")}
            aria-invalid={Boolean(errorFor("phone"))}
          />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="სერვისი" htmlFor="service" error={errorFor("service")}>
          <select
            id="service"
            name="service"
            defaultValue={defaultService ?? ""}
            className={inputClass("service")}
          >
            <option value="">— აირჩიეთ —</option>
            {services.map((s) => (
              <option key={s.slug} value={s.slug}>
                {s.title}
              </option>
            ))}
          </select>
        </Field>
        <Field label="ობიექტის მისამართი" htmlFor="address" error={errorFor("address")}>
          <input
            id="address"
            name="address"
            type="text"
            autoComplete="street-address"
            placeholder="ბათუმი, ქუჩა / უბანი"
            className={inputClass("address")}
          />
        </Field>
      </div>

      <Field label="აღწერეთ სამუშაო *" htmlFor="message" error={errorFor("message")}>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="მაგ.: 60 მ² ბინა, სრული რემონტი, ელექტროობა და სანტექნიკა შესაცვლელია…"
          className={cn(inputClass("message"), "resize-y")}
          aria-invalid={Boolean(errorFor("message"))}
        />
      </Field>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-ink-500">
          გაგზავნით თანხმობას აცხადებთ, რომ დაგიკავშირდეთ მითითებულ ნომერზე.
        </p>
        <Button type="submit" size="lg" disabled={pending} className="sm:shrink-0">
          <Send className="size-4" aria-hidden="true" />
          {pending ? "იგზავნება…" : "განაცხადის გაგზავნა"}
        </Button>
      </div>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-semibold text-ink-800">
        {label}
      </label>
      {children}
      {error && (
        <p className="mt-1.5 text-xs text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
