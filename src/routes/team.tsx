import { createFileRoute } from "@tanstack/react-router";
import { Github, Linkedin, Mail, MessageCircle } from "lucide-react";

import { SectionHead } from "@/components/site/Sections";
import { WhatsAppLink } from "@/components/site/WhatsAppLink";
import { pageHead } from "@/lib/seo";

type TeamMember = {
  name: string;
  role: string;
  statement: string;
  hasGithub: boolean;
  whatsappNumber?: string;
  email?: string;
  linkedinUrl?: string;
  githubUrl?: string;
};

const members: TeamMember[] = [
  {
    name: "Marvel Ouma",
    role: "CEO, Marketing Manager & Founder",
    statement:
      "I set the direction for JuveTech Media and lead marketing strategies that help our clients grow.",
    hasGithub: true,
    whatsappNumber: "254757544494",
    email: "marvelprouma@icloud.com",
    linkedinUrl: "https://www.linkedin.com/in/marvel-ouma-825b25291/",
    githubUrl: "https://github.com/MarvelPrOuma-byte",
  },
  {
    name: "Shaine Valentine",
    role: "Co-Founder & COO",
    statement:
      "I manage daily operations and help our team deliver a smooth, dependable client experience.",
    hasGithub: false,
    whatsappNumber: "254757544494",
  },
  {
    name: "Bill Shadrack",
    role: "CFO",
    statement:
      "I oversee our finances and help make sure every investment supports sustainable growth.",
    hasGithub: true,
  },
  {
    name: "Dorothy Ouma",
    role: "Head of Client Services / Account Director",
    statement:
      "I guide client relationships, turning business goals into clear plans and dependable support.",
    hasGithub: false,
    whatsappNumber: "254726400240",
  },
  {
    name: "William Ouma",
    role: "Head of Performance Marketing / Paid Media Lead",
    statement:
      "I plan and optimize paid media campaigns so our clients can reach the right people and measure results.",
    hasGithub: false,
    whatsappNumber: "254798883533",
  },
  {
    name: "Lesther Sheldon",
    role: "Head of SEO & Organic Growth",
    statement:
      "I lead SEO and organic growth, helping our clients get discovered with useful content and stronger search visibility.",
    hasGithub: true,
  },
];

export const Route = createFileRoute("/team")({
  head: () =>
    pageHead(
      "/team",
      "Meet the JuveTech Media Team | Digital Marketing Agency Kenya",
      "Meet the JuveTech Media team: marketing strategists, client service leaders, performance marketers, and SEO specialists helping Kenyan businesses grow.",
      [
        "JuveTech Media team",
        "digital marketing agency Kenya",
        "SEO and organic growth",
        "performance marketing",
      ],
    ),
  component: TeamPage,
});

function TeamPage() {
  return (
    <>
      <section className="mx-auto max-w-7xl px-5 py-20">
        <SectionHead
          eyebrow="The people behind the work"
          title="Meet the JuveTech Media team"
          sub="A digital marketing team bringing strategy, client care, paid media, and SEO together to help ambitious businesses grow."
          primary
        />
        <div className="team-grid mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {members.map((member, index) => {
            const initials = member.name
              .split(" ")
              .map((part) => part[0])
              .join("");
            const linkedin =
              member.linkedinUrl ??
              `https://www.linkedin.com/search/results/people/?keywords=${encodeURIComponent(member.name)}`;
            const github =
              member.githubUrl ??
              `https://github.com/search?q=${encodeURIComponent(member.name)}&type=users`;

            return (
              <article
                className="team-card group relative overflow-hidden rounded-2xl border bg-card"
                key={member.name}
              >
                <div
                  className={`team-portrait team-portrait-${index + 1} relative grid place-items-center`}
                >
                  <span aria-hidden="true">{initials}</span>
                  <p className="team-portrait-note">Team portrait</p>
                  <div className="team-quote" aria-label={`${member.name} on their role`}>
                    <span className="text-xs font-semibold uppercase tracking-[0.18em]">
                      My role at JuveTech Media
                    </span>
                    <p className="mt-3 text-lg font-semibold leading-relaxed">{member.statement}</p>
                  </div>
                </div>
                <div className="p-6">
                  <h2 className="text-xl font-bold">{member.name}</h2>
                  <p className="mt-1 min-h-12 text-sm leading-6 text-muted-foreground">
                    {member.role}
                  </p>
                  <nav className="mt-5 flex gap-2" aria-label={`${member.name} contact links`}>
                    <a
                      className="team-contact-link"
                      href={`https://wa.me/${member.whatsappNumber ?? "254757544494"}`}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`WhatsApp ${member.name}`}
                      title="WhatsApp"
                    >
                      <MessageCircle aria-hidden="true" />
                    </a>
                    <a
                      className="team-contact-link"
                      href={`mailto:${member.email ?? "juvetechmedia@gmail.com"}`}
                      aria-label={`Email ${member.name}`}
                      title="Email"
                    >
                      <Mail aria-hidden="true" />
                    </a>
                    <a
                      className="team-contact-link"
                      href={linkedin}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${member.linkedinUrl ? "View" : "Search"} LinkedIn ${
                        member.linkedinUrl ? "profile" : "for"
                      } ${member.name}`}
                      title={member.linkedinUrl ? "LinkedIn profile" : "LinkedIn search"}
                    >
                      <Linkedin aria-hidden="true" />
                    </a>
                    {member.hasGithub && (
                      <a
                        className="team-contact-link"
                        href={github}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`${member.githubUrl ? "View" : "Search"} GitHub ${
                          member.githubUrl ? "profile" : "for"
                        } ${member.name}`}
                        title={member.githubUrl ? "GitHub profile" : "GitHub search"}
                      >
                        <Github aria-hidden="true" />
                      </a>
                    )}
                  </nav>
                </div>
              </article>
            );
          })}
        </div>
      </section>
      <section className="border-y bg-secondary">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-5 px-5 py-12 md:flex-row md:items-center">
          <div>
            <h2 className="text-2xl font-bold">Ready to meet your growth team?</h2>
            <p className="mt-2 text-muted-foreground">
              Tell us what you want to achieve and we’ll help plan the next step.
            </p>
          </div>
          <WhatsAppLink />
        </div>
      </section>
    </>
  );
}
