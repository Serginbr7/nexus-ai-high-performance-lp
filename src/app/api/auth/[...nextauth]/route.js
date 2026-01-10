import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

const handler = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  // Adiciona segredo para criptografar os tokens (importante em produção)
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };