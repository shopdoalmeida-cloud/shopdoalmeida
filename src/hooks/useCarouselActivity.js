import { useEffect } from 'react';

/**
 * Hook otimizado para gerenciar a pausa do carrossel apenas quando necessário.
 * 
 * O plugin embla-carousel-auto-scroll já gerencia nativamente:
 * - Pausa quando a aba do navegador está em segundo plano.
 * - Respeita a preferência do usuário por movimento reduzido.
 * - Pausa ao interagir (se configurado com stopOnInteraction/stopOnMouseEnter).
 * 
 * Este hook entra em ação APENAS para pausar o carrossel quando um modal 
 * (como o de vídeo) está aberto sobre ele.
 */
export default function useCarouselActivity(emblaApi, isPaused) {
  useEffect(() => {
    if (!emblaApi) return;

    const autoScroll = emblaApi.plugins().autoScroll;
    if (!autoScroll) return;

    if (isPaused) {
      autoScroll.stop();
    } else {
      // Retoma a rolagem apenas se não estiver tocando, evitando resets desnecessários
      if (!autoScroll.isPlaying()) {
        autoScroll.play();
      }
    }
  }, [emblaApi, isPaused]);
}