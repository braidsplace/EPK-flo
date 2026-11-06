import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";

export function ScrollExpandVideo() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video || reduceMotion) {
      video?.pause();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          void video.play().catch(() => undefined);
        } else {
          video.pause();
        }
      },
      { threshold: 0.25 },
    );
    observer.observe(section);
    return () => {
      observer.disconnect();
      video.pause();
    };
  }, [reduceMotion]);

  return (
    <section className="scroll-video-section" id="film" ref={sectionRef} aria-labelledby="film-title">
      <h2 className="sr-only" id="film-title">Live Hair Art film</h2>
      <video
        ref={videoRef}
        className="scroll-video-fullscreen"
        src="/videos/braidsplace-couleur.mp4"
        poster="/videos/braidsplace-couleur-poster.jpg"
        preload="metadata"
        autoPlay={!reduceMotion}
        playsInline
        muted
        loop
        controls
        aria-label="BRAIDSPLACE color film: hairstyles, models and artistic preparation"
      />
    </section>
  );
}
