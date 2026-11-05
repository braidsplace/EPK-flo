import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import { MinimalistHairArt } from "./MinimalistHairArt";
import { AfricaTour } from "./AfricaTour";
import { ExploreMore } from "./ExploreMore";
import { ContactFinale } from "./ContactFinale";

const messages = [
  <>Welcome to <em>Flow’s artistic world.</em></>,
  <>Living <em>tableaux.</em></>,
  <>A desire to pay tribute and <em>break conventions.</em></>,
  <><em>Live Canvas</em>, a project by BRAIDSPLACE.</>,
];

const slide = {
  enter: { opacity: 0, x: "-100%" },
  center: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: "100%" },
};
const still = { enter: { opacity: 0 }, center: { opacity: 1 }, exit: { opacity: 0 } };
const artistStage = messages.length + 1;
const tourStage = artistStage + 1;
const exploreStage = tourStage + 1;
const contactStage = exploreStage + 1;
const stageCount = contactStage + 1;
const anchorStages = { artiste: artistStage, parcours: tourStage, annexes: exploreStage, contact: contactStage } as const;

function stageFromHash() {
  return anchorStages[window.location.hash.slice(1) as keyof typeof anchorStages] ?? 0;
}

export function ScrollStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const initialStage = useRef(stageFromHash()).current;
  const deepLinkPending = useRef(initialStage !== 0);
  const [active, setActive] = useState(initialStage);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    if (deepLinkPending.current) return;
    setActive(Math.max(0, Math.min(contactStage, Math.floor(progress * stageCount))));
  });

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    let lastInputAt = 0;
    let blockedUntil = 0;
    let accumulated = 0;
    let gestureUsed = false;
    let touchY: number | null = null;

    // Trackpad momentum belongs to the same gesture: never queue another slide.
    const advance = (delta: number, event: WheelEvent | TouchEvent) => {
      const rect = section.getBoundingClientRect();
      const travel = section.offsetHeight - window.innerHeight;
      if (travel <= 0 || rect.top > 1 || rect.bottom < window.innerHeight - 1) return;
      const position = Math.max(0, Math.min(travel, -rect.top));
      const current = Math.min(contactStage, Math.floor(position / travel * stageCount));
      const direction = Math.sign(delta);
      if (!direction) return;
      const now = performance.now();
      if (event instanceof WheelEvent && now - lastInputAt > 240) {
        accumulated = 0;
        gestureUsed = false;
      }
      lastInputAt = now;
      if ((current === 0 && direction < 0) || (current === contactStage && direction > 0)) {
        if (gestureUsed || now < blockedUntil) event.preventDefault();
        return;
      }
      event.preventDefault();
      if (gestureUsed || now < blockedUntil) return;
      accumulated = Math.sign(accumulated) === direction ? accumulated + delta : delta;
      if (Math.abs(accumulated) < 100) return;
      gestureUsed = true;
      accumulated = 0;
      blockedUntil = now + (reduceMotion ? 200 : 1500);
      const next = current + direction;
      const top = window.scrollY + rect.top + (next + 0.5) / stageCount * travel;
      window.scrollTo({ top, behavior: "instant" });
    };
    const onWheel = (event: WheelEvent) => {
      if (event.ctrlKey || Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;
      const unit = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? window.innerHeight : 1;
      advance(event.deltaY * unit, event);
    };
    const onTouchStart = (event: TouchEvent) => {
      touchY = event.touches.length === 1 ? event.touches[0].clientY : null;
      accumulated = 0;
      gestureUsed = false;
    };
    const onTouchMove = (event: TouchEvent) => {
      if (touchY === null || event.touches.length !== 1) return;
      const y = event.touches[0].clientY;
      const delta = touchY - y;
      touchY = y;
      advance(delta, event);
    };
    section.addEventListener("wheel", onWheel, { passive: false });
    section.addEventListener("touchstart", onTouchStart, { passive: true });
    section.addEventListener("touchmove", onTouchMove, { passive: false });
    return () => {
      section.removeEventListener("wheel", onWheel);
      section.removeEventListener("touchstart", onTouchStart);
      section.removeEventListener("touchmove", onTouchMove);
    };
  }, [reduceMotion]);

  useEffect(() => {
    if (!deepLinkPending.current) return;
    const frame = requestAnimationFrame(() => {
      deepLinkPending.current = false;
      document.getElementById(window.location.hash.slice(1))?.scrollIntoView({ behavior: "auto", block: "start" });
      setActive(stageFromHash());
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <section className="scroll-story" id="accueil" ref={sectionRef} aria-labelledby="story-title">
      <h1 className="sr-only" id="story-title">BRAIDSPLACE — Live Hair Art</h1>
      <ol className="sr-only" aria-label="Introduction">
        <li>BRAIDSPLACE — beyond hairstyling, beyond an exhibition.</li>
        {messages.map((message, index) => <li key={index}>{message}</li>)}
      </ol>
      <span className="scroll-story-artist-anchor" id="artiste" tabIndex={-1} aria-label="The Artist" />
      <span className="scroll-story-tour-anchor" id="parcours" tabIndex={-1} aria-label="Africa Tour" />
      <span className="scroll-story-explore-anchor" id="annexes" tabIndex={-1} aria-label="Explore more" />
      <span className="scroll-story-contact-anchor" id="contact" tabIndex={-1} aria-label="Contact" />
      <div className="scroll-story-stage">
        <AnimatePresence mode="sync" initial={initialStage !== 0}>
          {active === 0 ? (
            <motion.div className="video-hero-content scroll-story-content" key="cover" variants={reduceMotion ? still : slide} initial="enter" animate="center" exit="exit" transition={{ duration: reduceMotion ? 0 : 0.9, ease: [0.22, 1, 0.36, 1] }}>
              <p className="video-hero-stamp">THIS IS</p>
              <p className="scroll-story-brand">BRAIDSPLACE</p>
              <p className="video-hero-manifesto">
                <span>BEYOND HAIRSTYLING. BEYOND AN EXHIBITION.</span>
                <span>A MEETING OF <mark>ARTISTIC WORLDS.</mark></span>
                <span><mark>A LIVING EXPERIENCE WHERE ART COMES TO LIFE.</mark></span>
                <span>ART THAT IS NOT MERELY SEEN, BUT EXPERIENCED.</span>
              </p>
              <a className="video-hero-link" href="#artiste">LEARN MORE</a>
            </motion.div>
          ) : active === artistStage ? (
            <motion.div className="scroll-story-chapter" key="artist" variants={reduceMotion ? still : slide} initial="enter" animate="center" exit="exit" transition={{ duration: reduceMotion ? 0 : 1, ease: [0.22, 1, 0.36, 1] }}>
              <MinimalistHairArt immersive pinned />
            </motion.div>
          ) : active === tourStage ? (
            <motion.div className="scroll-story-chapter" key="tour" variants={reduceMotion ? still : slide} initial="enter" animate="center" exit="exit" transition={{ duration: reduceMotion ? 0 : 1, ease: [0.22, 1, 0.36, 1] }}>
              <AfricaTour pinned />
            </motion.div>
          ) : active === exploreStage ? (
            <motion.div className="scroll-story-chapter" key="explore" variants={reduceMotion ? still : slide} initial="enter" animate="center" exit="exit" transition={{ duration: reduceMotion ? 0 : 1, ease: [0.22, 1, 0.36, 1] }}>
              <ExploreMore />
            </motion.div>
          ) : active === contactStage ? (
            <motion.div className="scroll-story-chapter" key="contact" variants={reduceMotion ? still : slide} initial="enter" animate="center" exit="exit" transition={{ duration: reduceMotion ? 0 : 1, ease: [0.22, 1, 0.36, 1] }}>
              <ContactFinale />
            </motion.div>
          ) : (
            <motion.div className="scroll-story-message" key={active} variants={reduceMotion ? still : slide} initial="enter" animate="center" exit="exit" transition={{ duration: reduceMotion ? 0 : 0.9, ease: [0.22, 1, 0.36, 1] }}>
              <p className="scroll-story-eyebrow">BRAIDSPLACE / LIVE HAIR ART</p>
              <h2>{messages[active - 1]}</h2>
              <span className="scroll-story-count">0{active + 1} / 0{messages.length + 1}</span>
            </motion.div>
          )}
        </AnimatePresence>
        {active < artistStage && <div className="scroll-story-cue" aria-hidden="true"><span>SCROLL TO EXPLORE</span><span>↓</span></div>}
      </div>
    </section>
  );
}
