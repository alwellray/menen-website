"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Home, BriefcaseBusiness, Images, MessageCircle, Building2 } from "lucide-react";
import { cn } from "../../lib/utils";
import styles from "./bottom-nav-bar.module.css";

const navItems = [
  { label: "Home", icon: Home, target: "main-content" },
  { label: "About us", icon: Building2, target: "company" },
  { label: "Services", icon: BriefcaseBusiness, target: "services" },
  { label: "Portfolio", icon: Images, target: "portfolio" },
  { label: "Contact", icon: MessageCircle, target: "contact" },
];

type BottomNavBarProps = {
  className?: string;
  defaultIndex?: number;
  stickyBottom?: boolean;
};

export function BottomNavBar({
  className,
  defaultIndex = 0,
  stickyBottom = false,
}: BottomNavBarProps) {
  const [activeIndex, setActiveIndex] = useState(Math.max(0, Math.min(navItems.length - 1, defaultIndex)));
  const reduced = useReducedMotion();

  useEffect(() => {
    let frame = 0;
    function update() {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        let active = 0;
        const headerBottom = document.querySelector(".site-header")?.getBoundingClientRect().bottom ?? 0;
        const activationLine = headerBottom + 48;
        navItems.forEach((item, index) => {
          const element = document.getElementById(item.target);
          if (element && element.getBoundingClientRect().top <= activationLine) active = index;
        });
        setActiveIndex(active);
      });
    }
    const observer = new ResizeObserver(update);
    document.querySelectorAll("main > section, .site-header").forEach((element) => observer.observe(element));
    update();
    window.addEventListener("hashchange", update);
    window.addEventListener("pageshow", update);
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("hashchange", update);
      window.removeEventListener("pageshow", update);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <motion.nav
      initial={false}
      aria-label="Section navigation"
      className={cn(styles.nav, stickyBottom && styles.sticky, className)}
    >
      {navItems.map((item, index) => {
        const Icon = item.icon;
        const active = activeIndex === index;
        return (
          <motion.a
            key={item.target}
            href={`#${item.target}`}
            aria-label={item.label}
            aria-current={active ? "location" : undefined}
            className={cn(styles.link, active && styles.active)}
            whileTap={reduced ? undefined : { scale: 0.97 }}
            onClick={() => setActiveIndex(index)}
          >
            <Icon size={21} strokeWidth={1.8} aria-hidden="true" />
            <motion.span
              initial={false}
              animate={{ width: active ? 58 : 0, opacity: active ? 1 : 0, marginLeft: active ? 8 : 0 }}
              transition={reduced ? { duration: 0 } : { type: "spring", stiffness: 350, damping: 32 }}
              className={styles.label}
              aria-hidden="true"
            >{item.label}</motion.span>
          </motion.a>
        );
      })}
    </motion.nav>
  );
}

export default BottomNavBar;
