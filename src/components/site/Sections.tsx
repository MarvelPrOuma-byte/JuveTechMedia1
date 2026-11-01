import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  Monitor,
  Search,
  Target,
  Clapperboard,
  Palette,
  Check,
  ArrowRight,
  CalendarDays,
  ArrowUpRight,
  Globe,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatPackagePrice, packagePrices } from "@/lib/pricing";
import { getAvailableBookingDays } from "@/lib/booking";
import { buildInquiryWhatsAppUrl } from "@/lib/contact";
import { WhatsAppLink } from "@/components/site/WhatsAppLink";
import heroPoster from "@/assets/hero-dashboard.jpg";

export function SectionHead({
  eyebrow,
  title,
  sub,
  primary = false,
}: {
  eyebrow: string;
  title: string;
  sub?: string;
  primary?: boolean;
}) {
  const Heading = primary ? "h1" : "h2";
  return (
    <div className="mx-auto max-w-2xl text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">{eyebrow}</p>
      <Heading className="mt-3 text-3xl font-extrabold md:text-5xl">{title}</Heading>
      {sub && <p className="mt-4 text-muted-foreground">{sub}</p>}
    </div>
  );
}

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncPlayback = () => {
      if (motionPreference.matches) {
        video.pause();
      } else {
        void video.play().catch((error: unknown) => {
          console.warn("Homepage background video could not autoplay.", error);
        });
      }
    };

    syncPlayback();
    motionPreference.addEventListener("change", syncPlayback);
    return () => motionPreference.removeEventListener("change", syncPlayback);
  }, []);

  return (
    <section className="home-hero relative isolate overflow-hidden border-b">
      <img className="hero-poster" src={heroPoster} alt="" aria-hidden="true" />
      <video
        ref={videoRef}
        className="hero-video"
        src="/digitalmarketing.mp4"
        poster={heroPoster}
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
        tabIndex={-1}
        onError={(event) => {
          event.currentTarget.hidden = true;
        }}
      />
      <div className="hero-video-overlay" aria-hidden="true" />
      <div className="relative z-10 mx-auto max-w-3xl px-5 py-20 text-center md:py-24">
        <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-primary">
          <Globe size={15} /> Digital growth. Made in Kenya.
        </p>
        <h1 className="mt-6 text-5xl font-extrabold leading-[1.1] md:text-7xl">
          JuveTech <span className="text-primary">Media</span>
        </h1>
        <p className="mt-5 text-2xl font-medium md:text-3xl">Big ideas. Real growth.</p>
        <p className="mx-auto mt-5 max-w-lg text-base leading-7 text-muted-foreground">
          Websites, marketing and creative that move your business forward. One team. Less noise.
          More impact.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button asChild size="lg">
            <Link to="/contact">
              Let’s grow your brand <ArrowUpRight />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link to="/services">
              Explore our services <ArrowRight />
            </Link>
          </Button>
          <WhatsAppLink className="btn-ghost" />
        </div>
        <div className="mt-12 flex flex-wrap justify-center gap-x-6 gap-y-3 text-xs text-muted-foreground">
          {["Strategy first", "Built for your business", "Based in Kenya"].map((item) => (
            <span key={item} className="flex items-center gap-2">
              <Check size={14} className="text-accent" />
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

const services = [
  {
    id: "web-design",
    icon: Monitor,
    title: "Custom Web Design & Development",
    desc: "Lightning-fast, mobile-friendly sites built to convert.",
  },
  {
    id: "seo",
    icon: Search,
    title: "Search Engine Optimization",
    desc: "Rank higher and drive organic traffic that compounds.",
  },
  {
    id: "paid-media",
    icon: Target,
    title: "Paid Ads Management",
    desc: "High-ROI Google & Meta ad campaigns, optimized weekly.",
  },
  {
    id: "video-production",
    icon: Clapperboard,
    title: "Advert & Video Production",
    desc: "Engaging short-form video ads for TikTok and Reels.",
  },
  {
    id: "graphic-design",
    icon: Palette,
    title: "Graphic Posters & Social Content",
    desc: "Eye-catching brand visuals that stop the scroll.",
  },
];

export function Services({ primary = false }: { primary?: boolean }) {
  return (
    <section className="mx-auto max-w-7xl px-5 py-20">
      <SectionHead
        eyebrow="What we do"
        title="SEO, Paid Media & Digital Marketing Services"
        primary={primary}
      />
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
        {services.map((s) => (
          <article
            key={s.title}
            className="service-card group border-t border-border pt-6 transition duration-300 hover:border-primary"
          >
            <div className="grid h-12 w-12 place-items-center rounded-lg bg-secondary text-primary">
              <s.icon size={22} />
            </div>
            <h3 className="mt-5 text-lg font-bold">{s.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
            <Button asChild variant="link" className="mt-4 h-auto px-0">
              <Link to="/services/$serviceId" params={{ serviceId: s.id }}>
                View service <ArrowUpRight />
              </Link>
            </Button>
          </article>
        ))}
      </div>
    </section>
  );
}

const plans = [
  {
    name: "Startup Launchpad",
    price: formatPackagePrice(packagePrices.launchpad),
    period: "one-time",
    desc: "Get online fast with a site built to convert.",
    features: [
      "5-page custom website",
      "Mobile-first & lightning fast",
      "On-page SEO setup",
      "Google Business profile",
      "5 social graphic posters",
      "30 days support",
    ],
  },
  {
    name: "Full-Service Growth Retainer",
    price: formatPackagePrice(packagePrices.growth),
    period: "/month",
    featured: true,
    desc: "Your full marketing team, on autopilot.",
    features: [
      "Everything in Launchpad",
      "Monthly SEO & content",
      "Google & Meta ads management",
      "4 short-form video adverts / mo",
      "20 graphic posters / mo",
      "Monthly strategy call & report",
    ],
  },
  {
    name: "Enterprise Custom",
    price: "Let's talk",
    period: "",
    desc: "Multi-brand, multi-market campaigns.",
    features: [
      "Dedicated account team",
      "Custom web apps & funnels",
      "Unlimited creative requests",
      "Advanced analytics dashboards",
    ],
  },
];

export function Pricing() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-20">
      <SectionHead
        eyebrow="Pricing"
        title="Transparent packages, real results"
        sub="Illustrative packages in Kenyan shillings. Request a quote for your project."
        primary
      />
      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {plans.map((p) => (
          <div
            key={p.name}
            className={`relative rounded-2xl border p-8 ${p.featured ? "border-primary/60 bg-card shadow-glow" : "bg-card/50"}`}
          >
            {p.featured && (
              <span className="absolute -top-3 left-8 rounded-full bg-gradient-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
                Most popular
              </span>
            )}
            <h3 className="text-lg font-bold">{p.name}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{p.desc}</p>
            <div className="mt-6 flex flex-wrap items-end gap-2">
              <span className="text-3xl font-extrabold">{p.price}</span>
              <span className="pb-1 text-sm text-muted-foreground">{p.period}</span>
            </div>
            <ul className="mt-6 space-y-3 text-sm">
              {p.features.map((f) => (
                <li key={f} className="flex gap-2">
                  <Check size={18} className="shrink-0 text-primary" />
                  {f}
                </li>
              ))}
            </ul>
            <Link
              to="/contact"
              className={`${p.featured ? "btn-primary" : "btn-ghost"} mt-8 w-full`}
            >
              Choose plan
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}

const slots = ["09:00", "10:30", "12:00", "14:00", "15:30", "17:00"];

export function Booking({ primary = false }: { primary?: boolean }) {
  const [error, setError] = useState("");
  const [day, setDay] = useState(0);
  const [slot, setSlot] = useState<string | null>(null);
  const [requestUrl, setRequestUrl] = useState("");
  const days = getAvailableBookingDays();

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const name = String(f.get("name") || "").trim();
    const email = String(f.get("email") || "").trim();
    const website = String(f.get("website") || "").trim();
    const service = String(f.get("service") || "").trim();
    const msg = String(f.get("message") || "").trim();
    if (!name || name.length > 100) return setError("Please enter your name (max 100 characters).");
    if (!/^\S+@\S+\.\S+$/.test(email) || email.length > 255)
      return setError("Please enter a valid email.");
    if (website.length > 255) return setError("Website URL must be under 255 characters.");
    if (!service) return setError("Please choose a service.");
    if (!msg || msg.length > 1000)
      return setError("Please tell us about your project (max 1000 characters).");
    if (!slot) return setError("Please select a preferred day and time for your strategy call.");
    const selectedDay = days[day];
    if (!selectedDay) return setError("Please select an available day.");

    setError("");
    setRequestUrl(
      buildInquiryWhatsAppUrl({
        name,
        email,
        ...(website ? { website } : {}),
        service,
        message: msg,
        callDate: selectedDay.toLocaleDateString("en-KE", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        callTime: slot,
      }),
    );
  };

  return (
    <section className="mx-auto max-w-7xl px-5 py-20">
      <SectionHead
        eyebrow="Let's talk"
        title="Book a Digital Marketing Strategy Call"
        sub="Request a free 30-minute marketing consultancy session. Choose a preferred time and send your details to JuveTech Media on WhatsApp."
        primary={primary}
      />
      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        <form onSubmit={submit} className="space-y-4 rounded-2xl border bg-card p-7">
          {requestUrl ? (
            <div className="py-12 text-center" role="status" aria-live="polite">
              <Check className="mx-auto text-primary" size={40} />
              <h3 className="mt-4 text-xl font-bold">Your request is ready</h3>
              <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
                Open WhatsApp and press Send to deliver your request. Your selected time is a
                preference, not a confirmed booking; we’ll confirm by replying.
              </p>
              <a href={requestUrl} target="_blank" rel="noreferrer" className="btn-primary mt-6">
                Open WhatsApp <MessageCircle size={18} aria-hidden="true" />
              </a>
              <button
                type="button"
                className="mt-4 block w-full text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground"
                onClick={() => setRequestUrl("")}
              >
                Edit request
              </button>
            </div>
          ) : (
            <>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="space-y-1 text-sm font-medium">
                  Name
                  <input
                    name="name"
                    placeholder="Your name"
                    autoComplete="name"
                    required
                    maxLength={100}
                    className="field"
                  />
                </label>
                <label className="space-y-1 text-sm font-medium">
                  Email
                  <input
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    autoComplete="email"
                    required
                    maxLength={255}
                    className="field"
                  />
                </label>
              </div>
              <label className="block space-y-1 text-sm font-medium">
                Website URL (optional)
                <input
                  name="website"
                  type="url"
                  placeholder="https://example.com"
                  maxLength={255}
                  className="field"
                />
              </label>
              <label className="block space-y-1 text-sm font-medium">
                Service needed
                <select name="service" className="field" defaultValue="" required>
                  <option value="" disabled>
                    Service needed
                  </option>
                  {services.map((s) => (
                    <option key={s.title}>{s.title}</option>
                  ))}
                  <option>Full-Service Growth</option>
                </select>
              </label>
              <label className="block space-y-1 text-sm font-medium">
                Tell us about your project
                <textarea
                  name="message"
                  rows={5}
                  maxLength={1000}
                  placeholder="What are you looking to achieve?"
                  className="field"
                  required
                />
              </label>
              {error && (
                <p className="text-sm text-destructive" role="alert">
                  {error}
                </p>
              )}
              <button className="btn-primary w-full">
                Prepare WhatsApp request <MessageCircle size={18} aria-hidden="true" />
              </button>
            </>
          )}
        </form>
        <div className="rounded-2xl border bg-card p-7">
          <div className="flex items-center gap-2 font-bold">
            <CalendarDays className="text-primary" /> Book a Strategy Call
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            30 min · Google Meet · East Africa Time · Request a preferred slot
          </p>
          <div className="mt-6 grid grid-cols-5 gap-2">
            {days.map((d, i) => (
              <button
                key={d.toISOString()}
                type="button"
                onClick={() => setDay(i)}
                aria-pressed={day === i}
                aria-label={`Choose ${d.toLocaleDateString("en-KE", { weekday: "long", month: "long", day: "numeric" })}`}
                className={`rounded-xl border p-3 text-center transition ${day === i ? "border-primary bg-secondary" : "hover:border-primary/50"}`}
              >
                <div className="text-xs text-muted-foreground">
                  {d.toLocaleDateString("en", { weekday: "short" })}
                </div>
                <div className="text-lg font-bold">{d.getDate()}</div>
              </button>
            ))}
          </div>
          <div className="mt-6 grid grid-cols-3 gap-2">
            {slots.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSlot(s)}
                aria-pressed={slot === s}
                className={`rounded-lg border py-2 text-sm transition ${slot === s ? "bg-gradient-accent text-accent-foreground" : "hover:border-primary/50"}`}
              >
                {s}
              </button>
            ))}
          </div>
          <p className="mt-6 text-sm text-muted-foreground">
            {slot ? (
              <>
                Preferred time:{" "}
                <span className="text-foreground">
                  {days[day]?.toLocaleDateString("en-KE", {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                  })}{" "}
                  at {slot} EAT
                </span>{" "}
                — we’ll confirm availability on WhatsApp.
              </>
            ) : (
              "Choose a preferred day and time. Your appointment is confirmed after we reply."
            )}
          </p>
          <WhatsAppLink className="btn-ghost mt-5 w-full" />
        </div>
      </div>
    </section>
  );
}
