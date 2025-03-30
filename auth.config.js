import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const { auth, signIn, signOut, handlers } = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        mobile_number: { label: "mobile_number", type: "text" },
        pin_number: { label: "pin_number", type: "password" },
      },
      async authorize(credentials) {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/signin`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(credentials),
        });

        const user = await res.json();
       
        if (!res.ok) throw new Error(user.message);

        return {
          accessToken: user.accessToken, // JWT from backend
          accessTokenExpires: Date.now() + 60 * 60 * 1000, // 1 hour expiry
          id: user.id,
          name:user.name,
          role:user.role
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          accessToken: user.accessToken,
          accessTokenExpires: user.accessTokenExpires,
          id: user.id,
          name:user.name,
          role:user.role
      
        };
      }

      // If token is expired, return null to log the user out
      if (Date.now() > token.accessTokenExpires) {
        return null;
      }

      return token;
    },
    async session({ session, token }) {
      if (!token) {
        return null; // Session expires
      }

      session.accessToken = token.accessToken;
      session.user = {
        id: token.id,
        name:token.name,
        role:token.role
      };

      return session;
    },
  },
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
});
