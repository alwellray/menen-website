"use client";

import { FlowButton } from "./flow-button";


import Image from "next/image";
import { useRef, useState } from "react";
import { services } from "../../content/company";
import styles from "./portfolio-gallery.module.css";

const images = [
  { src: "construction", title: "From concept to handover", alt: "Unfinished building interior with scaffolding", source: "https://unsplash.com/photos/uQGvhcQb5R8" },
  { src: "workplace", title: "Spaces that work", alt: "Bright contemporary office interior", source: "https://images.unsplash.com/photo-1497366754035-f200968a6e72" },
  { src: "residential", title: "Value beyond the building", alt: "Modern residential property", source: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9" },
  { src: "commercial", title: "Performance by design", alt: "Glass commercial building façades", source: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab" },
];

export default function PortfolioGallery() {
  const track = useRef<HTMLDivElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const [active, setActive] = useState(0);
  const item = images[active];
  const service = services[active];

  function browse(direction: number) {
    setActive((index) => (index + direction + images.length) % images.length);
  }

  return (
    <>
      <div className={styles.tools}>
        <p>Illustrative imagery · Approved MANEN case studies coming soon</p>
        <div>
          <button aria-label="Scroll gallery left" onClick={() => track.current?.scrollBy({ left: -360, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" })}>←</button>
          <button aria-label="Scroll gallery right" onClick={() => track.current?.scrollBy({ left: 360, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" })}>→</button>
        </div>
      </div>
      <div ref={track} className={styles.track} aria-label="Explore MANEN service capabilities">
        {images.map((image, index) => (
          <button className={styles.card} key={image.src} onClick={() => { setActive(index); dialog.current?.showModal(); }}>
            <Image src={`/portfolio/${image.src}.jpg`} alt={image.alt} fill sizes="(max-width: 640px) 80vw, 340px" />
            <span className={styles.tag}>{services[index].title}</span>
            <span className={styles.caption}><span>{image.title}</span><span aria-hidden="true">↗</span></span>
          </button>
        ))}
      </div>
      <dialog ref={dialog} className={styles.dialog} onClick={(event) => { if (event.target === event.currentTarget) dialog.current?.close(); }} onKeyDown={(event) => { if (event.key === "ArrowLeft") browse(-1); if (event.key === "ArrowRight") browse(1); }}>
        <button className={styles.close} aria-label="Close service details" onClick={() => dialog.current?.close()}>×</button>
        <div className={styles.detail}>
          <div className={styles.photo}><Image src={`/portfolio/${item.src}.jpg`} alt={item.alt} fill sizes="(max-width: 760px) 90vw, 440px" /></div>
          <div className={styles.copy}>
            <p className={styles.notice}>Illustrative service showcase</p>
            <h3>{service.title}</h3>
            <p>{service.intro}</p>
            <ul>{service.scope.map((scope) => <li key={scope}>{scope}</li>)}</ul>
            <FlowButton href={`#contact?service=${encodeURIComponent(service.title)}`} onClick={() => dialog.current?.close()} text="Discuss your requirements" />
            <p className={styles.notice}>Stock photography from <a href={item.source} target="_blank" rel="noreferrer">Unsplash</a>. This image does not represent a completed MANEN project.</p>
            <div className={styles.navigation}><button aria-label="Previous service" onClick={() => browse(-1)}>←</button><span>{active + 1} / {images.length}</span><button aria-label="Next service" onClick={() => browse(1)}>→</button></div>
          </div>
        </div>
      </dialog>
    </>
  );
}
