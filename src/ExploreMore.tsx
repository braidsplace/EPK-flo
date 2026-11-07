import { motion, useReducedMotion } from "motion/react";

export const annexLinks = [
  { page: "film", href: "/?page=film", label: "BACKSTAGE" },
  { page: "galerie", href: "/?page=galerie", label: "GALLERY" },
  { page: "statistiques", href: "/?page=statistiques", label: "STATISTICS" },
  { page: "portfolio", href: "/?page=portfolio", label: "PORTFOLIO" },
] as const;

const linkVariants = {
  hidden: { opacity: 0, x: -70 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
};

export function ExploreMore() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="explore-more" aria-labelledby="explore-more-title">
      <motion.h2
        className="explore-more-title"
        id="explore-more-title"
        initial={reduceMotion ? false : "hidden"}
        animate="visible"
        variants={linkVariants}
      >Explore More</motion.h2>
      <motion.nav
        className="explore-more-links"
        aria-label="Explore more"
        initial={reduceMotion ? false : "hidden"}
        animate="visible"
        variants={{ hidden: {}, visible: { transition: { staggerChildren: reduceMotion ? 0 : 0.12, delayChildren: reduceMotion ? 0 : 0.15 } } }}
      >
        {annexLinks.map((annex) => (
          <motion.a key={annex.href} href={annex.href} variants={reduceMotion ? undefined : linkVariants}>
            {annex.label}
          </motion.a>
        ))}
      </motion.nav>
    </section>
  );
}
