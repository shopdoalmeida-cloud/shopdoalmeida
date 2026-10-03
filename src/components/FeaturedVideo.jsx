import { Maximize2, Volume2, X } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

const bunnyLibraryId = '665166';
const bunnyVideoId = '5a2bcc4d-6c3b-414a-ba5d-d64a07129189';
const bunnyPoster = `https://vz-fda22be4-d2e.b-cdn.net/${bunnyVideoId}/thumbnail.jpg`;
const bunnyPreviewUrl = `https://player.mediadelivery.net/embed/${bunnyLibraryId}/${bunnyVideoId}?autoplay=true&muted=true&loop=true&preload=true&playsinline=true&controls=false`;
const bunnyExpandedUrl = `https://player.mediadelivery.net/embed/${bunnyLibraryId}/${bunnyVideoId}?autoplay=true&preload=true&playsinline=true`;

export default function FeaturedVideo({ isVideoOpen, onVideoOpenChange }) {
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

  const openVideo = () => onVideoOpenChange(true);
  const closeVideo = () => onVideoOpenChange(false);

  return (
    <section className="featured-video-section" aria-label="Vídeo em destaque">
      <div className="featured-video-shell">
        <div className="featured-video-frame" style={{ backgroundImage: `url(${bunnyPoster})` }}>
          <iframe
            src={bunnyPreviewUrl}
            title="Prévia do treinamento Algoritmo de Vendas TKS"
            allow="autoplay; fullscreen; picture-in-picture"
            loading="eager"
            tabIndex="-1"
          />
          <button type="button" className="featured-video-expand" aria-haspopup="dialog" aria-label="Ampliar vídeo e assistir com áudio" onClick={openVideo}>
            <span className="featured-video-expand-icon" aria-hidden="true"><Maximize2 /></span>
          </button>
          <button type="button" className="featured-video-sound" aria-haspopup="dialog" onClick={openVideo}>
            <Volume2 aria-hidden="true" />
            <span>Ouvir vídeo</span>
          </button>
        </div>
      </div>

      {isVideoOpen && createPortal(
        <div className="video-modal featured-video-modal" role="presentation" onClick={closeVideo}>
          <div className="featured-video-modal-dialog" role="dialog" aria-modal="true" aria-label="Vídeo em destaque" onClick={(event) => event.stopPropagation()}>
            <button ref={closeButtonRef} type="button" className="video-modal-close" aria-label="Fechar vídeo" onClick={closeVideo}>
              <X aria-hidden="true" />
            </button>
            <iframe
              src={bunnyExpandedUrl}
              title="Algoritmo de Vendas TKS"
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
