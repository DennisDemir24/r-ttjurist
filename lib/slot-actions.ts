"use server";

import { revalidatePath } from "next/cache";
import { forbidden } from "next/navigation";
import { getDb } from "./db";
import { providerAccess } from "./provider";
import { stockholmStart, slotMinutes } from "./appointment-time";

export async function addSlot(_previous: string, form: FormData) {
  const access = await providerAccess();
  const profile = await getDb().providerProfile.findFirst({
    where: { published: true, owner: { is: access } }, select: { slug: true },
  });
  if (!profile) forbidden();
  const startsAt = stockholmStart(String(form.get("start") ?? ""));
  if (!startsAt || startsAt.getTime() <= Date.now()) return "Välj en framtida, entydig tid vid hel eller halv timme.";
  const result = await getDb().consultationSlot.createMany({
    data: [{ profileSlug: profile.slug, startsAt, endsAt: new Date(startsAt.getTime() + slotMinutes * 60_000) }],
    skipDuplicates: true,
  });
  revalidatePath("/mina-bokningar");
  return result.count ? "Tiden har lagts till." : "Den tiden finns redan.";
}

export async function withdrawSlot(id: string) {
  await getDb().consultationSlot.deleteMany({
    where: { id, bookedAt: null, profile: { owner: { is: await providerAccess() } } },
  });
  revalidatePath("/mina-bokningar");
}
