import { auth } from "@/lib/auth";

export const { GET, POST, PUT, PATCH, DELETE } = auth.handler();
