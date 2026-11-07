"use client";

import { useEffect, useState } from "react";
import styles from "./ink-orbit-hero.module.css";

const words = ["Plan.", "Build.", "Operate.", "Sustain."];

export default function HeroTagline() {
  const [word, setWord] = useState(words[0]);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let timer: number;

    function start() {
      window.clearTimeout(timer);
      setAnimated(!motion.matches);
      if (motion.matches) return;

      let index = 0;
      let length = 0;
      let erasing = false;
      setWord("");

      function tick() {
        const current = words[index];
        length += erasing ? -1 : 1;
        setWord(current.slice(0, length));

        if (length === current.length) {
          erasing = true;
          timer = window.setTimeout(tick, 1250);
        } else if (length === 0) {
          index = (index + 1) % words.length;
          erasing = false;
          timer = window.setTimeout(tick, 240);
        } else {
          timer = window.setTimeout(tick, erasing ? 45 : 85);
        }
      }

      timer = window.setTimeout(tick, 450);
    }

    start();
    motion.addEventListener("change", start);
    return () => {
      window.clearTimeout(timer);
      motion.removeEventListener("change", start);
    };
  }, []);

  return (
    <span className={styles.tagline}>
      <span className="sr-only">We help you plan, build, operate, and sustain.</span>
      {animated ? (
        <span aria-hidden="true">
          <strong className={styles.taglineLead}>We help you</strong>{" "}
          <span className={styles.rotatingWord}>
            <span className={styles.taglineSizer}>Operate.</span>
            <span className={styles.typed}>{word}<span className={styles.caret} /></span>
          </span>
        </span>
      ) : (
        <span aria-hidden="true"><strong className={styles.taglineLead}>We help you</strong> plan, build, operate, and sustain.</span>
      )}
    </span>
  );
}
