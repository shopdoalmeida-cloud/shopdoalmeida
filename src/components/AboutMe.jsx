import { CalendarDays, ChevronDown, Heart, MapPin, Play, Quote, ShoppingBag, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import imageOne from '../assets/image/sobre-mim/imagem-1-optimized.webp';
import imageTwo from '../assets/image/sobre-mim/imagem-2-optimized.webp';
import imageThree from '../assets/image/sobre-mim/imagem-3-optimized.webp';
import sideCollage from '../assets/image/sobre-mim/imagem-lateral-direita-optimized.webp';

const bunnyVideoId = '8b6a41d3-74c5-4dca-bd66-41106af0dc7b';
const bunnyVideoPoster = `https://vz-fda22be4-d2e.b-cdn.net/${bunnyVideoId}/thumbnail.jpg`;
const bunnyVideoUrl = `https://player.mediadelivery.net/embed/665166/${bunnyVideoId}?autoplay=true&preload=true&playsinline=true`;

const milestones = [
  { icon: CalendarDays, title: '21 anos', detail: 'Nascido em 26/11/2004' },
  { icon: MapPin, title: 'São Carlos - SP', detail: 'Minha cidade, minha história' },
  { icon: Heart, title: 'Casado', detail: 'Desde os 18 anos' },
  { icon: ShoppingBag, title: 'TikTok Shop', detail: 'Minha principal fonte de renda' },
];

const polaroids = [
  { src: imageOne, alt: 'Lucas em uma exposição', caption: 'Disciplina é o que te leva mais longe.' },
  { src: imageTwo, alt: 'Lucas e sua esposa no casamento', caption: 'Construindo nossa história' },
  { src: imageThree, alt: 'Lucas e sua esposa em uma viagem', caption: 'Momentos que me motivam' },
];

export default function AboutMe({ isVideoOpen, onVideoOpenChange }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const closeButtonRef = useRef(null);

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
    <section className="about-section" id="sobre-mim">
      <div className="about-shell">
        <div className="about-intro">
          <div className="about-copy">
            <p className="about-kicker"><span aria-hidden="true" />Sobre mim</p>
            <h2 className="about-title"><span>Lucas</span> Almeida Pereira</h2>
            <p className="about-role">Criador, afiliado e especialista em TikTok Shop</p>

            <div className={`about-story${isExpanded ? ' is-expanded' : ''}`}>
              <div>
                <p>Meu nome é Lucas Almeida Pereira, nasci em São Carlos - SP, no dia <strong>26 de novembro de 2004</strong>. Minha história com a internet começou ainda na adolescência, quando comecei a criar conteúdo e tentar entender como poderia transformar aquilo em uma profissão.</p>
                <p>Aos 18 anos me casei, e desde então eu e minha esposa caminhamos juntos em tudo. No início, morávamos em uma pequena kitnet e vivíamos uma realidade bem diferente da que temos hoje. Mesmo com as dificuldades e a incerteza financeira, continuei insistindo, porque acreditava que era possível construir uma vida melhor através da internet.</p>
                <p>Passei pelo YouTube, TikTok e Kwai, testando diferentes formatos, errando, aprendendo e evoluindo. Com o tempo, encontrei no TikTok Shop uma grande oportunidade e comecei a me dedicar de verdade às vendas através de vídeos e lives.</p>
                <p>Hoje, o TikTok Shop é a minha principal fonte de renda e é nele que foco 100% do meu trabalho. Toda a minha experiência, estratégias e aprendizados estão reunidos no Algoritmo de Vendas TKS.</p>
              </div>
            </div>

            <button type="button" className="about-more-button" aria-expanded={isExpanded} onClick={() => setIsExpanded((value) => !value)}>
              {isExpanded ? 'Ver menos' : 'Ver mais'}
              <ChevronDown aria-hidden="true" />
            </button>
          </div>

          <div className="about-media">
            <button type="button" className="about-video-card" aria-haspopup="dialog" aria-label="Assistir à história de Lucas Almeida Pereira" onClick={() => onVideoOpenChange(true)}>
              <img src={bunnyVideoPoster} alt="" width="1280" height="720" loading="lazy" decoding="async" />
              <span className="about-video-shade" aria-hidden="true" />
              <span className="about-video-content">
                <span className="about-video-play"><Play aria-hidden="true" /></span>
                <strong>Assista minha história</strong>
                <small>1:30 min</small>
              </span>
            </button>
            <img className="about-side-collage" src={sideCollage} alt="Lucas e sua esposa em momentos especiais" width="640" height="960" loading="lazy" decoding="async" />
          </div>
        </div>

        <div className="about-milestones" aria-label="Informações sobre Lucas">
          {milestones.map(({ icon: Icon, title, detail }) => (
            <div className="about-milestone" key={title}>
              <span className="about-milestone-icon"><Icon aria-hidden="true" /></span>
              <span><strong>{title}</strong><small>{detail}</small></span>
            </div>
          ))}
        </div>

        <div className="about-gallery">
          <div className="about-polaroids">
            {polaroids.map(({ src, alt, caption }, index) => (
              <figure className={`about-polaroid about-polaroid-${index + 1}`} key={src}>
                <img src={src} alt={alt} width="640" height="960" loading="lazy" decoding="async" />
                <figcaption>{caption}<span aria-hidden="true">♡</span></figcaption>
              </figure>
            ))}
          </div>

          <blockquote className="about-quote">
            <Quote aria-hidden="true" />
            <p>Meu objetivo é ajudar outras pessoas a realizarem os seus sonhos através do TikTok Shop, mostrando que com estratégia, consistência e o passo a passo certo, é possível construir uma <strong>realidade melhor.</strong></p>
            <span className="about-quote-line" aria-hidden="true" />
            <cite>Lucas Almeida Pereira</cite>
            <small>Sonhe · Planeje · Conquiste</small>
          </blockquote>
        </div>
      </div>

      {isVideoOpen && createPortal(
        <div className="video-modal" role="presentation" onClick={() => onVideoOpenChange(false)}>
          <div className="about-video-modal-dialog" role="dialog" aria-modal="true" aria-label="Minha história" onClick={(event) => event.stopPropagation()}>
            <button ref={closeButtonRef} type="button" className="video-modal-close" aria-label="Fechar vídeo" onClick={() => onVideoOpenChange(false)}>
              <X aria-hidden="true" />
            </button>
            <iframe
              width="1280"
              height="720"
              src={bunnyVideoUrl}
              title="A história de Lucas Almeida Pereira"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>,
        document.body,
      )}
    </section>
  );
}
