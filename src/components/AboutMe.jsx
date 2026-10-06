import { CalendarDays, ChevronDown, Heart, MapPin, Maximize2, Minimize2, Pause, Play, Quote, ShoppingBag, Volume2, VolumeX } from 'lucide-react';
import Hls from 'hls.js';
import { useEffect, useRef, useState } from 'react';
import imageOne from '../assets/image/sobre-mim/imagem-1-optimized.webp';
import imageTwo from '../assets/image/sobre-mim/imagem-2-optimized.webp';
import imageThree from '../assets/image/sobre-mim/imagem-3-optimized.webp';
import sideCollage from '../assets/image/sobre-mim/imagem-lateral-direita-optimized.webp';

const bunnyVideoId = 'e7823df1-bee3-48ca-84bd-7bb036ab79f0';
const bunnyCdnHost = 'https://vz-fda22be4-d2e.b-cdn.net';
const bunnyVideoPoster = `${bunnyCdnHost}/${bunnyVideoId}/thumbnail.jpg`;
const bunnyVideoPlaylist = `${bunnyCdnHost}/${bunnyVideoId}/playlist.m3u8`;

const formatTime = (seconds) => {
  const safeSeconds = Number.isFinite(seconds) ? Math.max(0, seconds) : 0;
  const minutes = Math.floor(safeSeconds / 60);
  const remainder = Math.floor(safeSeconds % 60);
  return `${minutes}:${String(remainder).padStart(2, '0')}`;
};

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

export default function AboutMe({ shouldPause = false, onActivate }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const videoRef = useRef(null);
  const frameRef = useRef(null);
  const [hasStarted, setHasStarted] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;

    if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = bunnyVideoPlaylist;
      return undefined;
    }

    if (!Hls.isSupported()) return undefined;
    const hls = new Hls({ capLevelToPlayerSize: true });
    hls.loadSource(bunnyVideoPlaylist);
    hls.attachMedia(video);
    return () => hls.destroy();
  }, []);

  useEffect(() => {
    if (shouldPause) videoRef.current?.pause();
  }, [shouldPause]);

  useEffect(() => {
    const updateFullscreenState = () => {
      const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement;
      setIsFullscreen(fullscreenElement === frameRef.current);
    };

    document.addEventListener('fullscreenchange', updateFullscreenState);
    document.addEventListener('webkitfullscreenchange', updateFullscreenState);
    return () => {
      document.removeEventListener('fullscreenchange', updateFullscreenState);
      document.removeEventListener('webkitfullscreenchange', updateFullscreenState);
    };
  }, []);

  const startWithSound = () => {
    const video = videoRef.current;
    if (!video) return;
    onActivate?.();
    video.currentTime = 0;
    video.volume = 1;
    video.muted = false;
    video.play().catch(() => {});
    setHasStarted(true);
    setIsMuted(false);
  };

  const toggleSound = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.muted) onActivate?.();
    video.muted = !video.muted;
    if (!video.muted) video.volume = 1;
    setIsMuted(video.muted);
  };

  const togglePlayback = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      onActivate?.();
      video.play().catch(() => {});
    }
    else video.pause();
  };

  const handleVideoClick = () => {
    if (hasStarted) togglePlayback();
    else startWithSound();
  };

  const seekVideo = (event) => {
    const video = videoRef.current;
    if (!video) return;
    const nextTime = Number(event.target.value);
    video.currentTime = nextTime;
    setCurrentTime(nextTime);
  };

  const toggleFullscreen = () => {
    const element = frameRef.current;
    const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement;

    if (fullscreenElement) {
      if (document.exitFullscreen) document.exitFullscreen()?.catch?.(() => {});
      else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
      return;
    }

    if (element?.requestFullscreen) {
      element.requestFullscreen()?.catch?.(() => videoRef.current?.webkitEnterFullscreen?.());
    }
    else if (element?.webkitRequestFullscreen) element.webkitRequestFullscreen();
    else if (videoRef.current?.webkitEnterFullscreen) videoRef.current.webkitEnterFullscreen();
  };

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
            <div ref={frameRef} className="about-video-card">
              <video
                ref={videoRef}
                poster={bunnyVideoPoster}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onLoadedMetadata={(event) => setDuration(event.currentTarget.duration || 0)}
                onDurationChange={(event) => setDuration(event.currentTarget.duration || 0)}
                onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime || 0)}
              />

              <button
                type="button"
                className="inline-video-click-surface"
                aria-label={isPlaying && hasStarted ? 'Pausar vídeo' : 'Reproduzir vídeo'}
                onClick={handleVideoClick}
              />

              {!hasStarted && <span className="about-video-shade" aria-hidden="true" />}
              {(!hasStarted || !isPlaying) && (
                <button
                  type="button"
                  className="featured-video-play about-inline-video-play"
                  aria-label={hasStarted ? 'Continuar vídeo' : 'Assistir à história com áudio desde o início'}
                  onClick={hasStarted ? togglePlayback : startWithSound}
                >
                  <Play aria-hidden="true" fill="currentColor" />
                </button>
              )}
              {!hasStarted && <span className="about-video-content">
                <strong>Assista minha história</strong>
                <small>{duration ? `${formatTime(duration)} min` : 'Minha história'}</small>
              </span>}

              <div className={`featured-video-controls${isFullscreen ? ' is-fullscreen' : ''}`}>
                {isFullscreen && (
                  <button type="button" aria-label={isPlaying ? 'Pausar vídeo' : 'Continuar vídeo'} onClick={togglePlayback}>
                    {isPlaying ? <Pause aria-hidden="true" fill="currentColor" /> : <Play aria-hidden="true" fill="currentColor" />}
                  </button>
                )}
                {isFullscreen && (
                  <div className="featured-video-progress">
                    <input
                      type="range"
                      min="0"
                      max={Math.max(duration, 0.1)}
                      step="0.1"
                      value={Math.min(currentTime, Math.max(duration, 0.1))}
                      aria-label="Andamento do vídeo"
                      onChange={seekVideo}
                    />
                    <span>{formatTime(currentTime)} / {formatTime(duration)}</span>
                  </div>
                )}
                <button type="button" aria-label={isMuted ? 'Ativar som' : 'Mutar som'} onClick={toggleSound}>
                  {isMuted ? <VolumeX aria-hidden="true" /> : <Volume2 aria-hidden="true" />}
                </button>
                <button type="button" aria-label={isFullscreen ? 'Sair da tela cheia' : 'Exibir vídeo em tela cheia'} onClick={toggleFullscreen}>
                  {isFullscreen ? <Minimize2 aria-hidden="true" /> : <Maximize2 aria-hidden="true" />}
                </button>
              </div>
            </div>
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

    </section>
  );
}
