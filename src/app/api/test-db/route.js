import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function GET() {
  try {
    // sql
    // mensagem de teste );

    await sql`INSERT INTO messages (content, role) VALUES ('Olá Banco de Dados!', 'user')`;
    
    
    const result = await sql`SELECT * FROM messages`;
    
    return NextResponse.json({ result: result.rows });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}