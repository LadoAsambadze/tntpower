"use server";

import { services } from "@/data/services";
import type { ContactFormState } from "@/lib/contact";

// +995 555 12 34 56, 555123456, (555) 12-34-56 და მსგავსი ფორმატები
const PHONE_RE = /^\+?[\d\s()-]{9,20}$/;

function field(formData: FormData, name: string): string {
  const value = formData.get(name);
  return typeof value === "string" ? value.trim() : "";
}

/**
 * საკონტაქტო ფორმის სერვერ-აქშენი.
 *
 * ამჟამად მხოლოდ ვალიდაციას აკეთებს და განაცხადს სერვერის ლოგში წერს.
 * TODO(backend): აქ დაემატება ელფოსტის გაგზავნა (Resend/Nodemailer),
 * Telegram/WhatsApp შეტყობინება ან ბაზაში შენახვა.
 */
export async function submitContact(
  _prev: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  // Honeypot — ბოტები ავსებენ დამალულ ველსაც
  if (field(formData, "company")) {
    return {
      status: "success",
      message: "მადლობა! თქვენი განაცხადი მიღებულია.",
    };
  }

  const name = field(formData, "name");
  const phone = field(formData, "phone");
  const service = field(formData, "service");
  const address = field(formData, "address");
  const message = field(formData, "message");

  const errors: NonNullable<ContactFormState["errors"]> = {};

  if (name.length < 2) errors.name = "მიუთითეთ თქვენი სახელი.";
  if (!PHONE_RE.test(phone)) errors.phone = "მიუთითეთ სწორი ტელეფონის ნომერი.";
  if (service && !services.some((s) => s.slug === service)) {
    errors.service = "აირჩიეთ სერვისი სიიდან.";
  }
  if (message.length < 10) {
    errors.message = "მოკლედ აღწერეთ სამუშაო (მინიმუმ 10 სიმბოლო).";
  }

  if (Object.keys(errors).length > 0) {
    return {
      status: "error",
      message: "გთხოვთ, შეასწოროთ მონიშნული ველები.",
      errors,
    };
  }

  const serviceTitle = services.find((s) => s.slug === service)?.title ?? "—";

  // JSON-სტრიქონად — რომ ლოგ-ფაილშიც სრულად ჩაიწეროს
  console.info(
    "[contact] ახალი განაცხადი " +
      JSON.stringify({
        name,
        phone,
        service: serviceTitle,
        address: address || "—",
        message,
        receivedAt: new Date().toISOString(),
      }),
  );

  return {
    status: "success",
    message: "მადლობა! თქვენი განაცხადი მიღებულია — მალე დაგიკავშირდებით.",
  };
}
