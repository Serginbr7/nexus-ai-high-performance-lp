"use client";

import { MoveRight, CheckCircle2, Play } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession(); // Pega os dados do usuário logado

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 font-sans overflow-x-hidden">
      
      {/* Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop')] bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-[#020617]"></div>
      </div>

      {/* HEADER INTELIGENTE */}
      <nav className="relative z-10 flex justify-between items-center px-6 py-6 max-w-7xl mx-auto border-b border-slate-800/30 backdrop-blur-sm">
        <div className="text-2xl font-bold tracking-tighter flex items-center gap-2 cursor-pointer">
          <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-mono text-lg">N</span>
          </div>
          <span>Nexus<span className="text-purple-500">AI</span></span>
        </div>

        <div className="hidden md:flex gap-8 text-sm font-medium text-slate-400">
          <a href="#" className="hover:text-white transition-colors">Solutions</a>
          <a href="#" className="hover:text-white transition-colors">Pricing</a>
        </div>
        
        {/* LÓGICA DO LOGIN/PERFIL */}
        {session ? (
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-white">{session.user.name}</p>
              <p className="text-xs text-slate-400">Free Plan</p>
            </div>
            <img 
              src={session.user.image} 
              alt="Avatar" 
              className="w-10 h-10 rounded-full border-2 border-purple-500 cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => signOut()} // Logout ao clicar
              title="Sair"
            />
          </div>
        ) : (
          <button
            onClick={() => signIn("github")} 
            className="hidden md:flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-full text-sm font-bold transition-all border border-purple-500 shadow-[0_0_20px_-5px_rgba(147,51,234,0.5)]"
          >
            Login
          </button>
        )}
      </nav>

      {/* HERO SECTION (Mantive o resto igual) */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 py-20 md:py-32 grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-8 animate-in slide-in-from-left duration-1000 fade-in">
          <div className="inline-flex items-center gap-2 bg-purple-900/20 text-purple-300 px-4 py-1.5 rounded-full text-xs font-bold tracking-wide border border-purple-500/20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
            </span>
            NEXUS OS 2.0 IS LIVE
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight tracking-tight">
            Scale faster with <br />
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Intelligent Agents
            </span>
          </h1>
          <p className="text-lg text-slate-400 max-w-xl leading-relaxed">
            Replace manual workflows with autonomous AI agents. We build the infrastructure that powers the next generation of unicorns.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button className="group relative bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-full font-bold transition-all hover:scale-105 shadow-[0_0_40px_-10px_rgba(147,51,234,0.5)] flex items-center justify-center gap-2">
              Start Free Trial <MoveRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="flex items-center justify-center gap-2 border border-slate-700 hover:bg-slate-800/50 text-white px-8 py-4 rounded-full font-bold transition-all backdrop-blur-md">
              <Play className="w-4 h-4 fill-current" /> Watch Demo
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}