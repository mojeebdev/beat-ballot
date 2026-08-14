import { auth } from "@/lib/auth";
import Link from "next/link";
import { EditorialShell } from "@/components/editorial-shell";

export const dynamic = "force-dynamic";
export const metadata = { robots: { index: false, follow: false } };

export default async function FanPage() {
  const { data } = await auth.getSession();
  return <EditorialShell><section className="fan-passport"><p className="section-label">FAN PASSPORT / VERIFIED ACCESS</p><h1>{data?.user?.name ?? "Fan"}</h1><p>Your public alias and points live with the ballot, never your email. Return to the arena to make your current verified pick.</p><Link className="arrow-action" href="/#arena">RETURN TO THE BALLOT <span>↓</span></Link></section></EditorialShell>;
}
