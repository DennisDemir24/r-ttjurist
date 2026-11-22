import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function AccountPage() {
  const { data } = await auth.getSession();
  if (!data?.user) redirect("/logga-in");
  redirect(data.user.id === process.env.ADMIN_USER_ID ? "/admin" : "/min-profil");
}
