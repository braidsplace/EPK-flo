import { motion, useReducedMotion } from "motion/react";

/** Composition adaptée du « Minimalist Hero » de @ravikatiyar162 sur 21st.dev. */
export function MinimalistHairArt({ immersive = false, pinned = false }: { immersive?: boolean; pinned?: boolean }) {
  const reduceMotion = useReducedMotion();
  const transition = { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const };

  return (
    <motion.section
      className={`minimalist-hair${immersive ? " minimalist-hair--immersive" : ""}`}
      id={pinned ? undefined : "artiste"}
      aria-labelledby="minimalist-hair-title"
      initial={reduceMotion || pinned ? false : { opacity: 0, x: "-72vw" }}
      whileInView={reduceMotion || pinned ? undefined : { opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
    >
      <svg className="portrait-filter-defs" aria-hidden="true" focusable="false">
        <defs>
          <filter id="portrait-white-panel" colorInterpolationFilters="sRGB">
            <feColorMatrix
              in="SourceGraphic"
              type="matrix"
              values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  8 0 -8 0 -0.2"
              result="brown-panel-mask"
            />
            <feComposite in="SourceGraphic" in2="brown-panel-mask" operator="out" result="portrait-only" />
            <feFlood floodColor="#fffdf8" result="white" />
            <feComposite in="white" in2="brown-panel-mask" operator="in" result="white-panel" />
            <feMerge><feMergeNode in="portrait-only" /><feMergeNode in="white-panel" /></feMerge>
          </filter>
        </defs>
      </svg>
      <div className="minimalist-hair-header">
        <a className="minimalist-hair-brand" href="#accueil">BRAIDSPLACE</a>
        <nav className="minimalist-hair-nav" aria-label="Explore the E-Press Kit">
          <a href="#accueil">HOME</a>
          <a href="/?page=film">BACKSTAGE</a>
          <a href="/?page=statistiques">STATISTICS</a>
          <a href="/?page=portfolio">PORTFOLIO</a>
          <a href="#parcours">AFRICA TOUR</a>
        </nav>
      </div>

      <motion.div
        className="minimalist-hair-stage"
        initial={reduceMotion ? false : "hidden"}
        animate={pinned ? "visible" : undefined}
        whileInView={reduceMotion || pinned ? undefined : "visible"}
        viewport={{ once: true, amount: 0.15 }}
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08, delayChildren: 0.08 } } }}
      >
        <motion.img
          className="minimalist-hair-portrait"
          src="/images/live-hair-art-portrait.webp"
          alt="Black-and-white portrait of a person with a sculptural hairstyle in front of a tilted white panel."
          loading="eager"
          fetchPriority="high"
          decoding="async"
          variants={{
            hidden: { opacity: 0, x: -28, scale: 0.985 },
            visible: { opacity: 1, x: 0, scale: 1, transition },
          }}
        />
        <motion.div
          className="minimalist-hair-copy"
          variants={{
            hidden: { opacity: 0, x: -18 },
            visible: { opacity: 1, x: 0, transition },
          }}
        >
          <h2 id="minimalist-hair-title">THE ARTIST</h2>
          <p>
            Originally from Réunion Island, I draw inspiration from my roots, my travels and the cultures around me.
          </p>
          <p>
            Through hair art, I seek to tell stories, bring identities into dialogue and push the boundaries of creation.
          </p>
          <p>
            My wish: to share a living art, free and without borders, that brings people together, conveys meaning and stirs emotion.
          </p>
        </motion.div>
      </motion.div>

      <div className="minimalist-hair-footer">
        <span>BRAIDSPLACE · RÉUNION ISLAND</span>
      </div>
    </motion.section>
  );
}
