import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github"; // <--- Tem que ser GITHUB aqui

const handler = NextAuth({
  providers: [
    GithubProvider({ // <--- E aqui também!
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET, // Adicione essa linha para garantir
});

export { handler as GET, handler as POST };