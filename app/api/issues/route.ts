//this is the create issue api endpoint

import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { IssueNewSchema } from "../../validationschemas";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";

export async function POST(request: NextRequest) {
  // const session = await getServerSession(authOptions);
  // if (!session) 
  //   //this is to secure this api endpoint...401 is unauthorized
  //   return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const body = await request.json(); //reading the body of the request(the data)
  const validation = IssueNewSchema.safeParse(body); //validation is an object

  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  const newIssue = await prisma.issue.create({
    data: { title: body.title, description: body.description }, //passing the actual data to be created
  });

  return NextResponse.json(newIssue, { status: 201 }); //to respond to postman
}




//statically rendered routes(rendered at build time) are the one doesn't contain a route parameter and their output is stored in 'full route catch'
//dynamically rendered routes(at run time or request time)
//the page of the route is the one that is being rendered

//data-cashe(to store the result of fetch)..use no cashe or revalidate objects
// full route-cashe(to store the output of static routes)...we can use the dynamic option to make a page dynamic or we can use revalidate option for static page
//router-cashe(client side cashe) - to store the payload of pages in a browser(when the user navigates or visits)
//in client-side cashe, the automatic invalidation period for SRr is 5mins and for DRr is 30sec...meaning it refetchs the content of the page from the server after those mins if we comeback
//we can use 'router.refresh()' in the handle submit to refresh or refetch the page every time new issue is created
//the first two are server cashes(stored in the file system)  and the last one is client cashe(stored in browser memory)
//dynamic page means everytime the page is requested it is refetched or refreshed
//router cashe gets refreshed when reloaded(so we can use router.refresh() for dynamic pages)


//GET issue api endpoint

export async function GET(request: NextRequest) {
  //if we remove the request parameter, next.js will cashe the output of the endpoint

  const issues = await prisma.issue.findMany();
  return NextResponse.json(issues); //returns an array of users
}