import { motion, useReducedMotion } from "motion/react";

// Cape Town and Accra: UNGEGN (Accra: 5.52771° N, 0.20001° W).
// Réunion: Réunion Tourism.
// Zanzibar (Unguja, ~6.16° S, 39.20° E): marker offshore Tanzania,
// Dar es Salaam: ~6°51′ S, 39°18′ E (Tanzania Ministry of Education).
// Projected into the same Natural Earth map coordinates as the other stops.
const origin = { place: "Réunion Island", x: 666.5, y: 565.5 } as const;

type TourStop = {
  place: string;
  detail: string;
  date: string;
  x: number;
  y: number;
  labelX: number;
  labelY: number;
  anchor: "start" | "end";
  compact?: boolean;
  leader?: { x: number; y: number };
};

const destinations: TourStop[] = [
  { place: "Cape Town", detail: "International Jazz Festival", date: "March 2027", x: 357.6, y: 679.7, labelX: 325, labelY: 698, anchor: "end" },
  { place: "Zanzibar", detail: "", date: "April 2027", x: 530.7, y: 435.5, labelX: 552, labelY: 397, anchor: "start", compact: true, leader: { x: 546, y: 409 } },
  { place: "Dar es Salaam", detail: "", date: "April 2027", x: 531.5, y: 441.5, labelX: 552, labelY: 487, anchor: "start", compact: true, leader: { x: 546, y: 481 } },
  { place: "Accra", detail: "", date: "May 2027", x: 202.5, y: 334.3, labelX: 180, labelY: 328, anchor: "end" },
];

const route = "M 666.5 565.5 C 620 585, 549 607, 500 625 C 443 651, 401 694, 357.6 679.7 C 425 650, 548 530, 530.7 435.5 L 531.5 441.5 C 440 355, 310 310, 202.5 334.3";

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
                A continuous route connects Réunion Island, Cape Town in March 2027 at the International Jazz Festival, Zanzibar and Dar es Salaam in April 2027, then Accra in May 2027, on a map of Africa.
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
                <text className="tour-map-label-place tour-map-origin-place" x={origin.x} y="602" textAnchor="middle">
                  <tspan x={origin.x}>Réunion</tspan>
                  <tspan x={origin.x} dy="19">Island</tspan>
                </text>
              </motion.g>
              {destinations.map((destination, index) => (
                <motion.g
                  key={destination.place}
                  initial={reduceMotion ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: reduceMotion ? 0 : 0.4, delay: reduceMotion ? 0 : 0.75 + index * 0.6 }}
                >
                  {destination.leader && <line x1={destination.x} y1={destination.y} x2={destination.leader.x} y2={destination.leader.y} stroke="#fffaf1" strokeWidth="1.2" />}
                  <circle className="tour-map-halo" cx={destination.x} cy={destination.y} r={destination.compact ? 4 : 15} />
                  <circle className="tour-map-dot" cx={destination.x} cy={destination.y} r={destination.compact ? 1.5 : 6} />
                  <text className="tour-map-label-place" x={destination.labelX} y={destination.labelY} textAnchor={destination.anchor}>
                    {destination.place}
                  </text>
                  <text className="tour-map-label-detail" x={destination.labelX} y={destination.labelY + 22} textAnchor={destination.anchor}>{destination.date}</text>
                  {destination.detail && <text className="tour-map-label-detail" x={destination.labelX} y={destination.labelY + 44} textAnchor={destination.anchor}>{destination.detail}</text>}
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
                  <p>{destination.date}</p>
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
