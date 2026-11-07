"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Target, Telescope, ShieldCheck, Building2, Leaf } from "lucide-react";
import styles from "./spatial-product-showcase.module.css";

const statements = [
  {
    label: "Mission",
    title: "Value throughout the asset lifecycle.",
    description: "To deliver integrated engineering, project management, facility management, and asset lifecycle solutions that maximize value, improve operational performance, and secure the long-term sustainability of our clients’ built environments.",
    Icon: Target,
    priorities: [{ Icon: Building2, text: "Integrated engineering and management" }, { Icon: Leaf, text: "Long-term asset sustainability" }],
  },
  {
    label: "Vision",
    title: "Trust that shapes the built environment.",
    description: "To be Nigeria’s most trusted engineering-led integrated facility and project management company, delivering innovative solutions that transform how assets are planned, delivered, operated, and maintained.",
    Icon: Telescope,
    priorities: [{ Icon: ShieldCheck, text: "A trusted partner in Nigeria" }, { Icon: Building2, text: "Innovation across the built environment" }],
  },
];

export default function MissionVisionShowcase() {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const reduced = useReducedMotion();
  const statement = statements[active];
  const Icon = statement.Icon;

  function navigate(event: KeyboardEvent<HTMLButtonElement>) {
    let next = active;
    if (event.key === "ArrowRight" || event.key === "ArrowLeft") next = 1 - active;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = 1;
    else return;
    event.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  }

  return (
    <div className={styles.showcase}>
      <div className={styles.switcher} role="tablist" aria-label="MANEN mission and vision">
        {statements.map((item, index) => (
          <button
            key={item.label}
            ref={(element) => { tabs.current[index] = element; }}
            id={`company-tab-${index}`}
            role="tab"
            aria-selected={active === index}
            aria-controls={`company-panel-${index}`}
            tabIndex={active === index ? 0 : -1}
            onClick={() => setActive(index)}
            onKeyDown={navigate}
          >
            {active === index && <motion.span className={styles.selected} layoutId="company-purpose-tab" transition={reduced ? { duration: 0 } : { type: "spring", stiffness: 220, damping: 25 }} />}
            <span className={styles.tabLabel}>{item.label}</span>
          </button>
        ))}
      </div>
      <div role="tabpanel" id={`company-panel-${active}`} aria-labelledby={`company-tab-${active}`} tabIndex={0}>
        <motion.div layout={!reduced} className={styles.layout} data-vision={active === 1}>
          <motion.div layout={!reduced} className={styles.visual} aria-hidden="true">
            <div className={styles.ring} />
            <div className={styles.orbit}>
              <AnimatePresence mode="wait" initial={false}>
                <motion.div key={active} initial={reduced ? false : { opacity: 0, scale: 0.7, rotate: -15 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} exit={{ opacity: 0 }} transition={{ duration: reduced ? 0 : 0.35 }}>
                  <Icon size={112} strokeWidth={1} />
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
          <motion.div layout={!reduced} className={styles.details}>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={active} initial={reduced ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: reduced ? 0 : 0.25 }}>
                <p className={styles.label}>Our {statement.label.toLowerCase()}</p>
                <h3>{statement.title}</h3>
                <p className={styles.description}>{statement.description}</p>
                <ul>{statement.priorities.map(({ Icon: PriorityIcon, text }) => <li key={text}><PriorityIcon size={20} aria-hidden="true" /><span>{text}</span></li>)}</ul>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
