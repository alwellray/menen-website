import { FlowButton } from "./flow-button";
import Image from "next/image";
import styles from "./about-3.module.css";

export default function About3() {
  return (
    <div className={styles.grid}>
      <div className={styles.mainImage}>
        <Image src="/portfolio/commercial.jpg" alt="Illustrative view of modern commercial architecture" fill sizes="(max-width: 760px) 100vw, 65vw" />
      </div>
      <div className={styles.side}>
        <div className={styles.introduction}>
          <h3>Engineering-led. Accountable throughout.</h3>
          <p>From residential construction and renovation to integrated facility and property management, MANEN brings technical expertise, coordination and professional attention to every engagement.</p>
          <FlowButton href="#services" text="Explore our services" />
        </div>
        <div className={styles.secondaryImage}>
          <Image src="/portfolio/workplace.jpg" alt="Illustrative contemporary workplace interior" fill sizes="(max-width: 760px) 100vw, 30vw" />
        </div>
      </div>
    </div>
  );
}
