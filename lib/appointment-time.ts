export const appointmentZone = "Europe/Stockholm";
export const slotMinutes = 30;

export function appointmentLabel(start: Date, end: Date, zone = appointmentZone) {
  return new Intl.DateTimeFormat("sv-SE", {
    dateStyle: "long", timeStyle: "short", timeZone: zone,
  }).formatRange(start, end);
}

// A local time can represent zero or two instants during a clock change.
export function stockholmStart(local: string) {
  if (!/^\d{4}-\d{2}-\d{2}T\d{2}:(00|30)$/.test(local)) return null;
  const formatter = new Intl.DateTimeFormat("sv-SE", {
    year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", timeZone: appointmentZone,
  });
  const matches = ["+01:00", "+02:00"].map(offset => new Date(local + offset))
    .filter(date => Number.isFinite(date.getTime()) && formatter.format(date).replace(" ", "T") === local);
  return matches.length === 1 ? matches[0] : null;
}
