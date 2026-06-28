import { jsx, jsxs } from "react/jsx-runtime";
import { useQuery } from "@tanstack/react-query";
import { Loader2, Phone, Instagram, ExternalLink, Facebook, Shirt, Tag, Package, Ruler } from "lucide-react";
import { R as Route, s as supabaseExternal } from "./router-DoVWgnuL.js";
import "@tanstack/react-router";
import "react";
import "@supabase/supabase-js";
import "sonner";
const CURRENCY_SYMBOL = {
  BRL: "R$",
  USD: "$",
  EUR: "€",
  GBP: "£",
  ARS: "$ ARS",
  MXN: "$ MXN",
  CLP: "CLP"
};
function CatalogPage() {
  const {
    slug
  } = Route.useParams();
  const {
    data,
    isLoading,
    error
  } = useQuery({
    queryKey: ["catalog", slug],
    queryFn: async () => {
      const {
        data: data2,
        error: error2
      } = await supabaseExternal.from("lojas").select("*").eq("slug", slug).maybeSingle();
      if (error2) throw error2;
      if (!data2) throw new Error("not_found");
      return data2;
    }
  });
  if (isLoading) {
    return /* @__PURE__ */ jsx("div", { className: "flex min-h-screen items-center justify-center bg-background", children: /* @__PURE__ */ jsx(Loader2, { className: "h-6 w-6 animate-spin text-muted-foreground" }) });
  }
  if (error || !data) {
    const isNotFound = error instanceof Error && error.message === "not_found";
    return /* @__PURE__ */ jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold text-foreground", children: isNotFound ? "Catálogo não encontrado" : "Erro" }),
      /* @__PURE__ */ jsx("p", { className: "mt-2 text-muted-foreground", children: isNotFound ? "O link pode estar incorreto ou o catálogo foi removido." : error instanceof Error ? error.message : "Não foi possível carregar o catálogo." })
    ] }) });
  }
  const store = data;
  const accent = store.cor_destaque ?? "#22c55e";
  const modulos = store.modulos ?? {};
  const categorias = modulos.categorias ?? {};
  const moduleLinks = modulos.extras_links ?? {};
  const moeda = modulos.moeda ?? "BRL";
  const currencySymbol = CURRENCY_SYMBOL[moeda] ?? "R$";
  const activeModules = Object.entries(categorias).filter(([, v]) => v).map(([k]) => k);
  const activeLeagues = Object.entries(store.ligas ?? {}).filter(([, v]) => v).map(([k]) => k);
  const prices = store.precos ?? {};
  const waNumber = (store.whatsapp ?? "").replace(/\D/g, "");
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsx("header", { className: "border-b border-border/60", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto flex max-w-3xl items-center justify-between px-6 py-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
        store.logo_url ? /* @__PURE__ */ jsx("img", { src: store.logo_url, alt: store.nome_loja, className: "h-10 w-10 rounded-lg object-contain" }) : /* @__PURE__ */ jsx("div", { className: "flex h-10 w-10 items-center justify-center rounded-lg text-white font-bold text-sm", style: {
          backgroundColor: accent
        }, children: store.nome_loja.charAt(0).toUpperCase() }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h1", { className: "text-lg font-semibold text-foreground leading-tight", children: store.nome_loja }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: "Catálogo digital" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("a", { href: `https://wa.me/${waNumber}`, target: "_blank", rel: "noopener noreferrer", className: "inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90", style: {
        backgroundColor: accent
      }, children: [
        /* @__PURE__ */ jsx(Phone, { className: "h-4 w-4" }),
        "Pedir no WhatsApp"
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs("main", { className: "mx-auto max-w-3xl px-6 py-8 pb-20", children: [
      (store.instagram || store.facebook || store.tiktok) && /* @__PURE__ */ jsxs("div", { className: "mb-8 flex flex-wrap gap-3", children: [
        store.instagram && /* @__PURE__ */ jsxs("a", { href: store.instagram, target: "_blank", rel: "noopener noreferrer", className: "inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-4 py-2 text-sm text-foreground hover:bg-accent transition-colors", children: [
          /* @__PURE__ */ jsx(Instagram, { className: "h-4 w-4" }),
          "Instagram",
          /* @__PURE__ */ jsx(ExternalLink, { className: "h-3 w-3 text-muted-foreground" })
        ] }),
        store.facebook && /* @__PURE__ */ jsxs("a", { href: store.facebook, target: "_blank", rel: "noopener noreferrer", className: "inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-4 py-2 text-sm text-foreground hover:bg-accent transition-colors", children: [
          /* @__PURE__ */ jsx(Facebook, { className: "h-4 w-4" }),
          "Facebook",
          /* @__PURE__ */ jsx(ExternalLink, { className: "h-3 w-3 text-muted-foreground" })
        ] }),
        store.tiktok && /* @__PURE__ */ jsxs("a", { href: store.tiktok, target: "_blank", rel: "noopener noreferrer", className: "inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-4 py-2 text-sm text-foreground hover:bg-accent transition-colors", children: [
          /* @__PURE__ */ jsx("svg", { className: "h-4 w-4", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" }) }),
          "TikTok",
          /* @__PURE__ */ jsx(ExternalLink, { className: "h-3 w-3 text-muted-foreground" })
        ] })
      ] }),
      activeModules.length > 0 && /* @__PURE__ */ jsxs("section", { className: "mb-8", children: [
        /* @__PURE__ */ jsxs("h2", { className: "mb-4 flex items-center gap-2 text-lg font-semibold text-foreground", children: [
          /* @__PURE__ */ jsx(Shirt, { className: "h-5 w-5", style: {
            color: accent
          } }),
          "Módulos"
        ] }),
        /* @__PURE__ */ jsx("div", { className: "grid gap-3 sm:grid-cols-2", children: activeModules.map((mod) => /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between rounded-xl border border-border bg-card p-4", children: [
          /* @__PURE__ */ jsx("span", { className: "text-sm font-medium text-foreground", children: mod }),
          moduleLinks[mod] && /* @__PURE__ */ jsxs("a", { href: moduleLinks[mod], target: "_blank", rel: "noopener noreferrer", className: "text-xs text-muted-foreground hover:text-foreground flex items-center gap-1", children: [
            "Ver ",
            /* @__PURE__ */ jsx(ExternalLink, { className: "h-3 w-3" })
          ] })
        ] }, mod)) })
      ] }),
      activeLeagues.length > 0 && /* @__PURE__ */ jsxs("section", { className: "mb-8", children: [
        /* @__PURE__ */ jsxs("h2", { className: "mb-4 flex items-center gap-2 text-lg font-semibold text-foreground", children: [
          /* @__PURE__ */ jsx(Tag, { className: "h-5 w-5", style: {
            color: accent
          } }),
          "Ligas"
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: activeLeagues.map((league) => /* @__PURE__ */ jsx("span", { className: "rounded-full px-4 py-1.5 text-sm font-medium text-white", style: {
          backgroundColor: accent
        }, children: league }, league)) })
      ] }),
      prices && Object.keys(prices).some((k) => prices[k]) && /* @__PURE__ */ jsxs("section", { className: "mb-8", children: [
        /* @__PURE__ */ jsxs("h2", { className: "mb-4 flex items-center gap-2 text-lg font-semibold text-foreground", children: [
          /* @__PURE__ */ jsx(Package, { className: "h-5 w-5", style: {
            color: accent
          } }),
          "Preços"
        ] }),
        /* @__PURE__ */ jsx("div", { className: "grid gap-3 sm:grid-cols-2", children: Object.entries(prices).filter(([, v]) => v).map(([category, price]) => /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between rounded-xl border border-border bg-card p-4", children: [
          /* @__PURE__ */ jsx("span", { className: "text-sm text-foreground", children: category }),
          /* @__PURE__ */ jsxs("span", { className: "text-sm font-bold", style: {
            color: accent
          }, children: [
            currencySymbol,
            " ",
            price
          ] })
        ] }, category)) })
      ] }),
      Object.entries(moduleLinks).filter(([k]) => !activeModules.includes(k) && k).filter(([, v]) => v).length > 0 && /* @__PURE__ */ jsxs("section", { className: "mb-8", children: [
        /* @__PURE__ */ jsxs("h2", { className: "mb-4 flex items-center gap-2 text-lg font-semibold text-foreground", children: [
          /* @__PURE__ */ jsx(Ruler, { className: "h-5 w-5", style: {
            color: accent
          } }),
          "Links úteis"
        ] }),
        /* @__PURE__ */ jsx("div", { className: "space-y-3", children: Object.entries(moduleLinks).filter(([k]) => !activeModules.includes(k) && k).filter(([, v]) => v).map(([label, url]) => /* @__PURE__ */ jsxs("a", { href: url, target: "_blank", rel: "noopener noreferrer", className: "flex items-center justify-between rounded-xl border border-border bg-card p-4 text-sm text-foreground hover:bg-accent transition-colors", children: [
          /* @__PURE__ */ jsx("span", { children: label }),
          /* @__PURE__ */ jsx(ExternalLink, { className: "h-4 w-4 text-muted-foreground" })
        ] }, label)) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mt-10 flex justify-center", children: /* @__PURE__ */ jsxs("a", { href: `https://wa.me/${waNumber}`, target: "_blank", rel: "noopener noreferrer", className: "inline-flex items-center gap-2 rounded-xl px-8 py-3 text-base font-semibold text-white shadow-lg transition-opacity hover:opacity-90", style: {
        backgroundColor: accent
      }, children: [
        /* @__PURE__ */ jsx(Phone, { className: "h-5 w-5" }),
        "Fazer pedido pelo WhatsApp"
      ] }) })
    ] }),
    /* @__PURE__ */ jsx("footer", { className: "border-t border-border/60 py-6 text-center text-xs text-muted-foreground", children: "Catálogo criado com HyperKatalogo" })
  ] });
}
export {
  CatalogPage as component
};
