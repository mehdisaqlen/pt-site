export function gaEvent(
  name: string,
  params?: Record<string, string | number | boolean | null | undefined>
) {
  if (
    typeof window === "undefined" ||
    typeof (window as any).gtag !== "function"
  )
    return;
  (window as any).gtag("event", name, params || {});
}
