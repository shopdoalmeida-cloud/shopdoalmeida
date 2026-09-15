// algoritmo-vendas-tks/src/components/Hero.jsx

import { ArrowRight, Check, Gift, LockKeyhole, Sparkles, Verified } from 'lucide-react';
import lucasImageDesktop from '../assets/image/lucas-fade-desktop.webp';
import lucasImageMobile from '../assets/image/lucas-fade-mobile.webp';

export default function Hero() {
  const salesNotifications = [
    { amount: 'R$ 15.329,80', time: 'hoje, 10:42' },
    { amount: 'R$ 10.458,90', time: 'hoje, 09:15' },
    { amount: 'R$ 5.872,40', time: 'ontem, 21:37' },
  ];

  return (
    <section className="relative overflow-hidden bg-neutral-950 px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
      {/* Background Effects */}
      <div className="hero-background-effects absolute inset-0 overflow-hidden">
        <div className="absolute -right-1/4 top-1/4 h-[400px] w-[400px] sm:h-[500px] sm:w-[500px] lg:h-[600px] lg:w-[600px] rounded-full bg-cyan-500/20 blur-[120px]" />
        <div className="absolute -left-1/4 top-1/3 h-[350px] w-[350px] sm:h-[400px] sm:w-[400px] lg:h-[500px] lg:w-[500px] rounded-full bg-blue-600/10 blur-[100px]" />
      </div>

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-0 lg:grid-cols-2 lg:gap-12 xl:gap-16">
        {/* Left Content */}
        <div className="-mt-6 order-2 text-center lg:order-1 lg:mt-0 lg:text-left">
          <div className="mx-auto max-w-2xl lg:mx-0">
            {/* Kicker */}
            <div className="hidden items-center gap-2 text-cyan-400 text-xs sm:text-sm font-medium uppercase tracking-wide lg:flex">
              <Sparkles className="h-3 w-3 sm:h-4 sm:w-4" />
              <span>Treinamento completo para TikTok Shop</span>
            </div>

            {/* Title */}
            <h1 className="hero-desktop-title mt-3 font-display text-3xl font-black uppercase leading-tight text-white sm:text-4xl lg:text-5xl xl:text-6xl">
              ALGORITMO<br />DE<br />
              <span className="text-cyan-400">VENDAS TKS</span>
            </h1>

            {/* Subtitle */}
            <p className="mt-4 text-sm text-neutral-400 sm:text-base max-w-xl">
              O curso completo para aprender a vender no TikTok Shop através de vídeos, do básico ao avançado.
            </p>

            {/* Bonus Box */}
            <div className="bonus-highlight mt-5 flex items-start gap-3 rounded-xl border border-cyan-500/30 bg-cyan-950/20 p-3 text-left sm:p-4 backdrop-blur-sm">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-cyan-500/20 text-cyan-400 sm:h-12 sm:w-12">
                <Gift className="h-5 w-5 sm:h-6 sm:w-6" />
              </div>
              <div>
                <p className="font-semibold text-white text-xs sm:text-sm">
                  Compre o treinamento e ganhe
                </p>
                <p className="text-xs text-neutral-400 sm:text-sm">
                  uma análise de perfil completa gratuitamente!
                </p>
              </div>
            </div>

            {/* CTA Button */}
            <a
              href="https://pay.kiwify.com.br/fxhc0Y8" 
              className="hero-cta mt-5 group flex items-center justify-center gap-3 rounded-full bg-cyan-400 px-4 py-2 font-semibold text-neutral-950 shadow-[0_0_22px_rgba(0,224,255,0.42)] transition-all sm:px-6 sm:py-2.5 hover:shadow-[0_0_30px_rgba(0,224,255,0.6)] hover:scale-[1.02]"
            >
              <span className="whitespace-nowrap text-[9px] sm:text-xs">QUERO ENTRAR NO ALGORITMO DE VENDAS TKS</span>
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-neutral-950 text-cyan-300 sm:h-6 sm:w-6">
                <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5 sm:h-3.5 sm:w-3.5" />
              </span>
            </a>

            {/* Trust Badges */}
            <div className="mt-6 flex flex-nowrap items-center justify-between gap-1 text-[10px] text-neutral-400 sm:mt-4 sm:gap-6 sm:text-sm">
              <span className="flex shrink-0 items-center gap-1 whitespace-nowrap sm:gap-2">
                <Check className="h-3 w-3 sm:h-4 sm:w-4 text-cyan-400" />
                Acesso imediato
              </span>
              <span className="flex shrink-0 items-center gap-1 whitespace-nowrap sm:gap-2">
                <Check className="h-3 w-3 sm:h-4 sm:w-4 text-cyan-400" />
                Garantia de 7 dias
              </span>
              <span className="flex shrink-0 items-center gap-1 whitespace-nowrap sm:gap-2">
                <LockKeyhole className="h-3 w-3 sm:h-4 sm:w-4 text-cyan-400" />
                Compra segura
              </span>
            </div>

          </div>
        </div>

        {/* Right Content - Image and Notifications */}
        <div className="relative order-1 flex justify-center lg:order-2 lg:justify-start">
          {/* Main Image Container */}
          <div className="hero-image-stage relative mx-auto w-full max-w-[320px] translate-x-0 sm:max-w-[380px] sm:translate-x-2 lg:mx-0 lg:max-w-[470px] lg:translate-x-0 xl:max-w-[520px] xl:-translate-x-2 lg:translate-y-10 xl:translate-y-14">
            <div className="relative pb-[20px] lg:pb-0">
              <div className="hero-image-glow absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 blur-2xl" />
              <picture className="relative z-10 block w-full">
                <source
                  media="(max-width: 1024px)"
                  srcSet={`${lucasImageMobile} 420w`}
                  sizes="(max-width: 640px) 320px, 380px"
                />
                <img
                  src={lucasImageDesktop}
                  srcSet={`${lucasImageDesktop} 800w`}
                  sizes="(min-width: 1280px) 520px, (min-width: 1024px) 470px, 100vw"
                  width="800"
                  height="694"
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  alt="Lucas, criador do Algoritmo de Vendas TKS"
                  className="hero-person-image relative z-10 w-full object-contain object-top drop-shadow-2xl"
                  style={{ aspectRatio: '3/4' }}
                />
              </picture>

              {/* Mobile Commission Badge */}
              <div className="hero-mobile-commission absolute bottom-[144px] left-2 right-2 z-30 flex items-center justify-center gap-3 overflow-hidden whitespace-nowrap rounded-xl border border-rose-500/30 bg-gradient-to-br from-neutral-900/95 to-rose-950/30 px-4 py-3 text-left shadow-[0_0_20px_-5px_rgba(34,211,238,0.2),_0_0_24px_-12px_rgba(244,63,94,0.55)] backdrop-blur-xl lg:hidden">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-rose-400/60 to-cyan-400/50" />
                <div className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cyan-500/10 ring-1 ring-cyan-500/30">
                  <div className="absolute inset-0 rounded-full bg-cyan-400/20 blur-sm animate-pulse" />
                  <Verified className="relative h-4 w-4 text-cyan-300" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-black tracking-tight text-white">
                    + de <span className="bg-gradient-to-r from-cyan-300 to-cyan-500 bg-clip-text text-transparent">R$1.000.000,00</span>
                  </p>
                  <p className="mt-0.5 flex items-center gap-1.5 text-[10px] font-medium text-neutral-400">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)] animate-pulse" />
                    em vendas no TikTok Shop
                  </p>
                </div>
              </div>

              <div className="hero-mobile-kicker absolute inset-x-0 bottom-[102px] z-20 flex items-center justify-center gap-1.5 rounded-md border border-cyan-400/60 bg-[#061925]/90 px-2 py-1.5 text-center text-[9px] font-semibold uppercase tracking-wide text-cyan-300 backdrop-blur-sm lg:hidden">
                <Sparkles className="hidden h-3 w-3 shrink-0 lg:block" />
                <span>Treinamento completo para TikTok Shop</span>
              </div>

              <h1 className="hero-mobile-title absolute inset-x-0 bottom-[28px] z-20 text-center font-display text-[2.05rem] font-black uppercase leading-[0.94] text-white lg:hidden">
                ALGORITMO<br />
                <span>DE <b>VENDAS TKS</b></span>
              </h1>

              {/* Commission Badge Desktop (Modernizado) */}
              <div className="hero-commission-badge absolute -bottom-4 sm:-bottom-6 left-3 sm:left-6 right-3 sm:right-6 z-20 hidden lg:flex items-center gap-3 sm:gap-4 overflow-hidden rounded-2xl border border-rose-500/30 bg-gradient-to-br from-neutral-900/95 via-neutral-900/90 to-rose-950/30 px-4 py-3 sm:px-6 sm:py-4 shadow-[0_0_25px_-5px_rgba(34,211,238,0.2),_0_0_30px_-12px_rgba(244,63,94,0.55),_0_10px_30px_-10px_rgba(0,0,0,0.5)] backdrop-blur-xl group">
                {/* Subtle top highlight */}
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-rose-400/60 to-cyan-400/50" />
                
                {/* Icon with pulse */}
                <div className="relative flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-full bg-cyan-500/10 ring-1 ring-cyan-500/30 group-hover:ring-cyan-400/50 transition-all duration-300">
                  <div className="absolute inset-0 rounded-full bg-cyan-400/20 blur-md animate-pulse" />
                  <Verified className="relative h-5 w-5 sm:h-6 sm:w-6 text-cyan-300" />
                </div>
                
                <div className="min-w-0 flex-1">
                  <p className="font-black text-white text-sm sm:text-base tracking-tight leading-tight">
                    + de <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-cyan-400 to-cyan-500">R$1.000.000,00</span>
                  </p>
                  <p className="text-[11px] sm:text-xs font-medium text-neutral-400 mt-1 flex items-center gap-1.5">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)] animate-pulse" />
                    em vendas validadas no TikTok Shop
                  </p>
                </div>
              </div>
            </div>

            {/* Sales Notifications - Mobile */}
            <div className="hero-mobile-notifications absolute inset-x-0 top-6 z-30 flex items-start justify-between lg:hidden">
              {salesNotifications.slice(0, 2).map((notification, index) => (
                <div
                  key={index}
                  className={`hero-mobile-notification group w-[35%] rounded-lg border border-white/10 bg-neutral-950/90 p-1.5 backdrop-blur-xl transition-all hover:border-cyan-500/30 ${index === 1 ? 'mt-8' : ''}`}
                >
                  <div className="mb-0.5 flex items-center gap-1">
                    <div className="flex h-4 w-4 items-center justify-center rounded-full bg-gradient-to-br from-neutral-800 to-neutral-900 shrink-0">
                      <svg className="h-2.5 w-2.5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                      </svg>
                    </div>
                    <p className="text-[9px] font-medium text-white">TikTok Shop</p>
                  </div>
                  <p className="hero-mobile-notification-amount text-[11px] font-bold text-emerald-400">{notification.amount}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Sales Notifications - Desktop (Posicionado no canto direito) */}
          <div className="hidden lg:flex absolute right-0 top-0 z-30 w-64 xl:w-72 flex-col gap-3">
            {salesNotifications.map((notification, index) => (
              <div
                key={index}
                className="group rounded-2xl border border-white/10 bg-neutral-900/90 p-4 backdrop-blur-xl transition-all hover:border-cyan-500/30 hover:bg-neutral-800/90 hover:shadow-[0_0_20px_-5px_rgba(34,211,238,0.15)]"
              >
                <div className="mb-2 flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-neutral-800 to-neutral-900 shrink-0">
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-white truncate">TikTok Shop</p>
                    <p className="text-[10px] text-neutral-400">{notification.time}</p>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-neutral-400">Transferência recebida</p>
                  <p className="text-lg font-bold text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.4)]">{notification.amount}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
