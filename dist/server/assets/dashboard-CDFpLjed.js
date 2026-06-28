import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { useNavigate, Navigate } from "@tanstack/react-router";
import * as React from "react";
import { useState } from "react";
import { Lock, ArrowRight, Loader2, LogOut, Store, Play, Palette, ArrowLeft, Check, Upload, Instagram, Facebook } from "lucide-react";
import { toast } from "sonner";
import { u as useAuth, s as supabaseExternal } from "./router-kFeOdKkp.js";
import { B as Button, c as cn, L as Label, I as Input } from "./label-D-0vr4cf.js";
import * as SwitchPrimitives from "@radix-ui/react-switch";
import "@tanstack/react-query";
import "@supabase/supabase-js";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "@radix-ui/react-label";
import "clsx";
import "tailwind-merge";
function DashboardCard({
  title,
  description,
  isLocked,
  icon,
  buttonText,
  onAction,
  accentColor = "#22c55e",
  className,
  videoSrc
}) {
  if (isLocked && videoSrc) {
    return /* @__PURE__ */ jsxs(
      "div",
      {
        className: cn(
          "group relative flex flex-col overflow-hidden rounded-2xl border border-border/40 bg-slate-900 transition-all duration-300",
          className
        ),
        children: [
          /* @__PURE__ */ jsxs("div", { className: "relative h-80 w-full bg-black", children: [
            /* @__PURE__ */ jsx(
              "video",
              {
                className: "h-full w-full object-contain",
                autoPlay: true,
                loop: true,
                muted: true,
                playsInline: true,
                children: /* @__PURE__ */ jsx("source", { src: videoSrc, type: "video/mp4" })
              }
            ),
            /* @__PURE__ */ jsx("div", { className: "absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 ring-1 ring-white/20 backdrop-blur", children: /* @__PURE__ */ jsx(Lock, { className: "h-4 w-4 text-white/90" }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-1 flex-col bg-slate-900 p-6", children: [
            /* @__PURE__ */ jsx("div", { className: "flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-white ring-1 ring-white/15", children: icon }),
            /* @__PURE__ */ jsx("h3", { className: "mt-4 text-lg font-semibold text-white", children: title }),
            /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm leading-relaxed text-white/70", children: description }),
            /* @__PURE__ */ jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsx(
              Button,
              {
                onClick: onAction,
                variant: "outline",
                className: "w-full border-white/20 bg-white/10 text-white backdrop-blur hover:bg-white/20",
                children: buttonText
              }
            ) })
          ] })
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: cn(
        "group relative flex flex-col overflow-hidden rounded-2xl border border-emerald-500/30 bg-card shadow-lg shadow-emerald-500/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-emerald-500/20",
        className
      ),
      children: [
        isLocked && /* @__PURE__ */ jsx("div", { className: "absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 ring-1 ring-white/10 backdrop-blur", children: /* @__PURE__ */ jsx(Lock, { className: "h-4 w-4 text-white/90" }) }),
        /* @__PURE__ */ jsxs("div", { className: "relative z-10 flex flex-1 flex-col p-6", children: [
          /* @__PURE__ */ jsx(
            "div",
            {
              className: "flex h-12 w-12 items-center justify-center rounded-xl text-white",
              style: { backgroundColor: accentColor },
              children: icon
            }
          ),
          /* @__PURE__ */ jsx("h3", { className: "mt-4 text-lg font-semibold text-foreground", children: title }),
          /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm leading-relaxed text-muted-foreground", children: description })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "relative z-10 p-6 pt-0", children: /* @__PURE__ */ jsxs(
          Button,
          {
            onClick: onAction,
            className: "w-full text-white transition-all duration-200 hover:opacity-90",
            style: { backgroundColor: accentColor },
            children: [
              buttonText,
              /* @__PURE__ */ jsx(ArrowRight, { className: "ml-2 h-4 w-4" })
            ]
          }
        ) })
      ]
    }
  );
}
const Switch = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SwitchPrimitives.Root,
  {
    className: cn(
      "peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
      className
    ),
    ...props,
    ref,
    children: /* @__PURE__ */ jsx(
      SwitchPrimitives.Thumb,
      {
        className: cn(
          "pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0"
        )
      }
    )
  }
));
Switch.displayName = SwitchPrimitives.Root.displayName;
const STEPS = [{
  n: 1,
  title: "Identidade",
  desc: "Nome da loja, WhatsApp"
}, {
  n: 2,
  title: "Visual",
  desc: "Cor de destaque do catálogo"
}, {
  n: 3,
  title: "Módulos",
  desc: "Ative categorias e links úteis"
}, {
  n: 4,
  title: "Ligas",
  desc: "Escolha quais ligas aparecem"
}, {
  n: 5,
  title: "Preços",
  desc: "Informe os valores dos produtos"
}];
const MODULES = ["Modelo Torcedor", "Modelo Jogador", "Retrô", "Kids", "Feminino", "Agasalhos", "Treino", "Jaquetas", "Lançamentos 26/27", "Copa 2026"];
const EXTRA_MODULES = ["Tabela de Medidas", "Rastreio de Pedido"];
const EXTRA_MODULE_LINKS = {
  "Tabela de Medidas": {
    label: "Link da tabela de medidas (opcional)",
    placeholder: "https://..."
  },
  "Rastreio de Pedido": {
    label: "Link de rastreio (opcional)",
    placeholder: "https://..."
  }
};
const LEAGUES = ["Seleções Mundiais", "Brasileirão", "La Liga", "Premier League", "Serie A", "Ligue 1", "Bundesliga", "Liga Portugal", "Resto do Mundo"];
const CURRENCIES = [{
  code: "BRL",
  symbol: "R$"
}, {
  code: "USD",
  symbol: "$"
}, {
  code: "EUR",
  symbol: "€"
}, {
  code: "GBP",
  symbol: "£"
}, {
  code: "ARS",
  symbol: "$ ARS"
}, {
  code: "MXN",
  symbol: "$ MXN"
}, {
  code: "CLP",
  symbol: "CLP"
}];
const PRICE_CATEGORIES = ["Camisa Torcedor", "Camisa Jogador", "Manga Longa", "Retrô", "Agasalhos", "Kids", "Treino", "Shorts", "Personalização", "Copa 2026", "Lançamentos 26/27"];
const PRESET_COLORS = ["#22c55e", "#3b82f6", "#ef4444", "#f59e0b", "#a855f7", "#ec4899", "#14b8a6", "#0ea5e9", "#facc15", "#000000"];
function DashboardPage() {
  const {
    user,
    session,
    loading,
    signOut
  } = useAuth();
  const navigate = useNavigate();
  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(1);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    name: "",
    whatsapp: "",
    logoUrl: "",
    instagram: "",
    facebook: "",
    tiktok: "",
    accentColor: "#22c55e",
    modules: {},
    moduleLinks: {},
    leagues: {},
    currency: "BRL",
    prices: {}
  });
  if (loading) {
    return /* @__PURE__ */ jsx("div", { className: "flex min-h-screen items-center justify-center bg-background", children: /* @__PURE__ */ jsx(Loader2, { className: "h-6 w-6 animate-spin text-muted-foreground" }) });
  }
  if (!session) return /* @__PURE__ */ jsx(Navigate, { to: "/login" });
  const handleSignOut = async () => {
    await signOut();
    navigate({
      to: "/login"
    });
  };
  const update = (k, v) => setForm((f) => ({
    ...f,
    [k]: v
  }));
  const toggleModule = (m) => setForm((f) => ({
    ...f,
    modules: {
      ...f.modules,
      [m]: !f.modules[m]
    }
  }));
  const toggleLeague = (l) => setForm((f) => ({
    ...f,
    leagues: {
      ...f.leagues,
      [l]: !f.leagues[l]
    }
  }));
  const handleLogoUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => update("logoUrl", String(reader.result ?? ""));
    reader.readAsDataURL(file);
  };
  const canAdvance = () => {
    if (step === 1) return form.name.trim() && form.whatsapp.trim();
    return true;
  };
  const next = () => {
    if (!canAdvance()) {
      toast.error("Preencha os campos obrigatórios");
      return;
    }
    setStep((s) => Math.min(5, s + 1));
  };
  const back = () => setStep((s) => Math.max(1, s - 1));
  const generateSlug = (name) => {
    const base = name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
    const suffix = Math.random().toString(36).slice(2, 7);
    return `${base}-${suffix}`;
  };
  const submit = async () => {
    console.log("[dashboard] submit clicked", {
      userId: user?.id,
      session: !!session
    });
    const uid = user?.id ?? session?.user?.id;
    if (!uid) {
      toast.error("Sessão expirada. Faça login novamente.");
      return;
    }
    setSaving(true);
    const loadingId = toast.loading("Salvando catálogo...");
    try {
      const slug = generateSlug(form.name);
      const payload = {
        user_id: uid,
        nome_loja: form.name,
        whatsapp: form.whatsapp,
        logo_url: form.logoUrl || null,
        instagram: form.instagram || null,
        facebook: form.facebook || null,
        tiktok: form.tiktok || null,
        cor_destaque: form.accentColor,
        modulos: {
          categorias: form.modules,
          extras_links: form.moduleLinks,
          moeda: form.currency
        },
        ligas: form.leagues,
        precos: form.prices,
        slug
      };
      const {
        error,
        data
      } = await supabaseExternal.from("lojas").insert(payload).select("slug").single();
      console.log("[dashboard] insert lojas result", {
        payload,
        error,
        data
      });
      toast.dismiss(loadingId);
      if (error) {
        toast.error("Erro ao salvar: " + error.message);
        return;
      }
      toast.success("Catálogo criado com sucesso!");
      navigate({
        to: "/catalog/$slug",
        params: {
          slug: data?.slug ?? slug
        }
      });
    } catch (e) {
      toast.dismiss(loadingId);
      console.error("[dashboard] submit exception", e);
      toast.error("Erro inesperado ao salvar");
    } finally {
      setSaving(false);
    }
  };
  const currencySymbol = CURRENCIES.find((c) => c.code === form.currency)?.symbol ?? "R$";
  const [view, setView] = useState("showroom");
  const goToWizard = () => {
    setStarted(false);
    setStep(1);
    setView("wizard");
  };
  const goToShowroom = () => {
    setView("showroom");
  };
  const handleUnlock = (feature) => {
    toast.info(`Em breve redirecionamento para o checkout — ${feature}`);
  };
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsx("header", { className: "border-b border-border/60", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto flex max-w-5xl items-center justify-between px-6 py-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx("div", { className: "flex h-9 w-9 items-center justify-center rounded-lg bg-primary/15 text-primary", children: /* @__PURE__ */ jsx("span", { className: "text-sm font-bold tracking-tight", children: "HK" }) }),
        /* @__PURE__ */ jsx("span", { className: "text-lg font-semibold text-foreground", children: "HyperKatalogo" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsx("span", { className: "hidden text-sm text-muted-foreground sm:inline", children: user?.email }),
        /* @__PURE__ */ jsxs(Button, { variant: "outline", size: "sm", onClick: handleSignOut, children: [
          /* @__PURE__ */ jsx(LogOut, { className: "h-4 w-4" }),
          "Sair"
        ] })
      ] })
    ] }) }),
    view === "showroom" ? /* @__PURE__ */ jsxs("main", { className: "mx-auto max-w-5xl px-6 py-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
        /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold tracking-tight text-foreground", children: "Painel do Lojista" }),
        /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Escolha uma ferramenta para impulsionar suas vendas" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid gap-6 sm:grid-cols-2 lg:grid-cols-3", children: [
        /* @__PURE__ */ jsx(DashboardCard, { title: "Meu Catálogo Digital", description: "Crie, edite e gerencie os produtos da sua vitrine.", isLocked: false, icon: /* @__PURE__ */ jsx(Store, { className: "h-6 w-6" }), buttonText: "Acessar", onAction: goToWizard, accentColor: "#22c55e" }),
        /* @__PURE__ */ jsx(DashboardCard, { title: "Pack Premium: Vídeos de Camisas", description: "Acesso a +X vídeos em alta conversão para Reels e TikTok.", isLocked: true, icon: /* @__PURE__ */ jsx(Play, { className: "h-6 w-6" }), buttonText: "Desbloquear Acesso", onAction: () => handleUnlock("Pack Premium: Vídeos de Camisas"), videoSrc: "https://cafctsqyrrslblzphnts.supabase.co/storage/v1/object/public/videos/WhatsApp%20Video%202026-06-04%20at%2013.12.23.mp4" }),
        /* @__PURE__ */ jsx(DashboardCard, { title: "Artes Editáveis (Canva/Photoshop)", description: "Templates de alta conversão para posts e anúncios.", isLocked: true, icon: /* @__PURE__ */ jsx(Palette, { className: "h-6 w-6" }), buttonText: "Desbloquear Acesso", onAction: () => handleUnlock("Artes Editáveis"), videoSrc: "https://cafctsqyrrslblzphnts.supabase.co/storage/v1/object/public/videos/WhatsApp%20Video%202026-06-04%20at%2013.12.14.mp4" })
      ] })
    ] }) : !started ? /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("div", { className: "mx-auto max-w-5xl px-6 py-4", children: /* @__PURE__ */ jsxs(Button, { variant: "outline", size: "sm", onClick: goToShowroom, className: "border-border/70", children: [
        /* @__PURE__ */ jsx(ArrowLeft, { className: "mr-2 h-4 w-4" }),
        "Voltar ao Painel"
      ] }) }),
      /* @__PURE__ */ jsx(IntroScreen, { onStart: () => setStarted(true) })
    ] }) : /* @__PURE__ */ jsxs("main", { className: "mx-auto max-w-3xl px-6 py-10 pb-32", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-10", children: [
        /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between", children: STEPS.map((s, i) => /* @__PURE__ */ jsxs("div", { className: "flex flex-1 items-center", children: [
          /* @__PURE__ */ jsx("div", { className: cn("flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-sm font-medium transition-colors", step === s.n ? "border-emerald-500 bg-emerald-500 text-white" : step > s.n ? "border-emerald-500/60 bg-emerald-500/20 text-emerald-400" : "border-border bg-card text-muted-foreground"), children: step > s.n ? /* @__PURE__ */ jsx(Check, { className: "h-4 w-4" }) : s.n }),
          i < STEPS.length - 1 && /* @__PURE__ */ jsx("div", { className: cn("mx-2 h-px flex-1 transition-colors", step > s.n ? "bg-emerald-500/60" : "bg-border") })
        ] }, s.n)) }),
        /* @__PURE__ */ jsxs("div", { className: "mt-3 text-sm text-muted-foreground", children: [
          "Passo ",
          step,
          " de 5 · ",
          /* @__PURE__ */ jsx("span", { className: "text-foreground", children: STEPS[step - 1].title })
        ] })
      ] }),
      step === 1 && /* @__PURE__ */ jsx(StepIdentity, { form, update, onLogo: handleLogoUpload }),
      step === 2 && /* @__PURE__ */ jsx(StepVisual, { form, update }),
      step === 3 && /* @__PURE__ */ jsx(StepModules, { form, toggle: toggleModule, setLink: (m, v) => setForm((f) => ({
        ...f,
        moduleLinks: {
          ...f.moduleLinks,
          [m]: v
        }
      })) }),
      step === 4 && /* @__PURE__ */ jsx(StepLeagues, { form, toggle: toggleLeague }),
      step === 5 && /* @__PURE__ */ jsx(StepPrices, { form, update, symbol: currencySymbol }),
      /* @__PURE__ */ jsx("div", { className: "fixed inset-x-0 bottom-0 border-t border-border/60 bg-background/95 backdrop-blur", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto flex max-w-3xl items-center justify-between gap-3 px-6 py-4", children: [
        /* @__PURE__ */ jsxs(Button, { variant: "outline", onClick: back, disabled: step === 1, className: "border-border/70", children: [
          /* @__PURE__ */ jsx(ArrowLeft, { className: "h-4 w-4" }),
          "Voltar"
        ] }),
        step < 5 ? /* @__PURE__ */ jsxs(Button, { onClick: next, className: "bg-emerald-500 text-white hover:bg-emerald-600", children: [
          "Próximo",
          /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4" })
        ] }) : /* @__PURE__ */ jsxs(Button, { type: "button", onClick: () => {
          console.log("[dashboard] Criar Catálogo button clicked");
          submit();
        }, disabled: saving, className: "bg-emerald-500 text-white shadow-lg shadow-emerald-500/30 hover:bg-emerald-600", children: [
          saving ? /* @__PURE__ */ jsx(Loader2, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsx(Check, { className: "h-4 w-4" }),
          "Criar Catálogo"
        ] })
      ] }) })
    ] })
  ] });
}
function IntroScreen({
  onStart
}) {
  return /* @__PURE__ */ jsxs("main", { className: "mx-auto max-w-2xl px-6 py-16", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center text-center", children: [
      /* @__PURE__ */ jsx("div", { className: "flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/15 text-emerald-400 ring-1 ring-emerald-500/30", children: /* @__PURE__ */ jsx(Store, { className: "h-8 w-8" }) }),
      /* @__PURE__ */ jsx("h1", { className: "mt-6 text-3xl font-bold tracking-tight text-foreground sm:text-4xl", children: "Vamos criar seu catálogo!" }),
      /* @__PURE__ */ jsx("p", { className: "mt-3 max-w-md text-sm text-muted-foreground", children: "Em menos de 2 minutos você terá um catálogo digital personalizado com o link pronto para compartilhar." })
    ] }),
    /* @__PURE__ */ jsx("ul", { className: "mt-10 space-y-3", children: STEPS.map((s) => /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-4 rounded-xl border border-border/60 bg-card/50 px-5 py-4", children: [
      /* @__PURE__ */ jsx("div", { className: "flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-muted text-sm font-semibold text-foreground", children: s.n }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("div", { className: "text-sm font-medium text-foreground", children: s.title }),
        /* @__PURE__ */ jsx("div", { className: "text-xs text-muted-foreground", children: s.desc })
      ] })
    ] }, s.n)) }),
    /* @__PURE__ */ jsx(Button, { onClick: onStart, size: "lg", className: "mt-10 h-12 w-full bg-emerald-500 text-base font-semibold text-white shadow-lg shadow-emerald-500/30 hover:bg-emerald-600", children: "Começar agora" })
  ] });
}
function StepIdentity({
  form,
  update,
  onLogo
}) {
  return /* @__PURE__ */ jsxs("div", { className: "space-y-5", children: [
    /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsx(Label, { htmlFor: "name", children: "Nome da loja *" }),
      /* @__PURE__ */ jsx(Input, { id: "name", value: form.name, onChange: (e) => update("name", e.target.value), placeholder: "Ex.: HyperKatalogo Sports" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsx(Label, { htmlFor: "whatsapp", children: "WhatsApp (com DDD) *" }),
      /* @__PURE__ */ jsx(Input, { id: "whatsapp", value: form.whatsapp, onChange: (e) => update("whatsapp", e.target.value), placeholder: "(11) 99999-9999" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsx(Label, { children: "Logo da loja" }),
      /* @__PURE__ */ jsxs("label", { className: "flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border/70 bg-card/40 px-6 py-10 text-center transition-colors hover:border-emerald-500/60 hover:bg-emerald-500/5", children: [
        form.logoUrl ? /* @__PURE__ */ jsx("img", { src: form.logoUrl, alt: "Logo", className: "h-20 w-20 rounded-lg object-contain" }) : /* @__PURE__ */ jsx(Upload, { className: "h-6 w-6 text-muted-foreground" }),
        /* @__PURE__ */ jsx("span", { className: "text-sm text-muted-foreground", children: form.logoUrl ? "Trocar imagem" : "Clique para enviar a logo" }),
        /* @__PURE__ */ jsx("span", { className: "text-xs text-muted-foreground/80", children: "Envie um PNG sem fundo (transparente)" }),
        /* @__PURE__ */ jsx("input", { type: "file", accept: "image/png,image/svg+xml,image/webp", className: "hidden", onChange: onLogo })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid gap-4 sm:grid-cols-3", children: [
      /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxs(Label, { htmlFor: "ig", className: "flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsx(Instagram, { className: "h-3.5 w-3.5" }),
          " Instagram"
        ] }),
        /* @__PURE__ */ jsx(Input, { id: "ig", type: "url", value: form.instagram, onChange: (e) => update("instagram", e.target.value), placeholder: "https://instagram.com/seu-perfil" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxs(Label, { htmlFor: "fb", className: "flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsx(Facebook, { className: "h-3.5 w-3.5" }),
          " Facebook"
        ] }),
        /* @__PURE__ */ jsx(Input, { id: "fb", type: "url", value: form.facebook, onChange: (e) => update("facebook", e.target.value), placeholder: "https://facebook.com/sua-pagina" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsx(Label, { htmlFor: "tk", children: "TikTok" }),
        /* @__PURE__ */ jsx(Input, { id: "tk", type: "url", value: form.tiktok, onChange: (e) => update("tiktok", e.target.value), placeholder: "https://tiktok.com/@seu-perfil" })
      ] })
    ] })
  ] });
}
function StepVisual({
  form,
  update
}) {
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
      /* @__PURE__ */ jsx(Label, { children: "Cor de destaque" }),
      /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-3", children: PRESET_COLORS.map((c) => /* @__PURE__ */ jsx("button", { type: "button", onClick: () => update("accentColor", c), className: cn("h-10 w-10 rounded-full ring-2 ring-offset-2 ring-offset-background transition-all", form.accentColor.toLowerCase() === c.toLowerCase() ? "ring-foreground scale-110" : "ring-transparent hover:scale-105"), style: {
        backgroundColor: c
      }, "aria-label": `Cor ${c}` }, c)) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsx(Label, { htmlFor: "hex", children: "Código Hexadecimal" }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsx("div", { className: "h-10 w-10 rounded-md border border-border", style: {
          backgroundColor: form.accentColor
        } }),
        /* @__PURE__ */ jsx(Input, { id: "hex", value: form.accentColor, onChange: (e) => update("accentColor", e.target.value), placeholder: "#22c55e", className: "font-mono" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-border/60 bg-card/50 p-6", children: [
      /* @__PURE__ */ jsx("div", { className: "mb-3 text-xs uppercase tracking-wider text-muted-foreground", children: "Preview" }),
      /* @__PURE__ */ jsx("button", { type: "button", className: "rounded-lg px-6 py-2.5 text-sm font-semibold text-white shadow-md transition-transform hover:scale-[1.02]", style: {
        backgroundColor: form.accentColor
      }, children: "Ver catálogo" })
    ] })
  ] });
}
function ToggleCard({
  label,
  active,
  onClick
}) {
  return /* @__PURE__ */ jsxs("button", { type: "button", onClick, className: cn("flex items-center justify-between rounded-lg border px-4 py-3 text-left text-sm transition-all", active ? "border-emerald-500 bg-emerald-500/10 text-foreground" : "border-border/70 bg-card/40 text-muted-foreground hover:border-border hover:text-foreground"), children: [
    /* @__PURE__ */ jsx("span", { className: "font-medium", children: label }),
    /* @__PURE__ */ jsx("span", { className: cn("ml-3 h-5 w-9 rounded-full p-0.5 transition-colors", active ? "bg-emerald-500" : "bg-muted"), children: /* @__PURE__ */ jsx("span", { className: cn("block h-4 w-4 rounded-full bg-white transition-transform", active && "translate-x-4") }) })
  ] });
}
function StepModules({
  form,
  toggle,
  setLink
}) {
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(Label, { className: "mb-3 block", children: "Categorias" }),
      /* @__PURE__ */ jsx("div", { className: "grid gap-2 sm:grid-cols-2", children: MODULES.map((m) => /* @__PURE__ */ jsx(ToggleCard, { label: m, active: !!form.modules[m], onClick: () => toggle(m) }, m)) })
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(Label, { className: "mb-3 block", children: "Recursos extras" }),
      /* @__PURE__ */ jsx("div", { className: "space-y-2", children: EXTRA_MODULES.map((m) => {
        const active = !!form.modules[m];
        const linkCfg = EXTRA_MODULE_LINKS[m];
        return /* @__PURE__ */ jsxs("div", { className: "rounded-lg border border-border/70 bg-card/40 px-4 py-3", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsx("span", { className: "text-sm font-medium text-foreground", children: m }),
            /* @__PURE__ */ jsx(Switch, { checked: active, onCheckedChange: () => toggle(m) })
          ] }),
          active && linkCfg && /* @__PURE__ */ jsxs("div", { className: "mt-3 space-y-1.5", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: `link-${m}`, className: "text-xs text-muted-foreground", children: linkCfg.label }),
            /* @__PURE__ */ jsx(Input, { id: `link-${m}`, type: "url", value: form.moduleLinks[m] ?? "", onChange: (e) => setLink(m, e.target.value), placeholder: linkCfg.placeholder })
          ] })
        ] }, m);
      }) })
    ] })
  ] });
}
function StepLeagues({
  form,
  toggle
}) {
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(Label, { className: "mb-3 block", children: "Ligas disponíveis" }),
    /* @__PURE__ */ jsx("div", { className: "grid gap-2 sm:grid-cols-2", children: LEAGUES.map((l) => /* @__PURE__ */ jsx(ToggleCard, { label: l, active: !!form.leagues[l], onClick: () => toggle(l) }, l)) })
  ] });
}
function StepPrices({
  form,
  update,
  symbol
}) {
  const setPrice = (cat, value) => update("prices", {
    ...form.prices,
    [cat]: value
  });
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Preencha apenas as categorias que deseja exibir" }),
    /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: CURRENCIES.map((c) => /* @__PURE__ */ jsx("button", { type: "button", onClick: () => update("currency", c.code), className: cn("rounded-md border px-3 py-1.5 text-xs font-medium transition-colors", form.currency === c.code ? "border-emerald-500 bg-emerald-500/10 text-foreground" : "border-border/70 bg-card/40 text-muted-foreground hover:text-foreground"), children: c.symbol }, c.code)) }),
    /* @__PURE__ */ jsx("div", { className: "space-y-3", children: PRICE_CATEGORIES.map((cat) => /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
      /* @__PURE__ */ jsx(Label, { className: "text-xs text-muted-foreground", children: cat }),
      /* @__PURE__ */ jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsx("span", { className: "pointer-events-none absolute inset-y-0 left-0 flex items-center border-r border-border/70 bg-muted/40 px-3 text-sm font-medium text-muted-foreground", children: symbol }),
        /* @__PURE__ */ jsx(Input, { type: "number", inputMode: "decimal", value: form.prices[cat] ?? "", onChange: (e) => setPrice(cat, e.target.value), placeholder: "0,00", className: "pl-16" })
      ] })
    ] }, cat)) })
  ] });
}
export {
  DashboardPage as component
};
