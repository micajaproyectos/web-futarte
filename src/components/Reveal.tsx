"use client";
import type { CSSProperties, ReactNode } from "react";
import { useInView } from "@/hooks/useInView";

type RevealProps = {
  children: ReactNode;
  /** Retraso en ms para escalonado. Pasado como var(--anim-delay). */
  delay?: number;
  className?: string;
};

export function Reveal({ children, delay = 0, className = "" }: RevealProps) {
  const { ref, inView } = useInView();

  return (
    <div
      ref={ref}
      className={`reveal${inView ? " in-view" : ""}${className ? ` ${className}` : ""}`}
      style={{ "--anim-delay": `${delay}ms` } as CSSProperties}
    >
      {children}
    </div>
  );
}
