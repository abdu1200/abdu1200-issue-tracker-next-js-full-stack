//this is the update api endpoint

import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { patchIssueSchema } from "../../../validationschemas";
import delay from "delay";
import authOptions from "@/app/auth/authOptions";
import { getServerSession } from "next-auth";

export async function PATCH(
  request: NextRequest,    //this is the new data
  { params }: { params: { id: string } }    //this is the issue's id(the one that is gonna be updated)
) {
  //giving the type inline

  // const session = await getServerSession(authOptions);
  // if (!session)
  //   //this is to secure this api endpoint...401 is unauthorized    //this is to secure on server side
  //   return NextResponse.json({ error: "unauthorized" }, { status: 401 }); //you can try patch request from postman

  const body = await request.json(); //reading the body of the request(the new data)
  const validation = patchIssueSchema.safeParse(body); //validation is an object

  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }



  const { assignedToUserId , title, description, status } = body;   //we are destructuring the body

  if (assignedToUserId) {    
    const user = await prisma.user.findUnique({
      where : {id : assignedToUserId}  //here we are making sure that there is a user(with that id) to be assigned to be assigned to an issue 
    });

    if(!user)
      return NextResponse.json({error: "Invalid user or there is no user with that id"}, {status : 400})
  }



  const issue = await prisma.issue.findUnique({
    //to get or fetch the issue first
    where: { id: parseInt(params.id) },    //here we are making sure that there is an issue(with that id) for a user to be assigned to
  });

  if (!issue)
    return NextResponse.json({ error: "Invalid issue or there is no issue with that id" }, { status: 400 });

  
  const updateIssue = await prisma.issue.update({
    //to update the specific issue
    where: { id: issue.id },
    data: {
      title,
      description,
      status,
      assignedToUserId
      
    }, //passing the actual data to be updated
  });

  return NextResponse.json(updateIssue, { status: 201 }); //to respond to postman
}











//this is the delete api endpoint

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session)
    //this is to secure this api endpoint...401 is unauthorized
    return NextResponse.json({}, { status: 401 });

  await delay(2000); //for the api to return after some delay when delete request
  const issue = await prisma.issue.findUnique({
    //to get or fetch the issue first
    where: { id: parseInt(params.id) },
  });

  if (!issue)
    return NextResponse.json({ error: "Invalid issue" }, { status: 400 });

  await prisma.issue.delete({
    where: { id: issue.id },
  });

  return NextResponse.json({});
}






//if there is a user id in the body of the request, make sure that it is a valid user
