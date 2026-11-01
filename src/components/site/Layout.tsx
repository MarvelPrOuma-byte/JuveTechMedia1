import { Link } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import {
  Menu,
  X,
  ArrowUpRight,
  Send,
  Monitor,
  Users,
  Wallet,
  MessageCircle,
  Moon,
  Sun,
  Instagram,
  Linkedin,
  Music2,
  Twitter,
  Mail,
  Newspaper,
  Briefcase,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { WhatsAppLink } from "@/components/site/WhatsAppLink";

const nav = [
  { to: "/services", label: "Services", icon: Monitor },
  { to: "/about", label: "About", icon: Users },
  { to: "/team", label: "Team", icon: Users },
  { to: "/case-studies", label: "Work", icon: Briefcase },
  { to: "/blog", label: "Blog", icon: Newspaper },
  { to: "/pricing", label: "Pricing", icon: Wallet },
  { to: "/contact", label: "Contact", icon: MessageCircle },
] as const;

const socials = [
  {
    label: "Instagram",
    detail: "@juvetechmedia",
    href: "https://www.instagram.com/juvetechmedia/",
    icon: Instagram,
  },
  {
    label: "TikTok",
    detail: "@juvetechmedia",
    href: "https://www.tiktok.com/@juvetechmedia",
    icon: Music2,
  },
  {
    label: "LinkedIn",
    detail: "JuveTech Media",
    href: "https://www.linkedin.com/search/results/companies/?keywords=JuveTech%20Media",
    icon: Linkedin,
  },
  {
    label: "X",
    detail: "@juvetechmedia",
    href: "https://x.com/juvetechmedia",
    icon: Twitter,
  },
] as const;

function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggleTheme = () => {
    const nextIsDark = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", nextIsDark);
    document.documentElement.style.colorScheme = nextIsDark ? "dark" : "light";
    localStorage.setItem("juvetech-theme", nextIsDark ? "dark" : "light");
    document
      .querySelectorAll<HTMLLinkElement>('link[rel="icon"], link[rel="apple-touch-icon"]')
      .forEach((link) => {
        link.href = nextIsDark ? "/juvetechmedia-dark.png" : "/juvetechmedia.png";
      });
    setIsDark(nextIsDark);
  };

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      className="theme-toggle shrink-0"
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      aria-pressed={isDark}
      title={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      {isDark ? <Sun aria-hidden="true" /> : <Moon aria-hidden="true" />}
    </Button>
  );
}

export function Logo() {
  return (
    <Link
      to="/"
      aria-label="JuveTech Media home"
      className="brand-logo inline-flex shrink-0 items-center"
    >
      <span className="brand-logo-images">
        <img
          src="/juvetechmedia.png"
          alt="JuveTech Media"
          className="brand-logo-image brand-logo-image-light"
          width={180}
          height={68}
          onError={(event) => {
            event.currentTarget.parentElement?.classList.add("hidden");
            event.currentTarget.parentElement?.nextElementSibling?.classList.remove("hidden");
          }}
        />
        <img
          src="/juvetechmedia-dark.png"
          alt=""
          aria-hidden="true"
          className="brand-logo-image brand-logo-image-dark"
          width={180}
          height={68}
          onError={(event) => {
            event.currentTarget.parentElement?.classList.add("hidden");
            event.currentTarget.parentElement?.nextElementSibling?.classList.remove("hidden");
          }}
        />
      </span>
      <span className="hidden flex-col leading-none" aria-hidden="true">
        <span className="text-lg font-extrabold tracking-tight text-foreground">JuveTech</span>
        <span className="mt-1 text-[0.6rem] font-semibold tracking-[0.2em] text-primary">
          MEDIA
        </span>
      </span>
    </Link>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b bg-background/75 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5">
        <Logo />
        <nav aria-label="Main navigation" className="main-navigation hidden items-center lg:flex">
          {nav.map((n) => (
            <Button asChild variant="ghost" key={n.to} className="nav-button">
              <Link
                to={n.to}
                className="nav-link"
                activeProps={{ className: "nav-link nav-active" }}
              >
                <n.icon className="nav-icon" />
                <span>{n.label}</span>
              </Link>
            </Button>
          ))}
        </nav>
        <ThemeToggle />
        <WhatsAppLink className="whatsapp-compact hidden lg:inline-flex" />
        <Button asChild className="hidden lg:inline-flex">
          <Link to="/contact">
            Let’s talk <ArrowUpRight />
          </Link>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="menu-toggle lg:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          aria-expanded={open}
          aria-controls="mobile-navigation"
        >
          {open ? <X /> : <Menu />}
        </Button>
      </div>
      {open && (
        <nav
          id="mobile-navigation"
          aria-label="Mobile navigation"
          className="mobile-menu border-t bg-background px-5 py-4 lg:hidden"
        >
          {nav.map((n) => (
            <Button
              asChild
              variant="ghost"
              key={n.to}
              className="mobile-nav-link mb-1 h-11 w-full justify-start"
            >
              <Link to={n.to} onClick={() => setOpen(false)}>
                <n.icon />
                <span>{n.label}</span>
                <ArrowUpRight className="ml-auto" />
              </Link>
            </Button>
          ))}
          <Link to="/contact" onClick={() => setOpen(false)} className="btn-primary mt-3 w-full">
            Book a Strategy Call
          </Link>
          <WhatsAppLink className="btn-ghost mt-2 w-full" />
        </nav>
      )}
    </header>
  );
}

export function Footer() {
  const [newsletterStatus, setNewsletterStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [newsletterMessage, setNewsletterMessage] = useState("");

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const email = String(new FormData(form).get("email") || "").trim();
    setNewsletterStatus("loading");
    setNewsletterMessage("Adding you to the newsletter…");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const result: unknown = await response.json();

      if (
        typeof result !== "object" ||
        result === null ||
        !("success" in result) ||
        typeof result.success !== "boolean" ||
        !("message" in result) ||
        typeof result.message !== "string"
      ) {
        throw new Error("The newsletter service returned an invalid response.");
      }

      setNewsletterMessage(result.message);
      setNewsletterStatus(response.ok && result.success ? "success" : "error");
      if (response.ok && result.success) form.reset();
    } catch (error) {
      console.error("Newsletter signup failed.", error);
      setNewsletterStatus("error");
      setNewsletterMessage("We couldn't complete your signup. Please try again later.");
    }
  };
  return (
    <footer className="relative z-10 border-t bg-background/85">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <Logo />
          <p className="mt-4 max-w-sm text-sm text-muted-foreground">
            Websites, SEO, paid ads and scroll-stopping creative for brands ready to grow.
          </p>
          <a
            href="mailto:juvetechmedia@gmail.com"
            className="mt-4 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
          >
            <Mail size={16} aria-hidden="true" />
            juvetechmedia@gmail.com
          </a>
          <form onSubmit={submit} className="mt-6 flex max-w-sm gap-2">
            <label className="sr-only" htmlFor="newsletter-email">
              Your email address
            </label>
            <input
              id="newsletter-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              maxLength={254}
              placeholder="Your email"
              className="field"
              disabled={newsletterStatus === "loading"}
            />
            <Button
              type="submit"
              aria-label="Join newsletter"
              size="icon"
              className="shrink-0"
              disabled={newsletterStatus === "loading"}
            >
              <Send />
            </Button>
          </form>
          {newsletterMessage && (
            <p
              className={`mt-2 text-sm ${newsletterStatus === "error" ? "text-destructive" : "text-primary"}`}
              role="status"
              aria-live="polite"
            >
              {newsletterMessage}
            </p>
          )}
        </div>
        <div>
          <h4 className="font-semibold">Company</h4>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            {nav.map((n) => (
              <li key={n.to}>
                <Link to={n.to} className="hover:text-foreground">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-semibold">Follow us</h4>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            {socials.map(({ label, detail, href, icon: Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${label}: ${detail} (opens in a new tab)`}
                  className="social-link inline-flex items-center gap-3 hover:text-primary"
                >
                  <Icon size={18} aria-hidden="true" />
                  <span>
                    {label} · {detail}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} JuveTech Media. All rights reserved.
      </div>
    </footer>
  );
}
