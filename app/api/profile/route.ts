import { NextResponse } from "next/server";
import { normaliseAlias, isValidAlias, requireUser } from "@/lib/ballot";
import { sql } from "@/lib/db";

export async function POST(request: Request) {
  const user = await requireUser();
  if (!user) return NextResponse.json({ error: "Sign in to set a fan alias." }, { status: 401 });

  const body = await request.json().catch(() => null) as { alias?: unknown } | null;
  const alias = typeof body?.alias === "string" ? normaliseAlias(body.alias) : "";

  if (!isValidAlias(alias)) {
    return NextResponse.json({ error: "Use 3–24 letters, numbers, spaces, hyphens or underscores." }, { status: 422 });
  }

  try {
    const rows = await sql`
      INSERT INTO profiles (user_id, alias)
      VALUES (${user.id}, ${alias})
      ON CONFLICT (user_id) DO NOTHING
      RETURNING alias
    `;

    if (!rows[0]) {
      const existing = await sql`SELECT alias FROM profiles WHERE user_id = ${user.id}`;
      return NextResponse.json({ alias: existing[0]?.alias, existing: true });
    }

    return NextResponse.json({ alias: rows[0].alias, existing: false }, { status: 201 });
  } catch (error) {
    if (isUniqueViolation(error)) {
      return NextResponse.json({ error: "That alias is already on the ballot." }, { status: 409 });
    }
    return NextResponse.json({ error: "Could not save your alias. Try again." }, { status: 500 });
  }
}

function isUniqueViolation(error: unknown) {
  return typeof error === "object" && error !== null && "code" in error && error.code === "23505";
}
