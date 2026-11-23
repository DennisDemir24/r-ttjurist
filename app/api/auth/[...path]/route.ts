import { auth } from "@/lib/auth";

export const { GET, POST, PATCH, PUT, DELETE } = auth.handler();
