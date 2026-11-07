import { FlowButton } from "./flow-button";
import HeroVideo from "./hero-video";
import HeroTagline from "./hero-tagline";
import styles from "./ink-orbit-hero.module.css";

export default function InkOrbitHero() {
  return (
    <section id="main-content" className={styles.root} aria-labelledby="hero-title">
      <div className={styles.panel}>
        <div className={styles.copy}>
          <div className={styles.band}>
            <p className={styles.label}>Engineering-led solutions · Lagos, Nigeria</p>
            <p className={styles.leadIn}>Built for the long run.</p>
            <h1 id="hero-title" className={styles.title}><HeroTagline /></h1>
          </div>
          <div className={styles.body}>
            <p>One accountable partner for project delivery, facility operations and the long-term performance of your built assets.</p>
            <div className={styles.actions}>
              <FlowButton href="#contact" text="Request a consultation" />
              <FlowButton href="#services" text="Explore our services" />
            </div>
          </div>
        </div>
        <HeroVideo />
      </div>
    </section>
  );
}
