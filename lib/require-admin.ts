import "server-only";
import { forbidden, redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export async function requireAdmin() {
  const { data, error } = await auth.getSession();
  if (error) throw new Error("Kunde inte kontrollera inloggningen.");
  if (!data?.user) redirect("/logga-in");
  if (data.user.id !== process.env.ADMIN_USER_ID || !process.env.ADMIN_USER_ID) forbidden();
  return data.user;
}
