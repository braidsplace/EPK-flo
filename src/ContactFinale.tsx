const instagramUrl = "https://www.instagram.com/braidsplace/";

export function ContactFinale() {
  return (
    <section className="contact-finale" aria-labelledby="contact-finale-title">
      <img
        className="contact-finale-image"
        src="/videos/braidsplace-cover-poster.jpg"
        alt="Four models with sculptural braided hairstyles in the Live Hair Art film."
      />
      <div className="contact-finale-content">
        <h2 id="contact-finale-title">CONTACT</h2>
        <p className="contact-finale-invitation">Let's create something alive together.</p>
        <a className="contact-finale-cta" href="mailto:braidsplace.za@gmail.com?subject=Live%20Canvas%20%E2%80%94%20enquiry">GET IN TOUCH <span aria-hidden="true">↗</span></a>
        <div className="contact-finale-details">
          <a href="mailto:braidsplace.za@gmail.com">BRAIDSPLACE.ZA@GMAIL.COM</a>
          <a href="tel:+262693829316">+262 693 82 93 16</a>
          <a href={instagramUrl} target="_blank" rel="noopener noreferrer" aria-label="BRAIDSPLACE on Instagram, opens in a new tab">INSTAGRAM ↗</a>
        </div>
      </div>
    </section>
  );
}
