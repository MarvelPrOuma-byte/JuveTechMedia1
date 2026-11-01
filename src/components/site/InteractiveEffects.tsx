import { useEffect, useRef } from "react";
import {
  Code2,
  Globe,
  Megaphone,
  MousePointer2,
  Palette,
  Search,
  Target,
  Layers,
} from "lucide-react";

const icons = [Code2, Globe, Megaphone, MousePointer2, Palette, Search, Target, Layers];

export function InteractiveEffects() {
  const cursor = useRef<HTMLDivElement>(null);
  const lens = useRef<HTMLDivElement>(null);
  const progress = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const fine = window.matchMedia("(pointer: fine)");
    let current: HTMLElement | null = null;
    let frame = 0;
    const move = (event: PointerEvent) => {
      if (!fine.matches || reduced.matches || !cursor.current || !lens.current) return;
      cursor.current.style.setProperty("--cursor-x", `${event.clientX}px`);
      cursor.current.style.setProperty("--cursor-y", `${event.clientY}px`);
      cursor.current.dataset["visible"] = "true";
      const target = event.target instanceof Element ? event.target : null;
      cursor.current.dataset["active"] = String(
        Boolean(target?.closest("a, button, input, select, textarea")),
      );
      const heading = target?.closest<HTMLElement>("main h1, main h2, main h3") ?? null;
      cursor.current.dataset["magnifying"] = String(Boolean(heading));
      if (!heading) {
        current = null;
        lens.current.replaceChildren();
        return;
      }
      const rect = heading.getBoundingClientRect();
      if (heading !== current) {
        const copy = heading.cloneNode(true) as HTMLElement;
        copy.removeAttribute("id");
        copy.querySelectorAll("[id]").forEach((el) => el.removeAttribute("id"));
        const computed = getComputedStyle(heading);
        copy.style.margin = "0";
        copy.style.font = computed.font;
        copy.style.textAlign = computed.textAlign;
        copy.style.width = `${rect.width}px`;
        lens.current.replaceChildren(copy);
        current = heading;
      }
      lens.current.style.setProperty("--lens-x", `${(rect.left - event.clientX) * 1.65 + 60}px`);
      lens.current.style.setProperty("--lens-y", `${(rect.top - event.clientY) * 1.65 + 60}px`);
    };
    const hide = () => {
      if (cursor.current) cursor.current.dataset["visible"] = "false";
    };
    const updateScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const distance = document.documentElement.scrollHeight - window.innerHeight;
        progress.current?.style.setProperty(
          "--scroll-progress",
          String(distance > 0 ? window.scrollY / distance : 0),
        );
        hide();
      });
    };
    updateScroll();
    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", hide);
    window.addEventListener("scroll", updateScroll, { passive: true });
    window.addEventListener("resize", updateScroll);
    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", hide);
      window.removeEventListener("scroll", updateScroll);
      window.removeEventListener("resize", updateScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      <div className="ambient-field" aria-hidden="true">
        {icons.map((Icon, i) => (
          <span key={i} className={`ambient-item ambient-item-${i}`}>
            <Icon strokeWidth={1.3} />
          </span>
        ))}
        {["J", "M", "SEO", "Aa", "W", "+"].map((letter, i) => (
          <span key={letter} className={`ambient-letter ambient-letter-${i}`}>
            {letter}
          </span>
        ))}
      </div>
      <div ref={progress} className="scroll-progress" aria-hidden="true" />
      <div ref={cursor} className="magnifier-cursor" aria-hidden="true">
        <div ref={lens} className="magnifier-content" />
      </div>
    </>
  );
}
