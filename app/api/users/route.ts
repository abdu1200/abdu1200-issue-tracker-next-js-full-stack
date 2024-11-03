import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function GET(request: NextRequest) {
  //if we remove the request parameter, next.js will cashe the output of the endpoint

  const users = await prisma.user.findMany({ orderBy: { name: "asc" } });
  return NextResponse.json(users); //returns an array of users
}
