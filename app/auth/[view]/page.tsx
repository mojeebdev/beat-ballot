import { notFound } from "next/navigation";
import { AuthPage } from "./auth-page";

export const metadata = { robots: { index: false, follow: false } };

const views = new Set(["sign-in", "sign-up", "forgot-password"]);

export default async function AuthRoute({ params, searchParams }: { params: Promise<{ view: string }>; searchParams: Promise<{ returnTo?: string }> }) {
  const [{ view }, query] = await Promise.all([params, searchParams]);
  if (!views.has(view)) notFound();
  const returnTo = query.returnTo?.startsWith("/") ? query.returnTo : "/";
  return <AuthPage view={view} returnTo={returnTo} />;
}
