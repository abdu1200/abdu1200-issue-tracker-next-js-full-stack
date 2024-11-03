import authOptions from "@/app/auth/authOptions";
import NextAuth from "next-auth";

//NextAuth is a function

const handler = NextAuth(authOptions); //authOptions is an obj for initialzing nextauth

export { handler as GET, handler as POST };

//this page is configured to use NextAuth.js with Google provider and a Prisma adapter

//console.cloud.google.com
//NextAuth.js
//configure with google provider - allow people to login with their google account
//consent screen - the page the user sees when first tries to login/signup(like google will say 'such app wants to access your info)
//scopes are permissions
//in OAuth client, the client id represents our application
//we configure prisma adapter for when a user login to our app, we want nextauth to store the info in our db
//the models for storing users and their account
//we create migration to sync our db with our models
//when we use an adapter, nextauth changes the session strategy from se to db strategy
//but db strategy doesn't work with oAuth providers like google
