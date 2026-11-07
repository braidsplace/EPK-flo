import { motion, useReducedMotion } from "motion/react";

// Cape Town: UNGEGN/SAGNS; Johannesburg: Statistics South Africa;
// Tanzania: Natural Earth country label point. Réunion: 20°53′ S, 55°31′ E
// (Réunion Tourism). Projected onto africa-tour-map.svg.
const origin = { place: "Réunion Island", x: 666.5, y: 565.5 } as const;

const destinations = [
  { place: "Cape Town", detail: "International Jazz Festival", x: 357.6, y: 679.7, labelX: 325, labelY: 716, anchor: "end" },
  { place: "Johannesburg", detail: "", x: 437.2, y: 611.2, labelX: 458, labelY: 619, anchor: "start" },
  { place: "Tanzania", detail: "", x: 494.3, y: 432.1, labelX: 518, labelY: 438, anchor: "start" },
] as const;

const route = "M 666.5 565.5 C 620 585, 549 607, 500 625 C 443 651, 401 694, 357.6 679.7 C 388 671, 415 641, 437.2 611.2 C 466 566, 487 496, 494.3 432.1";

export function AfricaTour({ pinned = false }: { pinned?: boolean }) {
  const reduceMotion = useReducedMotion();

  return (
    <section className={`journey journey--immersive section-pad${pinned ? " journey--pinned" : ""}`} id={pinned ? undefined : "parcours"} aria-labelledby="journey-title">
      <motion.div
        className="shell tour-panel"
        initial={reduceMotion || pinned ? false : { opacity: 0, x: "-35vw" }}
        whileInView={reduceMotion || pinned ? undefined : { opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.12 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="tour-heading">
          <p className="kicker">BRAIDSPLACE / LIVE HAIR ART</p>
          <h2 id="journey-title">Africa Tour</h2>
        </div>

        <div className="tour-layout">
          <div className="tour-map-frame">
            <svg
              className="tour-map"
              viewBox="0 0 700 760"
              role="img"
              aria-labelledby="tour-map-title tour-map-description"
            >
              <title id="tour-map-title">BRAIDSPLACE tour route across Africa</title>
              <desc id="tour-map-description">
                A continuous route connects Réunion Island, Cape Town at the International Jazz Festival, Johannesburg and Tanzania on a map of Africa.
              </desc>
              <image href="/images/africa-tour-map-transparent.svg" width="700" height="760" />
              <path className="tour-route-guide" d={route} />
              <motion.path
                className="tour-route-line"
                d={route}
                initial={reduceMotion ? false : { pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: reduceMotion ? 0 : 2.1, delay: reduceMotion ? 0 : 0.2, ease: [0.45, 0, 0.2, 1] }}
              />
              <motion.g
                initial={reduceMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: reduceMotion ? 0 : 0.5, delay: reduceMotion ? 0 : 0.2 }}
              >
                <circle className="tour-map-origin-ring" cx={origin.x} cy={origin.y} r="15" />
                <circle className="tour-map-dot" cx={origin.x} cy={origin.y} r="6" />
                <text className="tour-map-label-place tour-map-origin-place" x="645" y="540" textAnchor="end">{origin.place}</text>
              </motion.g>
              {destinations.map((destination, index) => (
                <motion.g
                  key={destination.place}
                  initial={reduceMotion ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: reduceMotion ? 0 : 0.4, delay: reduceMotion ? 0 : 0.75 + index * 0.6 }}
                >
                  <circle className="tour-map-halo" cx={destination.x} cy={destination.y} r="15" />
                  <circle className="tour-map-dot" cx={destination.x} cy={destination.y} r="6" />
                  <text className="tour-map-label-place" x={destination.labelX} y={destination.labelY} textAnchor={destination.anchor}>
                    {destination.place}
                  </text>
                  {destination.detail && <text className="tour-map-label-detail" x={destination.labelX} y={destination.labelY + 22} textAnchor={destination.anchor}>{destination.detail}</text>}
                </motion.g>
              ))}
            </svg>
          </div>

          <ol className="tour-stops" aria-label="Places on the tour map">
            <li className="tour-stop">
              <span className="tour-stop-mark" aria-hidden="true" />
              <h3>{origin.place}</h3>
            </li>
            {destinations.map((destination) => (
              <li className="tour-stop" key={destination.place}>
                <span className="tour-stop-mark" aria-hidden="true" />
                <div>
                  <h3>{destination.place}</h3>
                  {destination.detail && <p>{destination.detail}</p>}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </motion.div>
    </section>
  );
}
