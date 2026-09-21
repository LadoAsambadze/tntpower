import { notFound } from "next/navigation";

/** Any unknown path under a locale renders the localised `not-found.tsx` inside the root layout. */
export default function CatchAll() {
  notFound();
}
