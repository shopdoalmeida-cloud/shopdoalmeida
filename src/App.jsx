import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import Hero from './components/Hero';

const loadModulesCarousel = () => import('./components/ModulesCarousel');
const loadFeaturedVideo = () => import('./components/FeaturedVideo');
const loadSocialProof = () => import('./components/SocialProof');
const loadAboutMe = () => import('./components/AboutMe');
const loadFinalSection = () => import('./components/FinalSection');

const ModulesCarousel = lazy(loadModulesCarousel);
const FeaturedVideo = lazy(loadFeaturedVideo);
const SocialProof = lazy(loadSocialProof);
const AboutMe = lazy(loadAboutMe);
const FinalSection = lazy(loadFinalSection);

function DeferredSection({ children, minHeight, rootMargin = '650px 0px' }) {
  const sectionRef = useRef(null);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    const element = sectionRef.current;
    if (!element || shouldRender) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldRender(true);
          observer.disconnect();
        }
      },
      { rootMargin },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [rootMargin, shouldRender]);

  return (
    <div ref={sectionRef} style={{ minHeight }}>
      {shouldRender && <Suspense fallback={null}>{children}</Suspense>}
    </div>
  );
}
import instagramIcon from './assets/icone/instagran-optimized.webp';
import kwaiIcon from './assets/icone/kwai.webp';
import shopeeIcon from './assets/icone/shoppe.webp';
import tiktokIcon from './assets/icone/tiktok-optimized.webp';
import youtubeIcon from './assets/icone/youtube-optimized.webp';

const socialLinks = [
  { label: 'Instagram', href: 'https://www.instagram.com/almeidaoficial016?stkn=eWNxdG05OTMydGt3&utm_source=qr', icon: instagramIcon },
  { label: 'TikTok', href: 'https://www.tiktok.com/@shopdoalmeida', icon: tiktokIcon },
  { label: 'YouTube', href: 'https://youtube.com/@shopdoalmeida?si=MZBLB8xwa387SJ55', icon: youtubeIcon },
  { label: 'Kwai', href: 'https://k.kwai.com/u/@shopdoalmeida/FCx8Ddgo', icon: kwaiIcon },
  { label: 'Shopee', href: 'https://br.shp.ee/z8n3yv9z?fromSource=copy_link&smtt=0.0.9', icon: shopeeIcon },
];

function App() {
  const [activeInlineVideo, setActiveInlineVideo] = useState(null);
  return (
    <main className="min-h-screen bg-[#050507] text-[#f5f7fa]">
      <Hero />
      <DeferredSection minHeight="clamp(360px, 67vw, 860px)" rootMargin="300px 0px">
        <FeaturedVideo
          shouldPause={activeInlineVideo !== null && activeInlineVideo !== 'featured'}
          onActivate={() => setActiveInlineVideo('featured')}
        />
      </DeferredSection>
      <DeferredSection minHeight="760px"><ModulesCarousel /></DeferredSection>
      <DeferredSection minHeight="760px">
        <SocialProof
          shouldPause={activeInlineVideo !== null && activeInlineVideo !== 'results'}
          onActivate={() => setActiveInlineVideo('results')}
        />
      </DeferredSection>
      <DeferredSection minHeight="1180px">
        <AboutMe
          shouldPause={activeInlineVideo !== null && activeInlineVideo !== 'about'}
          onActivate={() => setActiveInlineVideo('about')}
        />
      </DeferredSection>
      <DeferredSection minHeight="680px"><FinalSection /></DeferredSection>
      
      <footer className="border-t border-white/5 px-4 py-8 text-center text-xs text-gray-600">
        <div className="mb-5 flex items-center justify-center gap-3">
          {socialLinks.map(({ label, href, icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              title={label}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] transition hover:border-cyan-400/60 hover:bg-cyan-400/10"
            >
              <img src={icon} alt="" width="64" height="64" loading="lazy" decoding="async" className="h-6 w-6 object-contain" />
            </a>
          ))}
        </div>
        <p>© 2026 Algoritmo de Vendas TKS. Todos os direitos reservados.</p>
      </footer>
    </main>
  );
}

export default App;
