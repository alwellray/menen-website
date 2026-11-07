"use client";

import { FlowButton } from "./flow-button";


import { useEffect, useRef, useState } from "react";
import { ClipboardCheck, Settings, House, Wrench } from "lucide-react";
import { services } from "../../content/company";
import styles from "./services-stack.module.css";

const photos = ["construction", "workplace", "residential", "commercial"];
const icons = [ClipboardCheck, Settings, House, Wrench];

function ServiceCard({ index }: { index: number }) {
  const service = services[index];
  const Icon = icons[index];
  const card = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(-1);

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let timer: ReturnType<typeof setInterval>;
    let visible = false;
    function sync() {
      clearInterval(timer);
      setStep(-1);
      if (!visible || motion.matches) return;
      setStep(0);
      timer = setInterval(() => setStep((previous) => (previous + 1) % service.scope.length), 2400);
    }
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    }, { threshold: 0.4 });
    if (card.current) observer.observe(card.current);
    motion.addEventListener("change", sync);
    return () => { clearInterval(timer); observer.disconnect(); motion.removeEventListener("change", sync); };
  }, [service]);

  return (
    <div ref={card} className={styles.card}>
      <div className={styles.drawing} aria-hidden="true">
        <svg viewBox="0 0 440 140" fill="none">
          <path d="M30 120H410M110 120V38L220 10L330 38V120M220 10V120M110 38L220 66L330 38M110 66L220 94L330 66M110 94L220 122L330 94" stroke="#0d5278" strokeWidth="1.5" />
          {service.scope.map((_, position) => <g key={position} opacity={step === position || step < 0 ? 1 : 0.25}>
            <circle cx={70 + position * 75} cy="120" r="6" fill={step === position ? "#efc100" : "#0d5278"} />
            <path d={`M${70 + position * 75} 126V136`} stroke="#0d5278" />
          </g>)}
        </svg>
        <Icon size={32} strokeWidth={1.5} className={styles.icon} />
      </div>
      <p className={styles.intro}>{service.intro}</p>
      <p className={styles.coverage}>What we cover</p>
      <ul className={styles.capabilities}>
        {service.scope.map((capability, position) => <li key={capability} className={step === position ? styles.highlight : undefined}>{capability}</li>)}
      </ul>
      <FlowButton className={styles.cta} href={`#contact?service=${encodeURIComponent(service.title)}`} text="Discuss this service" />
    </div>
  );
}

export default function ServicesStack() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const panels = [...(root.current?.querySelectorAll<HTMLElement>("[data-service-panel]") ?? [])];
    function fit() {
      panels.forEach((panel) => {
        panel.style.setProperty("--sticky-top", `${Math.min(0, window.innerHeight - panel.offsetHeight)}px`);
      });
    }
    const observer = new ResizeObserver(fit);
    panels.forEach((panel) => observer.observe(panel));
    window.addEventListener("resize", fit);
    fit();
    return () => { observer.disconnect(); window.removeEventListener("resize", fit); };
  }, []);

  return (
    <section id="services" ref={root} className={styles.stack} aria-label="MANEN services">
      {services.map((service, index) => (
        <article key={service.title} data-service-panel className={styles.panel} style={{ backgroundImage: `linear-gradient(90deg, #102536df, #10253682), url("/portfolio/${photos[index]}.jpg")` }}>
          <div className={styles.inner}>
            <div className={styles.heading}>
              <p>One accountable partner.</p>
              <h2>{service.title}</h2>
              <span className={styles.count}>0{index + 1} / 04</span>
            </div>
            <ServiceCard index={index} />
          </div>
        </article>
      ))}
    </section>
  );
}
