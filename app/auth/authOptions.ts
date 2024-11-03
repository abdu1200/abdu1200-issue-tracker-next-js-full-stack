import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/prisma/client";
import { NextAuthOptions } from "next-auth"; //this is a type
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";

const authOptions: NextAuthOptions = {
  //this is the object(aka authOptions) for initializing nextauth

  adapter: PrismaAdapter(prisma),

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "john3@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        //this func is fired when the user clicks on the login button
        //the actual authentication code

        if (!credentials?.email || !credentials.password) {
          //if it is not valid email or password
          return null;
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user) {
          //if there is no user with that email account
          return null;
        }

        //compare is from bcrypt //is the password match with the email
        const isPasswordCorrect = await compare(
          credentials.password,
          user.password!
        );

        if (!isPasswordCorrect) {
          return null;
        }

        return {
          //if all safe
          id: user.id + "", //the empty sting is to make the id a string b/c it is returned as a number
          email: user.email,
          name: user.name,
          image: user.image,
          randomkey: "hi",
        };
      },
    }),
  ],

  callbacks: {
    jwt: ({ token, user }) => {
      //only the first time the user logs in, we get the whole user info(in the parameter)
      console.log("JWT callback:", { token, user });

      if (user) {
        const u = user as unknown as any; //we're giving the user a type as any or unknown
        return {
          ...token,
          id: u.id,
          randomkey: u.randomkey,
        };
      }
      return token;
    },

    session: ({ session, token }) => {
      console.log("Session callback:", { session, token });

      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          randomkey: token.randomkey,
        },
      };

      return session;
    },
  },

  session: {
    strategy: "jwt",
  },
};

export default authOptions;

//the client session(with session hook) is late than the server session(with getserversession) b/c incase of client session, when the page loads, it asks the server(http request from client) to decode the JWT
//to add custom keys to our session or session user(like id, primary key), we have to modify two of the callbacks in nextauth
//first the authorize function return the info and that info passes through the JWT callback function and then it is used in the session callback
//the token info that is passed from the authorize func to the JWT callback is then passed to the session callback
//in the above callback ways  , we can add arbitrary properties to the jwt and we can use them in our application normally
