import { ArrowRight, Maximize2, Minimize2, Pause, Play, Volume2, VolumeX } from 'lucide-react';
import Hls from 'hls.js';
import { useEffect, useRef, useState } from 'react';

const bunnyVideoId = '5a2bcc4d-6c3b-414a-ba5d-d64a07129189';
const bunnyCdnHost = 'https://vz-fda22be4-d2e.b-cdn.net';
const bunnyPoster = `${bunnyCdnHost}/${bunnyVideoId}/thumbnail.jpg`;
const bunnyPlaylist = `${bunnyCdnHost}/${bunnyVideoId}/playlist.m3u8`;
const checkoutUrl = 'https://pay.kiwify.com.br/fxhc0Y8';

const formatTime = (seconds) => {
  const safeSeconds = Number.isFinite(seconds) ? Math.max(0, seconds) : 0;
  const minutes = Math.floor(safeSeconds / 60);
  const remainder = Math.floor(safeSeconds % 60);
  return `${minutes}:${String(remainder).padStart(2, '0')}`;
};

export default function FeaturedVideo({ shouldPause = false, onActivate }) {
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
      video.src = bunnyPlaylist;
      return undefined;
    }

    if (!Hls.isSupported()) return undefined;
    const hls = new Hls({ capLevelToPlayerSize: true });
    hls.loadSource(bunnyPlaylist);
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
    <section className="featured-video-section" aria-labelledby="featured-video-title">
      <div className="featured-video-shell">
        <header className="featured-video-heading">
          <span className="featured-video-prompt">APERTE O PLAY</span>
          <h2 id="featured-video-title">Assista ao vídeo e descubra como funciona</h2>
        </header>

        <div ref={frameRef} className="featured-video-frame">
          <video
            ref={videoRef}
            poster={bunnyPoster}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
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

          {(!hasStarted || !isPlaying) && (
            <button
              type="button"
              className="featured-video-play"
              aria-label={hasStarted ? 'Continuar vídeo' : 'Assistir vídeo com áudio desde o início'}
              onClick={hasStarted ? togglePlayback : startWithSound}
            >
              <Play aria-hidden="true" fill="currentColor" />
            </button>
          )}

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

        <div className="featured-video-offer">
          <span>ALGORITMO DE VENDAS TKS</span>
          <a href={checkoutUrl}>
            <span>COMECE AGORA</span>
            <ArrowRight aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
