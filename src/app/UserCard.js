"use client";

import { useSession, signOut } from "next-auth/react";

export default function UserCard() {
  const { data: session, status } = useSession();

  console.log("Status do Login:", status); // Isso vai aparecer no F12 do navegador

  return (
    <div className="fixed top-20 right-4 z-50 bg-slate-900 border border-purple-500 p-4 rounded-xl shadow-2xl text-white">
      <p className="font-bold mb-2">Debug Status: <span className="text-yellow-400">{status}</span></p>
      
      {status === "authenticated" ? (
        <div>
          <p className="text-green-400">✅ Logado como: {session?.user?.name}</p>
          <button onClick={() => signOut()} className="bg-red-500 px-2 py-1 rounded mt-2 text-xs">Sair</button>
        </div>
      ) : (
        <p className="text-red-400">❌ Não logado (O cartão original estava escondido)</p>
      )}
    </div>
  );
}