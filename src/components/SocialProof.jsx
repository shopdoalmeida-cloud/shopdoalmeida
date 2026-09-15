import useEmblaCarousel from 'embla-carousel-react';
import AutoScroll from 'embla-carousel-auto-scroll';
import { ChevronLeft, ChevronRight, Gift, Play, ShieldCheck, X, Zap } from 'lucide-react';
import { useEffect, useMemo, useRef } from 'react';
import { createPortal } from 'react-dom';
import useCarouselActivity from '../hooks/useCarouselActivity';
import proof1 from '../assets/proofs/proof-1-optimized.webp';
import proof2 from '../assets/proofs/proof-2-optimized.webp';
import proof3 from '../assets/proofs/proof-3-optimized.webp';
import proof4 from '../assets/proofs/proof-4-optimized.webp';
import proof5 from '../assets/proofs/proof-5-optimized.webp';
import proof6 from '../assets/proofs/proof-6-optimized.webp';

const proofs = [proof1, proof2, proof3, proof4, proof5, proof6];
const bunnyVideoPoster = 'https://vz-fda22be4-d2e.b-cdn.net/f508e553-1ee8-41fe-b05f-224450697ac0/thumbnail.jpg';
const bunnyExpandedVideoUrl = 'https://player.mediadelivery.net/embed/665166/f508e553-1ee8-41fe-b05f-224450697ac0?autoplay=true&loop=true&preload=true&playsinline=true';
const resultItems = [
  { type: 'video', id: 'video' },
  ...proofs.map((src, proofIndex) => ({ type: 'image', src, proofIndex })),
];
// Duplicamos para dar slides suficientes ao loop do Embla em telas largas.
const loopedResultItems = [...resultItems, ...resultItems];
const benefits = [
  { icon: Gift, title: 'Bônus exclusivo', text: 'Análise de perfil completa gratuitamente após a compra.', tone: 'cyan' },
  { icon: ShieldCheck, title: '7 dias de garantia', text: 'Conheça o treinamento e decida se ele é para você.', tone: 'cyan' },
  { icon: Zap, title: 'Acesso imediato', text: 'Com seu acesso liberado na hora, você já pode começar.', tone: 'pink' },
];

function VideoPreview({ onOpen }) {
  return (
    <div className="result-card result-video-card">
      <img className="result-video-poster" src={bunnyVideoPoster} alt="" width="720" height="1564" loading="lazy" decoding="async" />
      <button type="button" className="result-video-trigger" aria-haspopup="dialog" aria-label="Assistir ao vídeo de resultados" title="Assistir ao vídeo de resultados" onClick={onOpen}>
        <span className="result-video-play"><Play aria-hidden="true" /></span>
      </button>
    </div>
  );
}

export default function SocialProof({ isVideoOpen, onVideoOpenChange }) {
  const closeButtonRef = useRef(null);
  const autoScroll = useMemo(() => AutoScroll({
    playOnInit: false,
    speed: 0.35,
    startDelay: 80,
    stopOnInteraction: false,
    stopOnMouseEnter: false,
    stopOnFocusIn: false,
    rootNode: (emblaRoot) => emblaRoot.parentElement,
  }), []);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    containScroll: false,
    dragFree: true,
    loop: true,
  }, [autoScroll]);
  useCarouselActivity(emblaApi, isVideoOpen);

  const scrollWithArrow = (direction) => {
    if (!emblaApi) return;

    emblaApi.plugins().autoScroll?.stop();
    if (direction === 'prev') emblaApi.scrollPrev(true);
    else emblaApi.scrollNext(true);
    requestAnimationFrame(() => emblaApi.plugins().autoScroll?.play());
  };

  const openVideo = () => {
    onVideoOpenChange(true);
  };

  const closeVideo = () => {
    onVideoOpenChange(false);
  };

  useEffect(() => {
    if (!isVideoOpen) return undefined;

    const previouslyFocused = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus({ preventScroll: true });
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onVideoOpenChange(false);
    };
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
      if (previouslyFocused?.isConnected) previouslyFocused.focus({ preventScroll: true });
    };
  }, [isVideoOpen, onVideoOpenChange]);

  return (
    <section className="results-section px-5 py-20 sm:px-8" id="resultados">
      <div className="mx-auto max-w-[1480px]">
        <div className="results-heading">
          <h2 className="font-display font-black uppercase">Resultados reais com o <span className="gradient-text">TikTok Shop</span></h2>
          <p>Resultados reais que eu já conquistei trabalhando com vídeos.</p>
        </div>

        <div className="results-featured-video">
          <VideoPreview onOpen={openVideo} />
        </div>

        <div className="results-carousel-wrap">
          <button type="button" className="carousel-arrow carousel-arrow-prev" aria-label="Resultado anterior" onClick={() => scrollWithArrow('prev')}>
            <ChevronLeft aria-hidden="true" />
          </button>
          <div className="results-embla-viewport" ref={emblaRef}>
            <div className="results-embla-container">
              {loopedResultItems.map((item, index) => (
                <div className={`results-embla-slide${item.type === 'video' ? ' results-video-slide' : ''}`} key={`${item.id ?? item.src}-${index}`}>
                  {item.type === 'video' ? (
                    <VideoPreview onOpen={openVideo} />
                  ) : (
                    <div className="result-card">
                      <img src={item.src} alt={`Comissão recebida ${item.proofIndex + 1}`} width="420" height="911" loading="lazy" decoding="async" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          <button type="button" className="carousel-arrow carousel-arrow-next" aria-label="Próximo resultado" onClick={() => scrollWithArrow('next')}>
            <ChevronRight aria-hidden="true" />
          </button>
        </div>

        {isVideoOpen && createPortal(
          <div className="video-modal" role="presentation" onClick={closeVideo}>
            <div className="video-modal-dialog" role="dialog" aria-modal="true" aria-label="Vídeo de resultados" onClick={(event) => event.stopPropagation()}>
              <button ref={closeButtonRef} type="button" className="video-modal-close" aria-label="Fechar vídeo" onClick={closeVideo}>
                <X aria-hidden="true" />
              </button>
              <iframe
                width="720"
                height="1564"
                src={bunnyExpandedVideoUrl}
                title="Resultados reais no TikTok Shop"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>,
          document.body,
        )}

        <p className="results-disclaimer">* Resultados reais obtidos pelo criador do treinamento. Resultados individuais podem variar.</p>

        <div className="results-benefits">
          {benefits.map(({ icon: Icon, title, text, tone }) => (
            <div className="result-benefit" key={title}>
              <div className={`result-benefit-icon ${tone}`}><Icon className="h-6 w-6" /></div>
              <div><h3>{title}</h3><p>{text}</p></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
