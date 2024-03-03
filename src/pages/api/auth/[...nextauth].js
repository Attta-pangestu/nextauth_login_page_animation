import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import { signInUser } from "@/lib/firebase/service";
import bcrypt from 'bcrypt'

const authOptions = {
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET, // Store in environment variable
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),

    CredentialsProvider({
      type: "credentials",
      name: "Credentials",
      credentials: {
        password: { label: "Password", type: "password" },
        email: { label: "Email", type: "email" },
      },

      async authorize(credentials) {
        const { email, password } = credentials;
        
        try {
          // ... (Implement user fetching, replace with actual user data)

          const registeredUser = await signInUser({email, password})
          console.log(registeredUser)
          if(!registeredUser) return null;
          const isMatchPass = await bcrypt.compare(password, registeredUser.password) 
          console.log(isMatchPass)
          if(registeredUser.email === email && isMatchPass) return registeredUser;
          else {
            return null;
          }
        } catch (error) {
          console.error("Error:", error);
          return null; // Return null for failed attempts
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (account?.provider === "credentials") {
        console.log("Calling JWT");
        token.name = user.name;
        token.email = user.email;
        token.image = user.image;
        console.log(token);
      }
      return token;
    },
    async session({ session, token }) {
      console.log(token);
      if ("email" in token) {
        console.log("Calling Session Email");
        session.user.email = token.email;
      }
      if ("name" in token) {
        console.log("Calling Session Name");
        session.user.name = token.name;
      }
      if ("image" in token) {
        session.user.image = token.image;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};

export default NextAuth(authOptions);
