/** კლასების გაერთიანება — falsy მნიშვნელობები იგნორირდება */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}
