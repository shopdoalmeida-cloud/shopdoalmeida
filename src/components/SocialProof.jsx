import useEmblaCarousel from 'embla-carousel-react';
import AutoScroll from 'embla-carousel-auto-scroll';
import { ChevronLeft, ChevronRight, Maximize2, Minimize2, Pause, Play, ShieldCheck, UsersRound, Volume2, VolumeX, Zap } from 'lucide-react';
import Hls from 'hls.js';
import { useEffect, useMemo, useRef, useState } from 'react';
import useCarouselActivity from '../hooks/useCarouselActivity';
import proof1 from '../assets/proofs/proof-1-optimized.webp';
import proof2 from '../assets/proofs/proof-2-optimized.webp';
import proof3 from '../assets/proofs/proof-3-optimized.webp';
import proof4 from '../assets/proofs/proof-4-optimized.webp';
import proof5 from '../assets/proofs/proof-5-optimized.webp';
import proof6 from '../assets/proofs/proof-6-optimized.webp';

const proofs = [proof1, proof2, proof3, proof4, proof5, proof6];
const bunnyVideoId = 'f508e553-1ee8-41fe-b05f-224450697ac0';
const bunnyCdnHost = 'https://vz-fda22be4-d2e.b-cdn.net';
const bunnyVideoPoster = `${bunnyCdnHost}/${bunnyVideoId}/thumbnail.jpg`;
const bunnyVideoPlaylist = `${bunnyCdnHost}/${bunnyVideoId}/playlist.m3u8`;
const imageResultItems = proofs.map((src, proofIndex) => ({ type: 'image', src, proofIndex }));
const resultItems = [
  { type: 'video', id: 'video' },
  ...imageResultItems,
];
// As imagens se repetem para sustentar o loop; o player permanece uma instância única.
const loopedResultItems = [...resultItems, ...imageResultItems];
const loopedImageItems = [...imageResultItems, ...imageResultItems];
const benefits = [
  { icon: UsersRound, title: 'Comunidade exclusiva', text: 'Grupo exclusivo com outros criadores, troca de experiências e minha participação respondendo dúvidas sempre que possível.', tone: 'cyan' },
  { icon: ShieldCheck, title: '7 dias de garantia', text: 'Conheça o treinamento e decida se ele é para você.', tone: 'cyan' },
  { icon: Zap, title: 'Acesso imediato', text: 'Com seu acesso liberado na hora, você já pode começar.', tone: 'pink' },
];

const formatTime = (seconds) => {
  const safeSeconds = Number.isFinite(seconds) ? Math.max(0, seconds) : 0;
  const minutes = Math.floor(safeSeconds / 60);
  const remainder = Math.floor(safeSeconds % 60);
  return `${minutes}:${String(remainder).padStart(2, '0')}`;
};

function ResultVideoPlayer({ shouldPause, onActivate, onPlaybackChange }) {
  const videoRef = useRef(null);
  const frameRef = useRef(null);
  const [hasStarted, setHasStarted] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
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
    if (shouldPause) {
      videoRef.current?.pause();
      onPlaybackChange(false);
    }
  }, [onPlaybackChange, shouldPause]);

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
    onActivate();
    video.currentTime = 0;
    video.volume = 1;
    video.muted = false;
    video.play().catch(() => {});
    setHasStarted(true);
    setIsMuted(false);
    onPlaybackChange(true);
  };

  const togglePlayback = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      onActivate();
      video.play().catch(() => {});
      onPlaybackChange(true);
    } else {
      video.pause();
      onPlaybackChange(false);
    }
  };

  const toggleSound = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.muted) onActivate();
    video.muted = !video.muted;
    if (!video.muted) video.volume = 1;
    setIsMuted(video.muted);
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
    } else if (element?.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    } else if (videoRef.current?.webkitEnterFullscreen) {
      videoRef.current.webkitEnterFullscreen();
    }
  };

  return (
    <div ref={frameRef} className="result-card result-video-card">
      <video
        ref={videoRef}
        poster={bunnyVideoPoster}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        onPlay={() => {
          setIsPlaying(true);
          if (hasStarted) onPlaybackChange(true);
        }}
        onPause={() => {
          setIsPlaying(false);
          if (hasStarted) onPlaybackChange(false);
        }}
        onLoadedMetadata={(event) => setDuration(event.currentTarget.duration || 0)}
        onDurationChange={(event) => setDuration(event.currentTarget.duration || 0)}
        onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime || 0)}
      />

      <button
        type="button"
        className="inline-video-click-surface"
        aria-label={isPlaying && hasStarted ? 'Pausar vídeo' : 'Reproduzir vídeo'}
        onClick={hasStarted ? togglePlayback : startWithSound}
      />

      {(!hasStarted || !isPlaying) && (
        <button
          type="button"
          className="featured-video-play result-inline-video-play"
          aria-label={hasStarted ? 'Continuar vídeo' : 'Assistir ao vídeo com áudio desde o início'}
          onClick={hasStarted ? togglePlayback : startWithSound}
        >
          <Play aria-hidden="true" fill="currentColor" />
        </button>
      )}

      <div className={`featured-video-controls result-video-controls${isFullscreen ? ' is-fullscreen' : ''}`}>
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
  );
}

export default function SocialProof({ shouldPause = false, onActivate }) {
  const [isDesktop, setIsDesktop] = useState(() => window.matchMedia('(min-width: 641px)').matches);
  const [isResultVideoPlaying, setIsResultVideoPlaying] = useState(false);
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
  useCarouselActivity(emblaApi, isDesktop && isResultVideoPlaying);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 641px)');
    const updateLayout = (event) => setIsDesktop(event.matches);
    mediaQuery.addEventListener('change', updateLayout);
    return () => mediaQuery.removeEventListener('change', updateLayout);
  }, []);

  const scrollWithArrow = (direction) => {
    if (!emblaApi) return;

    emblaApi.plugins().autoScroll?.stop();
    if (direction === 'prev') emblaApi.scrollPrev(true);
    else emblaApi.scrollNext(true);
    requestAnimationFrame(() => emblaApi.plugins().autoScroll?.play());
  };

  return (
    <section className="results-section px-5 py-20 sm:px-8" id="resultados">
      <div className="mx-auto max-w-[1480px]">
        <div className="results-heading">
          <h2 className="font-display font-black uppercase">Resultados reais com o <span className="gradient-text">TikTok Shop</span></h2>
          <p>Resultados reais que eu já conquistei trabalhando com vídeos.</p>
        </div>

        {!isDesktop && (
          <div className="results-featured-video">
            <ResultVideoPlayer shouldPause={shouldPause} onActivate={onActivate} onPlaybackChange={setIsResultVideoPlaying} />
          </div>
        )}

        <div className="results-carousel-wrap">
          <button type="button" className="carousel-arrow carousel-arrow-prev" aria-label="Resultado anterior" onClick={() => scrollWithArrow('prev')}>
            <ChevronLeft aria-hidden="true" />
          </button>
          <div className="results-embla-viewport" ref={emblaRef}>
            <div className="results-embla-container">
              {(isDesktop ? loopedResultItems : loopedImageItems).map((item, index) => (
                <div className={`results-embla-slide${item.type === 'video' ? ' results-video-slide' : ''}`} key={`${item.id ?? item.src}-${index}`}>
                  {item.type === 'video' ? (
                    <ResultVideoPlayer shouldPause={shouldPause} onActivate={onActivate} onPlaybackChange={setIsResultVideoPlaying} />
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
