import useEmblaCarousel from 'embla-carousel-react';
import AutoScroll from 'embla-carousel-auto-scroll';
import { ArrowRight, ChevronDown, ChevronLeft, ChevronRight, Lock } from 'lucide-react';
import { useMemo, useState } from 'react';
import { modules } from '../data/content';
import useCarouselActivity from '../hooks/useCarouselActivity';
import module1 from '../assets/carrosel/1-optimized.webp';
import module2 from '../assets/carrosel/2-optimized.webp';
import module3 from '../assets/carrosel/3-optimized.webp';
import module4 from '../assets/carrosel/4-optimized.webp';
import module5 from '../assets/carrosel/5-optimized.webp';
import module6 from '../assets/carrosel/6-optimized.webp';
import module7 from '../assets/carrosel/7-optimized.webp';
import module8 from '../assets/carrosel/8-optimized.webp';
import module9 from '../assets/carrosel/9-optimized.webp';

const moduleImages = { 1: module1, 2: module2, 3: module3, 4: module4, 5: module5, 6: module6, 7: module7, 8: module8, 9: module9 };
// Embla precisa de slides suficientes para preencher a viewport + buffer antes de
// conseguir fazer o loop sem "travar" no fim. Duplicamos a lista para garantir isso.
const loopedModules = [...modules, ...modules];

function Checkmark() {
  return <span className="module-check">✓</span>;
}

export default function ModulesCarousel({ videoOpen = false }) {
  const [openModules, setOpenModules] = useState(() => new Set());
  const autoScroll = useMemo(() => AutoScroll({
    playOnInit: true,
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
  useCarouselActivity(emblaApi, videoOpen);

  const scrollWithArrow = (direction) => {
    if (!emblaApi) return;

    emblaApi.plugins().autoScroll?.stop();
    if (direction === 'prev') emblaApi.scrollPrev(true);
    else emblaApi.scrollNext(true);
    requestAnimationFrame(() => emblaApi.plugins().autoScroll?.play());
  };

  const toggleModule = (moduleId) => {
    setOpenModules((current) => {
      const next = new Set(current);
      if (next.has(moduleId)) next.delete(moduleId);
      else next.add(moduleId);
      return next;
    });
  };

  return (
    <section className="modules-section px-5 py-20 sm:px-8" id="modulos">
      <div className="mx-auto max-w-[1480px]">
        <div className="modules-heading">
          <span className="section-kicker">CONHEÇA OS MÓDULOS</span>
          <h2 className="font-display font-black uppercase">CONHEÇA O QUE VOCÊ VAI APRENDER AO ENTRAR PARA O <span className="gradient-text"> ALGORITMO DE VENDAS TKS</span></h2>
          <p>Clique em cada módulo e veja um spoiler do que tem dentro.</p>
        </div>

        <div className="modules-carousel-wrap">
          <button type="button" className="carousel-arrow carousel-arrow-prev" aria-label="Módulo anterior" onClick={() => scrollWithArrow('prev')}>
            <ChevronLeft aria-hidden="true" />
          </button>
          <div className="modules-embla-viewport" ref={emblaRef}>
            <div className="modules-embla-container">
                            {loopedModules.map((mod, index) => (
                <div className="modules-embla-slide" key={`${mod.id}-${index}`}>
                  {mod.isLocked ? (
                    <div className="module-card module-locked-card">
                      <div className="module-lock-icon"><Lock className="h-7 w-7" /></div>
                      <h3>CONTEÚDO<br />BLOQUEADO</h3>
                      <p>Isso é apenas uma parte do treinamento.</p>
                      <a href="https://pay.kiwify.com.br/fxhc0Y8" className="module-unlock">DESBLOQUEAR <ArrowRight className="h-4 w-4" /></a>
                    </div>
                  ) : (
                    <article className={`module-card ${mod.isAdvanced ? 'module-featured' : ''}`}>
                      <div className="module-cover-wrap">
                        <img src={moduleImages[mod.id]} alt={mod.title} width="540" height="810" className="module-cover" loading="lazy" decoding="async" />
                        {!mod.isCommunity && <span className="module-number">MÓDULO {mod.id}</span>}
                        {mod.isAdvanced && <span className="module-advanced">DESTAQUE</span>}
                      </div>
                      <div className="module-details">
                        <h3 className="sr-only">{mod.title}</h3>
                        <ul>{mod.lessons.slice(0, 1).map((lesson) => <li key={lesson}><Checkmark />{lesson}</li>)}</ul>
                        <div className={`module-spoiler ${openModules.has(mod.id) ? 'is-open' : ''}`}>
                          <div><ul>{mod.lessons.slice(1).map((lesson) => <li key={lesson}><Checkmark />{lesson}</li>)}</ul></div>
                        </div>
                        <button type="button" className="module-more-button" aria-expanded={openModules.has(mod.id)} onClick={() => toggleModule(mod.id)}>
                          {openModules.has(mod.id) ? 'VER MENOS' : 'VER MAIS'}
                          <ChevronDown className="h-3.5 w-3.5" aria-hidden="true" />
                        </button>
                        {mod.isAdvanced && <strong className="module-more">+ aulas exclusivas</strong>}
                      </div>
                    </article>
                  )}
                </div>
              ))}
            </div>
          </div>
          <button type="button" className="carousel-arrow carousel-arrow-next" aria-label="Próximo módulo" onClick={() => scrollWithArrow('next')}>
            <ChevronRight aria-hidden="true" />
          </button>
        </div>

        <div className="modules-offer-strip" aria-label="Bônus do treinamento">
          <p><strong>Compre o treinamento e ganhe</strong><span>uma análise de perfil completa <b>gratuitamente!</b></span></p>
          <a href="https://pay.kiwify.com.br/fxhc0Y8">QUERO GARANTIR MEU ACESSO <ArrowRight className="h-4 w-4" /></a>
        </div>
      </div>
    </section>
  );
}
