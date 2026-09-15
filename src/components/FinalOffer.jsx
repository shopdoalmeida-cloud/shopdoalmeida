import { Gift, Shield, BookOpen } from 'lucide-react';

export default function FinalOffer() {
  return (
    <section className="py-24 px-6 bg-gradient-to-t from-[#0c0c10] to-[#050507]">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="font-display font-black text-5xl lg:text-7xl uppercase mb-2">ALGORITMO DE VENDAS TKS</h2>
        <p className="text-xl text-gray-400 font-bold tracking-widest mb-10">APRENDA. APLIQUE. VENDA.</p>

        <div className="flex flex-col md:flex-row justify-center gap-6 mb-10">
          <div className="flex items-center justify-center gap-3 bg-[#0c0c10] border border-white/10 px-6 py-4 rounded-xl">
            <Gift className="w-6 h-6 text-[#00e0ff]" />
            <span className="font-bold text-sm">Análise de Perfil Completa Gratuita</span>
          </div>
          <div className="flex items-center justify-center gap-3 bg-[#0c0c10] border border-white/10 px-6 py-4 rounded-xl">
            <Shield className="w-6 h-6 text-[#3ddc84]" />
            <span className="font-bold text-sm">Sete Dias de Garantia</span>
          </div>
          <div className="flex items-center justify-center gap-3 bg-[#0c0c10] border border-white/10 px-6 py-4 rounded-xl">
            <BookOpen className="w-6 h-6 text-[#ff2e7e]" />
            <span className="font-bold text-sm">Treinamento do Básico ao Avançado</span>
          </div>
        </div>

        <a href="https://pay.kiwify.com.br/fxhc0Y8" className="relative overflow-hidden inline-flex items-center justify-center gap-3 bg-gradient-to-r from-[#00e0ff] to-[#ff2e7e] px-12 py-5 rounded-xl font-black text-xl hover:scale-105 transition-transform shadow-[0_10px_40px_rgba(0,224,255,0.25)] animate-shine w-full md:w-auto">
          QUERO ENTRAR NO ALGORITMO DE VENDAS TKS
        </a>
      </div>
    </section>
  );
}