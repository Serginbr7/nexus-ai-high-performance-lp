"use client";

import { useSession, signOut } from "next-auth/react";

export default function UserCard() {
  const { data: session, status } = useSession();

  // Esconde o cartão se não estiver logado ou carregando
  if (status !== "authenticated") {
    return null;
  }

  return (
    <div className="fixed top-4 right-4 bg-gray-900/90 backdrop-blur border border-gray-700 p-3 rounded-xl shadow-2xl flex items-center gap-3 z-50 animate-in fade-in slide-in-from-top-4">
      {/* Foto do Usuário */}
      {session?.user?.image && (
        <img 
          src={session.user.image} 
          alt="Avatar" 
          className="w-10 h-10 rounded-full border border-purple-500"
        />
      )}
      
      <div className="flex flex-col">
        {/* Nome do Usuário */}
        <span className="text-white text-sm font-bold leading-none">
          {session?.user?.name?.split(" ")[0]}
        </span>
        
        {/* Botão de Sair Discreto */}
        <button 
          onClick={() => signOut()}
          className="text-xs text-red-400 hover:text-red-300 text-left mt-1 hover:underline"
        >
          Sair
        </button>
      </div>
    </div>
  );
}