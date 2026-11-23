import { deliverBookingEmails } from "@/lib/booking-email";

export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret || request.headers.get("authorization") !== `Bearer ${secret}`) {
    return new Response(null, { status: 401 });
  }
  return Response.json(await deliverBookingEmails(), { headers: { "Cache-Control": "no-store" } });
}
