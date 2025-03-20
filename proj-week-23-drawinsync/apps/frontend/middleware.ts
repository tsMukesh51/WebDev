import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";

const secret = process.env.NEXTAUTH_SECRET;

export async function middleware(req: NextRequest) { }
