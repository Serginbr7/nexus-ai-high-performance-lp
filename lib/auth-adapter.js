// lib/auth-adapter.js
import { sql } from "@vercel/postgres";

export default function VercelPostgresAdapter() {
  return {
    async createUser(user) {
      const { rows } = await sql`
        INSERT INTO users (name, email, image) 
        VALUES (${user.name}, ${user.email}, ${user.image}) 
        RETURNING id, name, email, email_verified, image`;
      return rows[0];
    },
    async getUser(id) {
      const { rows } = await sql`SELECT * FROM users WHERE id = ${id}`;
      return rows[0] || null;
    },
    async getUserByEmail(email) {
      const { rows } = await sql`SELECT * FROM users WHERE email = ${email}`;
      return rows[0] || null;
    },
    async getUserByAccount({ providerAccountId, provider }) {
      const { rows } = await sql`
        SELECT u.* FROM users u join accounts a on u.id = a."userId"
        WHERE a.provider_account_id = ${providerAccountId} 
        AND a.provider = ${provider}`;
      return rows[0] || null;
    },
    async linkAccount(account) {
      await sql`
        INSERT INTO accounts (
          "userId", provider, provider_account_id, type, access_token, token_type, scope, id_token
        ) 
        VALUES (
          ${account.userId}, ${account.provider}, ${account.providerAccountId}, ${account.type}, 
          ${account.access_token}, ${account.token_type}, ${account.scope}, ${account.id_token}
        )`;
      return account;
    },
    async createSession({ sessionToken, userId, expires }) {
      const { rows } = await sql`
        INSERT INTO sessions ("userId", session_token, expires) 
        VALUES (${userId}, ${sessionToken}, ${expires}) 
        RETURNING id, session_token, "userId", expires`;
      return rows[0];
    },
    async getSessionAndUser(sessionToken) {
      const { rows } = await sql`
        SELECT s.*, u.* FROM sessions s JOIN users u ON s."userId" = u.id
        WHERE s.session_token = ${sessionToken}`;
      if (!rows[0]) return null;
      const { name, email, image, ...session } = rows[0];
      return { session, user: { id: session.userId, name, email, image } };
    },
    async updateSession({ sessionToken }) {
      return null; 
    },
    async deleteSession(sessionToken) {
      await sql`DELETE FROM sessions WHERE session_token = ${sessionToken}`;
    },
  };
}