/** საკონტაქტო ფორმის ტიპები — საერთო სერვერისა და კლიენტისთვის */
export type ContactField = "name" | "phone" | "service" | "address" | "message";

export interface ContactFormState {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Partial<Record<ContactField, string>>;
}

export const initialContactState: ContactFormState = { status: "idle" };
