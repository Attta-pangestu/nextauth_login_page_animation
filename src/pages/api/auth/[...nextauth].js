import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";

const authOptions = {
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
      name: "credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
        email: { label: "Email", type: "email" },
      },

      async authorize(credentials) {
        const { username, password } = credentials;

        try {
          // ... (Implement user fetching, replace with actual user data)
          const user = {
            id: 1,
            name: "Pengguna",
            email: "aku@mail.com",
            username: "aku",
            password: "pass", // Replace with hashed password
          };

          if (username === user.username && password === user.password) {
            console.log(user);
            return user;
          } else {
            throw new Error("Invalid credentials");
          }
        } catch (error) {
          console.error("Error:", error);
          return null; // Return null for failed attempts
        }
      },
    }),
  ],
  // callbacks: {
  //   jwt({ token, user, account }) {
  //     if (account?.provider === "credentials") {
  //       if (user) {
  //         token.id = user.id;
  //         console.log({ token, user, account });
  //         return token;
  //       }
  //     }
  //   },
  //   async session({ session, token }) {
  //     if (token && token.email) {
  //       console.log("Calling Session");
  //       session.user.email = token.email;
  //       console.log(session);
  //     }
  //     return session;
  //   },
  // },
};

export default NextAuth(authOptions);
