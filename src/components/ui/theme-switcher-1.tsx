"use client";

import { MonitorIcon, MoonStarIcon, SunIcon } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useState, useRef, type KeyboardEvent } from "react";

const options = [
  { Icon: MonitorIcon, value: "system" },
  { Icon: SunIcon, value: "light" },
  { Icon: MoonStarIcon, value: "dark" },
];

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const reduced = useReducedMotion();
  const [open, setOpen] = useState(false);
  const container = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const CurrentIcon = mounted ? (options.find((option) => option.value === theme)?.Icon ?? SunIcon) : SunIcon;
  useEffect(() => {
    if (!open) return;
    function dismiss(event: PointerEvent) {
      if (!container.current?.contains(event.target as Node)) setOpen(false);
    }
    function escape(event: globalThis.KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        trigger.current?.focus();
      }
    }
    document.addEventListener("pointerdown", dismiss);
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("pointerdown", dismiss);
      document.removeEventListener("keydown", escape);
    };
  }, [open]);
  useEffect(() => setMounted(true), []);

  function navigate(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") next = (index + 1) % 3;
    else if (event.key === "ArrowLeft" || event.key === "ArrowUp") next = (index + 2) % 3;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = 2;
    else return;
    event.preventDefault();
    setTheme(options[next].value);
    buttons.current[next]?.focus();
  }

  return (
    <div ref={container} className="theme-dock" onBlur={(event) => {
      if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
    }}>
      <button ref={trigger} type="button" className="theme-trigger" aria-label="Choose colour theme" aria-expanded={open} aria-controls="theme-options" onClick={() => setOpen(!open)}>
        <CurrentIcon size={18} aria-hidden="true" />
      </button>
      {open && <div id="theme-options" className="theme-switcher" role="radiogroup" aria-label="Colour theme">
      {options.map(({ Icon, value }, index) => {
        const active = mounted && theme === value;
        return <button
          key={value}
          ref={(element) => { buttons.current[index] = element; }}
          type="button"
          role="radio"
          aria-checked={active}
          aria-label={`Switch to ${value} theme`}
          title={`${value[0].toUpperCase() + value.slice(1)} theme`}
          tabIndex={active || (!mounted && index === 0) ? 0 : -1}
          onClick={() => {
            setTheme(value);
            setOpen(false);
            trigger.current?.focus();
          }}
          onKeyDown={(event) => navigate(event, index)}
        >
          <Icon size={18} aria-hidden="true" />
          {active && <motion.span className="theme-selected" layoutId="theme-option" transition={reduced ? { duration: 0 } : { type: "spring", bounce: 0.3, duration: 0.6 }} />}
        </button>;
      })}
      </div>}
    </div>
  );
}
