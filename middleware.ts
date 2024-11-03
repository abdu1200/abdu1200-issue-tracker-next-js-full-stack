export { default } from "next-auth/middleware"; //this one by itself requires authentication for all the pages by itself

export const config = {
  matcher: ["/issues/new"],
};

//a middleware is a function that get executed on each request(on each route request,...)
//the functionality of redirecting the user to the login page is already implemented in nextauth(next-auth/middleware)
//a middleware is used by authentication
