import { WhatsAppIcon } from "./icons";

type WhatsAppFabProps = {
  href?: string;
};

export function WhatsAppFab({ href = "#" }: WhatsAppFabProps) {
  return (
    <a
      href={href}
      aria-label="Falar no WhatsApp"
      className="fixed right-6 bottom-6 z-50 rounded-full bg-[#25D366] p-4 text-white shadow-[0_0_20px_rgba(37,211,102,0.5)] transition-transform hover:scale-105 active:scale-95"
    >
      <WhatsAppIcon className="h-6 w-6" />
    </a>
  );
}
