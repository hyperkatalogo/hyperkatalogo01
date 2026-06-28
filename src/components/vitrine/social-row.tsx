import type { ReactNode } from "react";
import { Instagram } from "lucide-react";
import { TikTokIcon, WhatsAppIcon } from "./icons";

type SocialLink = {
  label: string;
  href: string;
  icon: ReactNode;
  external?: boolean;
};

const SOCIAL_LINKS: SocialLink[] = [
  {
    label: "Instagram",
    href: "https://instagram.com/hyperkatalogo",
    icon: <Instagram className="h-5 w-5" />,
    external: true,
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/556793053894",
    icon: <WhatsAppIcon className="h-5 w-5" />,
    external: true,
  },
  {
    label: "TikTok",
    href: "#",
    icon: <TikTokIcon className="h-5 w-5" />,
  },
];

const iconClassName =
  "flex h-11 w-11 items-center justify-center rounded-full border border-[#007AFF]/40 bg-transparent text-white transition-all hover:border-[#007AFF] hover:bg-[#007AFF]/10 hover:shadow-[0_0_16px_rgba(0,122,255,0.35)]";

export function SocialRow() {
  return (
    <section className="flex flex-col items-center">
      <p className="mb-2 mt-8 text-center text-xs font-medium tracking-wider text-gray-500 uppercase">
        CLIQUE PARA INTERAGIR COM A PÁGINA
      </p>

      <p className="font-display text-sm font-semibold tracking-[0.25em] uppercase">Fale Conosco</p>

      <div className="mt-4 flex justify-center gap-4">
        {SOCIAL_LINKS.map(({ label, href, icon, external }) =>
          external ? (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className={iconClassName}
            >
              {icon}
            </a>
          ) : (
            <span key={label} aria-label={label} className={iconClassName}>
              {icon}
            </span>
          ),
        )}
      </div>
    </section>
  );
}
