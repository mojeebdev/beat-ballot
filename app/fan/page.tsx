import { auth } from "@/lib/auth";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function FanPage() {
  const { data } = await auth.getSession();
  return <main className="fan-page"><p className="section-label">FAN PASSPORT</p><h1>{data?.user?.name ?? "Fan"}</h1><Link href="/">RETURN TO THE BALLOT ↗</Link></main>;
}
