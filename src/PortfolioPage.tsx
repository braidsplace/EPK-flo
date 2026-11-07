import { motion, useReducedMotion } from "motion/react";

type Work = { title: string; details: string; images: string[] };
type Category = { id: string; title: string; works: Work[] };

// Text and media are transcribed from Flo's Squarespace portfolio, 7 November 2026.
// Keep credits and project descriptions editable here. Publication rights for these
// additional portfolio images are pending Flo's confirmation.
const categories: Category[] = [
  { id: "film-television", title: "Film & television", works: [
    { title: "Les Rivières", details: "TV production · Hair stylist · Antenne Réunion Production · 21-day shoot · 2025", images: ["/portfolio/01.png", "/portfolio/02.png", "/portfolio/03.jpg", "/portfolio/04.png"] },
    { title: "Stuffed Things Don’t Scream", details: "Short film · Hair stylist and assistant makeup · 48 Hour Film Project, Seattle · Best Makeup (2nd) · 2025", images: ["/portfolio/05.png", "/portfolio/06.png", "/portfolio/07.jpg", "/portfolio/08.png", "/portfolio/09.png", "/portfolio/10.jpg", "/portfolio/11.png", "/portfolio/12.jpg"] },
  ] },
  { id: "music-videos", title: "Music videos", works: [
    { title: "Bioz Visualiser", details: "Réunion Island · Hair direction and hairstyling · 2025", images: ["/portfolio/13.jpg", "/portfolio/14.jpg"] },
    { title: "Kalipsxau — Sans parler (ft. Were Vana)", details: "Réunion Island · Nirvana Studio · Directed by Jutsu Films · Hair for Were Vana", images: ["/portfolio/15.png"] },
    { title: "Maud Elka — M’en aller (ft. Léa Churros)", details: "Réunion Island · Blue Mountains · Directed by Guy Fonkui · Hair stylist · 2025", images: ["/portfolio/16.png"] },
    { title: "Rashel — Mon ker y tremb", details: "Réunion Island · ELVTN Music · Directed by Hulk Recordz · Hair direction and hairstyling", images: ["/portfolio/17.png"] },
  ] },
  { id: "commercial-advertising-shoots", title: "Commercial & advertising", works: [
    { title: "Agency work", details: "Réunion Island · Hair direction and hairstyling · 2025", images: ["/portfolio/18.png", "/portfolio/19.png", "/portfolio/20.png", "/portfolio/21.png"] },
    { title: "PARDON!", details: "Creative hairstyles campaign · Hair direction and hairstyling · 2025", images: ["/portfolio/22.jpg", "/portfolio/23.jpg", "/portfolio/24.jpg", "/portfolio/25.png", "/portfolio/26.jpg"] },
  ] },
  { id: "live-performance", title: "Live performance", works: [
    { title: "Ms. Lauryn Hill & The Fugees", details: "Paris Accor Arena · Assistant hairstylist for Fesa Nu · 2024", images: ["/portfolio/27.jpg", "/portfolio/28.jpg"] },
    { title: "Spoken Priestess · Asake premiere", details: "Johannesburg · Hair direction and hairstyling", images: ["/portfolio/29.jpg", "/portfolio/30.jpg"] },
  ] },
  { id: "fashion-and-runway", title: "Fashion & runway", works: [
    { title: "Maison Christian Manzala", details: "Paris runway · Creative hair direction and hairstyling", images: ["/portfolio/31.jpg", "/portfolio/32.jpg", "/portfolio/33.jpg", "/portfolio/34.jpg"] },
    { title: "Wild runway show at the Louvre", details: "Hair creator and model · 2024", images: ["/portfolio/35.jpg", "/portfolio/36.jpg"] },
    { title: "MAXHOSA Fashion Week", details: "Paris · Hairstylist · 2024", images: ["/portfolio/37.jpg", "/portfolio/38.jpg"] },
    { title: "Afrovibes · Braids show", details: "Event creator, hair director and hairstylist", images: ["/portfolio/39.jpg", "/portfolio/40.jpg", "/portfolio/41.jpg", "/portfolio/42.jpg"] },
    { title: "ORIGIN", details: "Theatre production · Producer, playwright, director and hairstylist", images: ["/portfolio/43.jpg", "/portfolio/44.jpg", "/portfolio/45.jpg"] },
  ] },
  { id: "personal-hair-direction", title: "Personal hair direction", works: [
    { title: "Living Hair Art", details: "Selected creations from the E-Press Kit gallery", images: ["/images/tableau-tresses-graphiques.webp", "/images/tableau-fleur.webp", "/images/tableau-portrait-nb-femme.webp", "/images/tableau-portrait-nb-homme.webp"] },
    { title: "BIOZ", details: "Artist artwork shoot · Hair direction and hairstyling · 2025", images: ["/portfolio/46.jpg", "/portfolio/47.jpg"] },
    { title: "MARSHALL", details: "Artist artwork shoot · Creative hair direction and hairstyling · 2024", images: ["/portfolio/48.jpg", "/portfolio/49.jpg"] },
    { title: "Collaboration", details: "Hairstyling and hair direction · 2024", images: ["/portfolio/50.jpg", "/portfolio/51.jpg", "/portfolio/52.jpg", "/portfolio/53.jpg", "/portfolio/54.jpg", "/portfolio/55.jpg", "/portfolio/56.png", "/portfolio/57.jpg", "/portfolio/58.jpg", "/portfolio/59.jpg"] },
    { title: "My creative project", details: "Paris · Creative direction and hairstyling · 2024", images: ["/portfolio/60.jpg", "/portfolio/61.jpg", "/portfolio/62.jpg", "/portfolio/63.jpg", "/portfolio/64.jpg", "/portfolio/65.jpg"] },
    { title: "CLA collaboration", details: "Creative hairstylist · 2024", images: ["/portfolio/66.jpg", "/portfolio/67.jpg"] },
  ] },
];

export function PortfolioPage() {
  const reduceMotion = useReducedMotion();
  return <div className="portfolio-page">
    <section className="portfolio-hero shell" aria-labelledby="portfolio-title">
      <div className="portfolio-hero-main"><div><p className="portfolio-eyebrow">FLOW · BRAIDSPLACE</p>
      <h1 id="portfolio-title">Portfolio<span>On set & artistic hairstylist</span></h1>
      <p className="portfolio-intro">I began with a passion for creating with hair. Through creative shoots, I naturally moved toward on-set work. I didn’t take the usual route, but film environments feel like the direction I’m growing into: where image, precision and collaboration matter most.</p></div>
      <img className="portfolio-hero-image" src="/portfolio/cover.jpg" alt="Sculptural braided hairstyle worn at a live event; photograph credited in the image to Lan Shin Cédric" /></div>
      <nav className="portfolio-index" aria-label="Portfolio categories">{categories.map(category => <a key={category.id} href={`#${category.id}`}>{category.title}<span aria-hidden="true">↗</span></a>)}</nav>
    </section>
    {categories.map((category, ci) => <section className="portfolio-section" id={category.id} key={category.id} aria-labelledby={`${category.id}-title`}>
      <div className="shell"><div className="portfolio-section-heading"><span>{String(ci + 1).padStart(2, "0")} / 06</span><h2 id={`${category.id}-title`}>{category.title}</h2></div>
        <div className="portfolio-works">{category.works.map((work, wi) => <motion.article className="portfolio-work" key={work.title} initial={reduceMotion ? false : { opacity: 0, y: 28 }} whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.55 }}>
          <div className="portfolio-work-copy"><span>{String(wi + 1).padStart(2, "0")}</span><h3>{work.title}</h3><p>{work.details}</p></div>
          <div className="portfolio-work-images" aria-label={`${work.title} images`}>{work.images.map((image) => <img key={image} src={image} alt="" loading="lazy" decoding="async" />)}</div>
        </motion.article>)}</div>
      </div>
    </section>)}
    <div className="portfolio-end shell"><a href="https://www.instagram.com/braidsplace/" target="_blank" rel="noopener noreferrer">More creations on Instagram ↗</a><a href="/#contact">Get in touch ↗</a></div>
  </div>;
}
