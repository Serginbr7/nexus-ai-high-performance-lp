import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import VercelPostgresAdapter from "../../../../lib/auth-adapter"; // Importa o arquivo da pasta lib

const handler = NextAuth({
  adapter: VercelPostgresAdapter(), // <--- AQUI ESTÁ A MÁGICA: Conecta ao banco
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
        session.user.id = user.id; // Garante que o ID do banco vá para o frontend
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };