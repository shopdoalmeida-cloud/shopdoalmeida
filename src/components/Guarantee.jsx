import { ShieldCheck } from 'lucide-react';

export default function Guarantee() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-3xl mx-auto text-center bg-gradient-to-b from-[#3ddc84]/10 to-transparent border border-[#3ddc84]/20 rounded-3xl p-10 lg:p-16">
        <ShieldCheck className="w-20 h-20 text-[#3ddc84] mx-auto mb-6" />
        <h2 className="font-display font-black text-5xl lg:text-6xl uppercase mb-6">7 DIAS DE <span className="text-[#3ddc84]">GARANTIA</span></h2>
        <p className="text-gray-300 text-lg mb-8 max-w-xl mx-auto">
          Você terá sete dias para conhecer o treinamento e decidir se ele é para você, conforme as condições da oferta. Sem riscos.
        </p>
        <a href="https://pay.kiwify.com.br/fxhc0Y8" className="inline-block bg-[#3ddc84] text-black px-10 py-4 rounded-xl font-black text-lg hover:scale-105 transition-transform">
          QUERO COMEÇAR AGORA
        </a>
      </div>
    </section>
  );
}