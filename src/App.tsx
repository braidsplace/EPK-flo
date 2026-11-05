import { useEffect, useRef, useState, type PropsWithChildren } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ScrollStory } from "./ScrollStory";
import { annexLinks } from "./ExploreMore";
import { StatisticsRunway } from "./StatisticsRunway";

function Reveal({ children, className = "" }: PropsWithChildren<{ className?: string }>) {
  const reduceMotion = useReducedMotion();
  return <motion.div className={className} initial={reduceMotion ? false : { opacity: 0 }} whileInView={reduceMotion ? undefined : { opacity: 1 }} viewport={{ once: true, amount: 0.12 }} transition={{ duration: 0.7 }}>{children}</motion.div>;
}

const photographs = [
  { src: "/images/tableau-tresses-graphiques.webp", alt: "Model leaning against a railing, with braids sweeping in large curves in front of a light panel." },
  { src: "/images/tableau-fleur.webp", alt: "Portrait of a model with a voluminous hairstyle, a pink flower and a brightly colored outfit." },
  { src: "/images/tableau-portrait-nb-femme.webp", alt: "Black-and-white portrait of a model with a voluminous Afro hairstyle in front of a light panel." },
  { src: "/images/tableau-portrait-nb-homme.webp", alt: "Black-and-white portrait of a model in a white shirt with a sculptural Afro hairstyle." },
];

function GalleryPage() {
  const reduceMotion = useReducedMotion();
  const galleryRef = useRef<HTMLDivElement>(null);
  const [activePhoto, setActivePhoto] = useState(0);
  const moveGallery = (direction: -1 | 1) => {
    const gallery = galleryRef.current;
    if (!gallery) return;
    const cards = gallery.querySelectorAll<HTMLElement>(".photo-card");
    if (!cards.length) return;
    const next = Math.max(0, Math.min(cards.length - 1, activePhoto + direction));
    gallery.scrollTo({ left: cards[next].offsetLeft - cards[0].offsetLeft, behavior: reduceMotion ? "auto" : "smooth" });
    setActivePhoto(next);
  };
  const updateActivePhoto = () => {
    const gallery = galleryRef.current;
    if (!gallery) return;
    const cards = gallery.querySelectorAll<HTMLElement>(".photo-card");
    if (cards.length < 2) return;
    const step = cards[1].offsetLeft - cards[0].offsetLeft;
    const atEnd = gallery.scrollLeft >= gallery.scrollWidth - gallery.clientWidth - 2;
    setActivePhoto(atEnd ? cards.length - 1 : Math.round(gallery.scrollLeft / step));
  };
  return <section className="visuals section-pad shell" id="images" aria-labelledby="visuals-title">
    <Reveal className="section-heading"><h2 id="visuals-title">A concept:<br /><span>bringing things to life</span></h2><p className="kicker gallery-subtitle">GALLERY</p></Reveal>
    <Reveal className="visual-note"><div className="gallery-controls" aria-label="Gallery controls">
      <button type="button" aria-label="Previous photo" onClick={() => moveGallery(-1)} disabled={activePhoto === 0}>←</button>
      <button type="button" aria-label="Next photo" onClick={() => moveGallery(1)} disabled={activePhoto === photographs.length - 1}>→</button>
    </div><div className="photo-grid" ref={galleryRef} role="region" aria-label="Live Hair Art photographs" tabIndex={0} onScroll={updateActivePhoto}>
      {photographs.map((photo) => <figure className="photo-card" key={photo.src}><img src={photo.src} alt={photo.alt} loading="lazy" decoding="async" /></figure>)}
    </div></Reveal>
  </section>;
}

function AnnexHeader({ current }: { current: string }) {
  return <header className="annex-header shell"><a className="brand" href="/#annexes">BRAIDSPLACE</a><nav aria-label="Explore the E-Press Kit">
    <a href="/#annexes">EXPLORE MORE</a>{annexLinks.filter((annex) => annex.label !== current).map((annex) => <a href={annex.href} key={annex.href}>{annex.label}</a>)}
  </nav></header>;
}

function AnnexPage({ page }: { page: "film" | "galerie" | "statistiques" }) {
  const reduceMotion = useReducedMotion();
  const label = annexLinks.find((annex) => annex.page === page)?.label ?? "BACKSTAGE";
  return <motion.div className="annex-screen" initial={reduceMotion ? false : { opacity: 0, x: "-100vw" }} animate={{ opacity: 1, x: 0 }} transition={{ duration: reduceMotion ? 0 : 0.8, ease: [0.22, 1, 0.36, 1] }}>
    <a className="skip-link" href="#contenu">Skip to content</a>
    <AnnexHeader current={label} />
    <main id="contenu" className="annex-page">
      {page === "film" && <section className="annex-film shell" aria-labelledby="annex-film-title">
        <p className="kicker">BRAIDSPLACE / BACKSTAGE</p><h1 id="annex-film-title">Live Hair Art</h1>
        <video src="/videos/braidsplace-couleur.mp4" poster="/videos/braidsplace-couleur-poster.jpg" controls playsInline preload="metadata" aria-label="BRAIDSPLACE color film: hairstyles, models and artistic preparation" />
      </section>}
      {page === "galerie" && <><h1 className="sr-only">Gallery</h1><GalleryPage /></>}
      {page === "statistiques" && <><h1 className="sr-only">Statistics</h1><StatisticsRunway /></>}
    </main>
    <footer className="site-footer shell"><a href="/#annexes">← Back to Explore More</a><p>BRAIDSPLACE · LIVE HAIR ART</p></footer>
  </motion.div>;
}

function HomePage() {
  const backgroundVideoRef = useRef<HTMLVideoElement>(null);
  const [backgroundVideoPlaying, setBackgroundVideoPlaying] = useState(false);
  const [backgroundVideoError, setBackgroundVideoError] = useState(false);
  const userPausedVideo = useRef(false);
  useEffect(() => {
    const video = backgroundVideoRef.current;
    if (!video) return;
    video.muted = true;
    video.defaultMuted = true;
    const start = () => {
      if (!userPausedVideo.current && video.paused) {
        void video.play().catch(() => {
          // Browsers may require a user gesture; the play control remains available.
        });
      }
    };
    start();
    const resume = () => { if (!document.hidden) start(); };
    document.addEventListener("visibilitychange", resume);
    window.addEventListener("pageshow", start);
    video.addEventListener("canplay", start);
    window.addEventListener("pointerdown", start, { once: true });
    window.addEventListener("keydown", start, { once: true });
    return () => {
      document.removeEventListener("visibilitychange", resume);
      window.removeEventListener("pageshow", start);
      video.removeEventListener("canplay", start);
      window.removeEventListener("pointerdown", start);
      window.removeEventListener("keydown", start);
    };
  }, []);
  const toggleBackgroundVideo = () => {
    const video = backgroundVideoRef.current;
    if (!video) return;
    if (video.paused) {
      userPausedVideo.current = false;
      setBackgroundVideoError(false);
      void video.play().catch(() => setBackgroundVideoError(true));
    } else {
      userPausedVideo.current = true;
      video.pause();
    }
  };
  return <>
    <a className="skip-link" href="#artiste">Skip to content</a>
    <main id="contenu">
      <div className="home-immersive">
        <div className="home-backdrop" aria-hidden="true"><video ref={backgroundVideoRef} src="/videos/braidsplace-cover.mp4" poster="/videos/braidsplace-cover-poster.jpg" autoPlay muted loop playsInline preload="auto" tabIndex={-1} onPlaying={() => { setBackgroundVideoPlaying(true); setBackgroundVideoError(false); }} onPause={() => setBackgroundVideoPlaying(false)} onError={() => setBackgroundVideoError(true)} /></div>
        <ScrollStory />
      </div>
    </main>
    <button className="background-video-toggle" type="button" onClick={toggleBackgroundVideo} aria-label={backgroundVideoPlaying ? "Pause background video" : "Play background video"}>{backgroundVideoPlaying ? "Pause film" : backgroundVideoError ? "Retry film" : "Play film"}</button>
    <footer className="site-footer shell"><a className="brand" href="#accueil">BRAIDSPLACE</a><p>Live Hair Art · E-Press Kit</p><a href="#accueil">Back to top ↑</a></footer>
  </>;
}

function App() {
  const page = new URLSearchParams(window.location.search).get("page");
  if (page === "film" || page === "galerie" || page === "statistiques") return <AnnexPage page={page} />;
  return <HomePage />;
}

export default App;
