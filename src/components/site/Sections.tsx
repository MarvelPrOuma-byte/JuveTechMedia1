import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  Monitor,
  Search,
  Clapperboard,
  Palette,
  Smartphone,
  Share2,
  MapPin,
  Check,
  ArrowRight,
  CalendarDays,
  ArrowUpRight,
  Globe,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatPackagePrice, individualServices } from "@/lib/pricing";
import { serviceDetails } from "@/lib/services";
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
          JuveTech Media is a digital marketing agency in Kenya. We help businesses grow with SEO,
          paid media, web design, and creative. One team. Less noise. More impact.
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

const serviceIcons = {
  "social-media": Share2,
  "video-production": Clapperboard,
  "web-design": Monitor,
  "app-development": Smartphone,
  seo: Search,
  branding: Palette,
  "local-seo": MapPin,
} as const;

export function Services({ primary = false }: { primary?: boolean }) {
  return (
    <section className="mx-auto max-w-7xl px-5 py-20">
      <SectionHead
        eyebrow="What we do"
        title="Digital services for your next stage of growth"
        sub="Explore each service, review its starting price, and open the detail page for more."
        primary={primary}
      />
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {serviceDetails.map((service) => {
          const Icon = serviceIcons[service.id];
          const price = individualServices.find((item) => item.id === service.pricingId);
          return (
            <article
              key={service.id}
              className="service-card group rounded-2xl border bg-card p-6 transition duration-300 hover:border-primary"
            >
              <div className="grid h-12 w-12 place-items-center rounded-lg bg-secondary text-primary">
                <Icon size={22} aria-hidden="true" />
              </div>
              <h3 className="mt-5 text-lg font-bold">{service.title}</h3>
              <details className="mt-3 border-t pt-3">
                <summary className="cursor-pointer text-sm font-semibold text-primary">
                  Explore service
                </summary>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{service.summary}</p>
                {price && (
                  <p className="mt-3 text-sm">
                    From <span className="font-semibold">{formatPackagePrice(price.amount)}</span>{" "}
                    {price.period}
                  </p>
                )}
              </details>
              <Link
                to="/services/$serviceId"
                params={{ serviceId: service.id }}
                className="btn-ghost mt-4 w-full justify-center"
              >
                View full service details <ArrowUpRight aria-hidden="true" />
              </Link>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export function ClientSpotlight() {
  return (
    <section className="border-y bg-secondary">
      <div className="mx-auto grid max-w-7xl gap-6 px-5 py-14 md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <p className="text-sm font-semibold text-primary">Client spotlight</p>
          <h2 className="mt-2 text-2xl font-bold">King Solomon Comprehensive School</h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
            JuveTech Media worked with the school on a website project. Franc Oyugi, Director, is
            listed as the client contact in the project portfolio.
          </p>
        </div>
        <Button asChild variant="outline">
          <Link to="/portfolio">
            View the project <ArrowUpRight aria-hidden="true" />
          </Link>
        </Button>
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const days = getAvailableBookingDays();

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const f = new FormData(form);
    const name = String(f.get("name") || "").trim();
    const email = String(f.get("email") || "").trim();
    const website = String(f.get("website") || "").trim();
    const service = String(f.get("service") || "").trim();
    const msg = String(f.get("message") || "").trim();
    if (!name || name.length > 100) return setError("Please enter your name (max 100 characters).");
    if (!/^\S+@\S+\.\S+$/.test(email) || email.length > 254)
      return setError("Please enter a valid email.");
    if (website.length > 255) return setError("Website URL must be under 255 characters.");
    if (!service) return setError("Please choose a service.");
    if (!msg || msg.length > 1000)
      return setError("Please tell us about your project (max 1000 characters).");
    if (!slot) return setError("Please select a preferred day and time for your strategy call.");
    const selectedDay = days[day];
    if (!selectedDay) return setError("Please select an available day.");

    setError("");
    setIsSubmitting(true);
    try {
      const callDate = selectedDay.toLocaleDateString("en-KE", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          website,
          service,
          message: msg,
          callDate,
          callTime: slot,
        }),
      });
      const result: unknown = await response.json();
      if (
        typeof result !== "object" ||
        result === null ||
        !("success" in result) ||
        result.success !== true ||
        !("message" in result) ||
        typeof result.message !== "string"
      ) {
        const message =
          typeof result === "object" &&
          result !== null &&
          "message" in result &&
          typeof result.message === "string"
            ? result.message
            : "We couldn't save your inquiry. Please try again later.";
        throw new Error(message);
      }

      setRequestUrl(
        buildInquiryWhatsAppUrl({
          name,
          email,
          ...(website ? { website } : {}),
          service,
          message: msg,
          callDate,
          callTime: slot,
        }),
      );
    } catch (submitError) {
      console.error("Inquiry submission failed.", submitError);
      setError(
        submitError instanceof Error
          ? submitError.message
          : "We couldn't email your inquiry. Please try again later.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="mx-auto max-w-7xl px-5 py-20">
      <SectionHead
        eyebrow="Let's talk"
        title="Book a Digital Marketing Strategy Call"
        sub="Request a free 30-minute strategy call. Your inquiry will be emailed to our team, and you can also open WhatsApp with your details ready."
        primary={primary}
      />
      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        <form onSubmit={submit} className="space-y-4 rounded-2xl border bg-card p-7">
          {requestUrl ? (
            <div className="py-12 text-center" role="status" aria-live="polite">
              <Check className="mx-auto text-primary" size={40} />
              <h3 className="mt-4 text-xl font-bold">Your inquiry was sent</h3>
              <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
                Your inquiry has been emailed to info@juvetechmedia.co.ke. You can also send the
                prepared details on WhatsApp. Your selected time is a preference, not a confirmed
                booking; we’ll confirm by replying.
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
                    maxLength={254}
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
                  {serviceDetails.map((service) => (
                    <option key={service.id}>{service.title}</option>
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
              <button className="btn-primary w-full" disabled={isSubmitting}>
                {isSubmitting ? "Sending your request…" : "Email request and continue to WhatsApp"}{" "}
                <MessageCircle size={18} aria-hidden="true" />
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
