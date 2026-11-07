"use client";

import { FlowButton } from "./flow-button";

import { useEffect, useRef, useState, type PointerEvent } from "react";
import styles from "./ink-orbit-hero.module.css";

export default function HeroVideo() {
  const video = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    function sync() {
      if (motion.matches) video.current?.pause();
      else void video.current?.play().catch(() => {});
    }
    sync();
    motion.addEventListener("change", sync);
    return () => motion.removeEventListener("change", sync);
  }, []);

  function move(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    event.currentTarget.style.setProperty("--video-x", `${x * 16}px`);
    event.currentTarget.style.setProperty("--video-y", `${y * 16}px`);
    event.currentTarget.style.setProperty("--video-tilt-x", `${-y * 6}deg`);
    event.currentTarget.style.setProperty("--video-tilt-y", `${x * 6}deg`);
  }

  function reset(event: PointerEvent<HTMLDivElement>) {
    ["--video-x", "--video-y", "--video-tilt-x", "--video-tilt-y"].forEach((name) => event.currentTarget.style.removeProperty(name));
  }

  return (
    <div className={styles.art} onPointerMove={move} onPointerLeave={reset}>
      <video
        ref={video}
        className={styles.heroVideo}
        src="/manen-building.mp4"
        muted
        loop
        playsInline
        preload="auto"
        aria-label="Animated three-dimensional architectural building"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />
      <FlowButton
        type="button"
        className={styles.videoControl}
        onClick={() => {
          if (playing) video.current?.pause();
          else void video.current?.play().catch(() => {});
        }}
        text={playing ? "Pause video" : "Play video"}
      />
    </div>
  );
}
