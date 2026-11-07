"use client";

import { ArrowRight } from "lucide-react";
import type { ComponentProps } from "react";
import { cn } from "../../lib/utils";

type FlowButtonProps = {
  text?: string;
} & (
  | ({ href: string } & Omit<ComponentProps<"a">, "children">)
  | ({ href?: never } & Omit<ComponentProps<"button">, "children">)
);

export function FlowButton({ text = "Learn more", className, ...props }: FlowButtonProps) {
  const content = <>
    <ArrowRight className="flow-arrow flow-arrow-in" size={16} aria-hidden="true" />
    <span className="flow-label">{text}</span>
    <span className="flow-fill" aria-hidden="true" />
    <ArrowRight className="flow-arrow flow-arrow-out" size={16} aria-hidden="true" />
  </>;
  const classes = cn("flow-button", className);
  if (props.href !== undefined) return <a {...props as ComponentProps<"a">} className={classes}>{content}</a>;
  return <button type="button" {...props as ComponentProps<"button">} className={classes}>{content}</button>;
}
