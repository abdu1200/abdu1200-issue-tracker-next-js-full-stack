//this is the create api endpoint for registering a user

import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { RegisterNewSchema } from "../../validationschemas";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";
import { hash } from "bcrypt";

export async function POST(request: NextRequest) {
  const body = await request.json(); //reading the body of the request(the data)
  const validation = RegisterNewSchema.safeParse(body); //validation is an object

  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  const passwordHashed = await hash(body.password, 12);

  const newUser = await prisma.user.create({
    data: { email: body.email, password: passwordHashed }, //passing the actual data to be created
  });

  return NextResponse.json(newUser, { status: 201 }); //to respond to postman
}
