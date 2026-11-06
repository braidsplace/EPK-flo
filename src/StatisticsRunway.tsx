import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

const portraits = [
  {
    src: "/images/tableau-rose.webp",
    alt: "Model in a sculptural pink outfit with braided hair extending across the white canvas behind her head.",
    label: "Total views",
    value: "270K+",
    note: "The work travels beyond the frame.",
  },
  {
    src: "/images/tableau-portrait-nb-femme.webp",
    alt: "Woman with a sculptural Afro hairstyle in front of a white canvas.",
    label: "Engagement record",
    value: "7.7K+",
    note: "A living image that invites a response.",
  },
  {
    src: "/images/tableau-portrait-nb-homme.webp",
    alt: "Man with a large sculptural Afro hairstyle in front of a white canvas.",
    label: "Countries reached",
    value: "Réunion Island · France · South Africa · Canada",
    note: "A conversation across places and cultures.",
  },
] as const;

export function StatisticsRunway() {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const portrait = portraits[active];

  return (
    <section className="statistics-runway statistics-portraits" id="statistiques" aria-labelledby="statistics-title">
      <h2 className="sr-only" id="statistics-title">Statistics</h2>
      <div className="statistics-portraits-stage">
        <AnimatePresence mode="wait" initial={false}>
          <motion.article
            key={portrait.src}
            className={`statistics-portrait statistics-portrait--${active}`}
            initial={reduceMotion ? false : { opacity: 0, x: -48 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, x: 48 }}
            transition={{ duration: reduceMotion ? 0 : 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="statistics-portrait-photo">
              <img src={portrait.src} alt={portrait.alt} loading="eager" decoding="async" />
            </div>
            <div className="statistics-portrait-shade" aria-hidden="true" />
            <div className="statistics-portrait-copy">
              <p className="statistics-portrait-eyebrow">BRAIDSPLACE / LIVE HAIR ART</p>
              <p className="statistics-portrait-label">{portrait.label}</p>
              <p className={active === 2 ? "statistics-portrait-value statistics-portrait-value--places" : "statistics-portrait-value statistics-portrait-value--number"}>{portrait.value}</p>
              <p className="statistics-portrait-note">{portrait.note}</p>
            </div>
          </motion.article>
        </AnimatePresence>
        <div className="statistics-portraits-controls" role="group" aria-label="Browse statistics">
          <button type="button" aria-label="Previous statistic" disabled={active === 0} onClick={() => setActive((index) => Math.max(0, index - 1))}>←</button>
          <span aria-live="polite">{active + 1} / {portraits.length}</span>
          <button type="button" aria-label="Next statistic" disabled={active === portraits.length - 1} onClick={() => setActive((index) => Math.min(portraits.length - 1, index + 1))}>→</button>
        </div>
        <p className="sr-only" aria-live="polite">{portrait.label}: {portrait.value}</p>
      </div>
    </section>
  );
}
