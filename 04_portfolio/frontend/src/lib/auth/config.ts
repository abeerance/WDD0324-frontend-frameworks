import { loginSchema } from "@/schemas/validations/auth";
import type { NextAuthConfig, Session, User } from "next-auth";
import type { JWT } from "next-auth/jwt";
import Credentials from "next-auth/providers/credentials";

const API_URL = process.env.API_URL;

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: "/admin", // tells next-auth, which route is our custom login page
  },
  providers: [
    Credentials({
      // here we define our custom provider
      id: "credentials",
      name: "credentials",
      credentials: {
        // here we add all the properties which are needed for the login - should be the same as in the backend
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // the authorize function is the function which will be called from the signIn() functionality of auth.js
        const validatedFields = loginSchema.safeParse(credentials); // we connect the validatedFields with our login Zod schema

        if (!validatedFields.success) {
          return null; // if there is an error, we return null, which equals to no session
        }

        const { username, password } = validatedFields.data;

        try {
          // here we communicate with our backend with the help of the env variable. Check out which route is being used in Bruno
          const response = await fetch(`${API_URL}/auth/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }), // here we send the property name and their respective values
          });

          if (!response.ok) {
            return null; // if there is an error, we return null, which equals to no session
          }

          const data = await response.json(); // we store the data which we get from the backend into a new variable

          return {
            id: data.user.id.toString(),
            username: data.user.username,
            firstName: data.user.firstName,
            lastName: data.user.lastName,
            email: data.user.email,
            bio: data.user.bio,
            userRole: data.user.userRole,
            accessToken: data.user.accessToken,
          }; // here we return the user object, which we will need in the JWT callback function
        } catch (error) {
          console.error("Login error: ", error);
          return null; // if there is an error, we return null, which equals to no session
        }
      },
    }),
  ],
  callbacks: {
    // here we take all the information that we got from the authorize function and pass it into the token. This is needed, so that we can pass all the information to the JWT, before we append it into the session
    async jwt({ token, user }: { token: JWT; user: User }) {
      if (user) {
        token.id = user.id;
        token.username = user.username;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.email = user.email;
        token.bio = user.bio;
        token.userRole = user.userRole;
        token.accessToken = user.accessToken;
      }
      return token;
    },
    // here we take all the appended data from the JWT Token and pass it into the Session of auth.js, so that the session management knows that it has the following data
    async session({ session, token }: { session: Session; token: JWT }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.username = token.username as string;
        session.user.firstName = token.firstName as string;
        session.user.lastName = token.lastName as string;
        session.user.email = token.email as string;
        session.user.bio = token.bio as string | null;
        session.user.userRole = token.userRole as string;
        session.user.accessToken = token.accessToken as string;
      }
      return session;
    },
  },
};
