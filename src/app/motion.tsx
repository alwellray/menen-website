"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";

gsap.registerPlugin(useGSAP);

export default function Motion() {
  useGSAP(() => {
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from("[data-hero-image]", { scale: 1.08, duration: 1.5, ease: "power2.out", clearProps: "transform" });

    });
    return () => media.revert();
  });
  return null;
}
