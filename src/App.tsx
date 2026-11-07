import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ScrollStory } from "./ScrollStory";
import { annexLinks } from "./ExploreMore";
import { StatisticsRunway } from "./StatisticsRunway";
import { PortfolioPage } from "./PortfolioPage";

function AnnexHeader({ current }: { current: string }) {
  return <header className="annex-header shell"><a className="brand" href="/#annexes">BRAIDSPLACE</a><nav aria-label="Explore the E-Press Kit">
    <a href="/#annexes">EXPLORE MORE</a>{annexLinks.filter((annex) => annex.label !== current).map((annex) => <a href={annex.href} key={annex.href}>{annex.label}</a>)}
  </nav></header>;
}

function AnnexPage({ page }: { page: "film" | "statistiques" | "portfolio" }) {
  const reduceMotion = useReducedMotion();
  const label = annexLinks.find((annex) => annex.page === page)?.label ?? "BACKSTAGE";
  return <motion.div className={page === "film" ? "annex-screen annex-screen--film" : "annex-screen"} initial={reduceMotion ? false : { opacity: 0, x: "-100vw" }} animate={{ opacity: 1, x: 0 }} transition={{ duration: reduceMotion ? 0 : 0.8, ease: [0.22, 1, 0.36, 1] }}>
    <a className="skip-link" href="#contenu">Skip to content</a>
    <AnnexHeader current={label} />
    <main id="contenu" className={page === "film" ? "annex-page annex-page--film" : "annex-page"}>
      {page === "film" && <section className="annex-film" aria-labelledby="annex-film-title">
        <h1 className="sr-only" id="annex-film-title">Live Hair Art film</h1>
        <video src="/videos/braidsplace-couleur.mp4" poster="/videos/braidsplace-couleur-poster.jpg" autoPlay={!reduceMotion} muted loop controls playsInline preload="metadata" aria-label="BRAIDSPLACE color film: hairstyles, models and artistic preparation" />
      </section>}
      {page === "statistiques" && <><h1 className="sr-only">Statistics</h1><StatisticsRunway /></>}
      {page === "portfolio" && <PortfolioPage />}
    </main>
    {page !== "film" && <footer className="site-footer shell"><a href="/#annexes">← Back to Explore More</a><p>BRAIDSPLACE · LIVE HAIR ART</p></footer>}
  </motion.div>;
}

function HomePage() {
  const backgroundVideoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const video = backgroundVideoRef.current;
    if (!video) return;
    video.muted = true;
    video.defaultMuted = true;
    const start = () => {
      if (video.paused) {
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
  return <>
    <a className="skip-link" href="#artiste">Skip to content</a>
    <main id="contenu">
      <div className="home-immersive">
        <div className="home-backdrop" aria-hidden="true"><video ref={backgroundVideoRef} src="/videos/braidsplace-cover.mp4" poster="/videos/braidsplace-cover-poster.jpg" autoPlay muted loop playsInline preload="auto" tabIndex={-1} /></div>
        <ScrollStory />
      </div>
    </main>
    <footer className="site-footer shell"><a className="brand" href="#accueil">BRAIDSPLACE</a><p>Live Hair Art · E-Press Kit</p><a href="#accueil">Back to top ↑</a></footer>
  </>;
}

function App() {
  const page = new URLSearchParams(window.location.search).get("page");
  if (page === "film" || page === "statistiques" || page === "portfolio" || page === "galerie") return <AnnexPage page={page === "galerie" ? "portfolio" : page} />;
  return <HomePage />;
}

export default App;
