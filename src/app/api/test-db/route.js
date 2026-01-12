import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import VercelPostgresAdapter from "@/lib/auth-adapter"; // Importando nosso arquivo manual

const handler = NextAuth({
  adapter: VercelPostgresAdapter(), // Usando o adaptador manual
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id; // Garante que o ID do usuário esteja na sessão
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };