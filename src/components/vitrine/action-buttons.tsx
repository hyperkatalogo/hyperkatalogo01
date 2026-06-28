import { Ruler, Truck } from "lucide-react";

export function ActionButtons() {
  return (
    <section className="mt-8 w-full px-4">
      <button
        type="button"
        className="flex h-14 w-full items-center justify-center gap-2 rounded-full bg-[#007AFF] text-sm font-bold text-white shadow-[0_4px_14px_0_rgba(0,122,255,0.39)] transition-transform active:scale-[0.98]"
      >
        <Ruler className="h-5 w-5 shrink-0" />
        Clique aqui e veja a tabela de medidas
      </button>

      <button
        type="button"
        className="mt-3 flex h-14 w-full items-center justify-center gap-2 rounded-full border border-[#007AFF]/50 bg-white/5 text-sm font-semibold text-white backdrop-blur-md transition-all hover:border-[#007AFF]/80 hover:bg-white/10 active:scale-[0.98]"
      >
        <Truck className="h-5 w-5 shrink-0" />
        Rastreie o seu pedido clicando aqui
      </button>
    </section>
  );
}
