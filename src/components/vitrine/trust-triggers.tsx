import { Check, Timer } from "lucide-react";

const TRIGGERS = ["Envio Nacional", "Pronta Entrega", "Qualidade Premium", "Frete Expresso"] as const;

const TRIGGER_ICONS = {
  "Envio Nacional": Check,
  "Pronta Entrega": Check,
  "Qualidade Premium": Check,
  "Frete Expresso": Timer,
} as const;

export function TrustTriggers() {
  return (
    <div className="mt-6 flex w-full flex-wrap justify-center gap-x-4 gap-y-2 px-2 text-[10px] font-medium tracking-wider text-gray-400 uppercase">
      {TRIGGERS.map((label) => {
        const Icon = TRIGGER_ICONS[label];
        return (
          <span key={label} className="flex items-center gap-1">
            <Icon className="h-3 w-3 shrink-0 text-[#007AFF]" strokeWidth={3} />
            {label}
          </span>
        );
      })}
    </div>
  );
}
