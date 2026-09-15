import { useState } from 'react';
import { ArrowRight, Check, ChevronDown, LockKeyhole, ShieldCheck, Zap } from 'lucide-react';
import { faqs } from '../data/content';
import kiwifyIcon from '../assets/icone/Kiwify-optimized.webp';
import masterCardIcon from '../assets/icone/master-card.webp';
import pixIcon from '../assets/icone/pix-optimized.webp';
import visaIcon from '../assets/icone/visa.webp';

const benefits = [
  { icon: Zap, label: 'Acesso imediato' },
  { icon: ShieldCheck, label: '7 dias de garantia' },
  { icon: LockKeyhole, label: 'Compra segura' },
];

export default function FinalSection() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="final-section border-t border-white/10 bg-[#07080b] px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
      <div className="mx-auto grid max-w-6xl items-start gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
        <div>
          <h2 className="mb-5 font-display text-2xl font-black uppercase text-white sm:text-3xl">
            PERGUNTAS FREQUENTES
          </h2>
          <div className="space-y-1.5">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div key={index} className="overflow-hidden border border-white/10 bg-[#0d0e12]">
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="flex min-h-9 w-full items-center justify-between gap-4 px-3 py-2 text-left text-xs text-white transition-colors hover:bg-white/5 sm:px-4 sm:text-sm"
                    aria-expanded={isOpen}
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`h-4 w-4 shrink-0 text-white transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  <div className={`faq-answer ${isOpen ? 'is-open' : ''}`} aria-hidden={!isOpen}>
                    <div>
                        <p className="border-t border-white/10 px-3 py-3 text-xs leading-relaxed text-neutral-400 sm:px-4 sm:text-sm">
                          {faq.a}
                        </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="border border-cyan-400/70 bg-[#090b0f] px-4 py-6 shadow-[0_0_30px_rgba(0,224,255,0.06)] sm:px-8 sm:py-7">
          <h2 className="text-center font-display text-2xl font-black uppercase leading-tight text-white sm:text-3xl">
            PRONTO PARA TRANSFORMAR<br />VÍDEOS EM VENDAS?
          </h2>

          <div className="mt-5 grid grid-cols-3 gap-2 text-center text-[10px] text-neutral-300 sm:gap-4 sm:text-xs">
            {benefits.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center justify-center gap-1 whitespace-nowrap">
                <Icon className="h-4 w-4 text-cyan-400" />
                <span>{label}</span>
              </div>
            ))}
          </div>

          <a
            href="https://pay.kiwify.com.br/fxhc0Y8"
            className="mt-6 flex items-center justify-center gap-2 rounded-md bg-[#00e0ff] px-3 py-3 text-center text-xs font-black text-[#050507] shadow-[0_0_22px_rgba(0,224,255,0.28)] transition hover:bg-[#00e0ff] hover:shadow-[0_0_30px_rgba(0,224,255,0.5)] sm:text-sm"
          >
            QUERO ENTRAR NO ALGORITMO DE VENDAS TKS
            <ArrowRight className="h-4 w-4 shrink-0" />
          </a>

          <div className="mt-5 flex flex-col items-center justify-center gap-2 text-[10px] text-neutral-400 sm:flex-row sm:gap-x-2 sm:text-xs">
            <span className="shrink-0">Pagamento 100% seguro via</span>
            <div className="flex items-center justify-center gap-2">
              <span className="inline-flex items-center gap-1 font-semibold text-white">
                <img src={kiwifyIcon} alt="" width="64" height="64" className="h-5 w-5 object-contain" />
                Kiwify
              </span>
              <span className="hidden text-neutral-600 sm:inline">|</span>
              <span className="inline-flex items-center gap-1 font-semibold text-white">
                <img src={visaIcon} alt="Visa" width="64" height="64" className="h-5 w-auto object-contain" />
                VISA
              </span>
              <span className="inline-flex items-center gap-1 font-semibold text-white">
                <img src={masterCardIcon} alt="Mastercard" width="64" height="64" className="h-5 w-auto object-contain" />
                Mastercard
              </span>
              <span className="inline-flex items-center gap-1 font-semibold text-white">
                <img src={pixIcon} alt="" width="64" height="64" className="h-5 w-5 object-contain" />
                Pix
              </span>
            </div>
          </div>
          <div className="mt-3 flex items-center justify-center gap-1 text-[10px] text-neutral-500">
            <Check className="h-3 w-3 text-cyan-400" /> Ambiente seguro e certificado.
          </div>
        </div>
      </div>
    </section>
  );
}
