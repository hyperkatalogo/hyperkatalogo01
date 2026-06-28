import { createFileRoute, Navigate, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import {
  Loader2,
  LogOut,
  Store,
  Upload,
  ArrowLeft,
  ArrowRight,
  Check,
  Instagram,
  Facebook,
  Play,
  Palette,
} from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/lib/auth-context";
import { DashboardCard } from "@/components/dashboard/dashboard-card";
import { supabaseExternal as supabase } from "@/integrations/supabase/external-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Criar Catálogo — Dashboard" },
      { name: "description", content: "Crie seu catálogo digital em poucos passos." },
    ],
  }),
  component: DashboardPage,
});

const STEPS = [
  { n: 1, title: "Identidade", desc: "Nome da loja, WhatsApp" },
  { n: 2, title: "Visual", desc: "Cor de destaque do catálogo" },
  { n: 3, title: "Módulos", desc: "Ative categorias e links úteis" },
  { n: 4, title: "Ligas", desc: "Escolha quais ligas aparecem" },
  { n: 5, title: "Preços", desc: "Informe os valores dos produtos" },
];

const MODULES = [
  "Modelo Torcedor",
  "Modelo Jogador",
  "Retrô",
  "Kids",
  "Feminino",
  "Agasalhos",
  "Treino",
  "Jaquetas",
  "Lançamentos 26/27",
  "Copa 2026",
];

const EXTRA_MODULES = ["Tabela de Medidas", "Rastreio de Pedido"];
const EXTRA_MODULE_LINKS: Record<string, { label: string; placeholder: string }> = {
  "Tabela de Medidas": {
    label: "Link da tabela de medidas (opcional)",
    placeholder: "https://...",
  },
  "Rastreio de Pedido": {
    label: "Link de rastreio (opcional)",
    placeholder: "https://...",
  },
};

const LEAGUES = [
  "Seleções Mundiais",
  "Brasileirão",
  "La Liga",
  "Premier League",
  "Serie A",
  "Ligue 1",
  "Bundesliga",
  "Liga Portugal",
  "Resto do Mundo",
];

const CURRENCIES = [
  { code: "BRL", symbol: "R$" },
  { code: "USD", symbol: "$" },
  { code: "EUR", symbol: "€" },
  { code: "GBP", symbol: "£" },
  { code: "ARS", symbol: "$ ARS" },
  { code: "MXN", symbol: "$ MXN" },
  { code: "CLP", symbol: "CLP" },
];

const PRICE_CATEGORIES = [
  "Camisa Torcedor",
  "Camisa Jogador",
  "Manga Longa",
  "Retrô",
  "Agasalhos",
  "Kids",
  "Treino",
  "Shorts",
  "Personalização",
  "Copa 2026",
  "Lançamentos 26/27",
];

const PRESET_COLORS = [
  "#22c55e",
  "#3b82f6",
  "#ef4444",
  "#f59e0b",
  "#a855f7",
  "#ec4899",
  "#14b8a6",
  "#0ea5e9",
  "#facc15",
  "#000000",
];

type FormState = {
  name: string;
  whatsapp: string;
  logoUrl: string;
  instagram: string;
  facebook: string;
  tiktok: string;
  accentColor: string;
  modules: Record<string, boolean>;
  moduleLinks: Record<string, string>;
  leagues: Record<string, boolean>;
  currency: string;
  prices: Record<string, string>;
};

function DashboardPage() {
  const { user, session, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(1);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<FormState>({
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
    prices: {},
  });

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }
  if (!session) return <Navigate to="/login" />;

  const handleSignOut = async () => {
    await signOut();
    navigate({ to: "/login" });
  };

  const update = <K extends keyof FormState>(k: K, v: FormState[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  const toggleModule = (m: string) =>
    setForm((f) => ({ ...f, modules: { ...f.modules, [m]: !f.modules[m] } }));
  const toggleLeague = (l: string) =>
    setForm((f) => ({ ...f, leagues: { ...f.leagues, [l]: !f.leagues[l] } }));

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const generateSlug = (name: string) => {
    const base = name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
    const suffix = Math.random().toString(36).slice(2, 7);
    return `${base}-${suffix}`;
  };

  const submit = async () => {
    console.log("[dashboard] submit clicked", { userId: user?.id, session: !!session });
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
          moeda: form.currency,
        },
        ligas: form.leagues,
        precos: form.prices,
        slug,
      };

      const { error, data } = await supabase
        .from("lojas")
        .insert(payload)
        .select("slug")
        .single();
      console.log("[dashboard] insert lojas result", { payload, error, data });
      toast.dismiss(loadingId);
      if (error) {
        toast.error("Erro ao salvar: " + error.message);
        return;
      }
      toast.success("Catálogo criado com sucesso!");
      navigate({ to: "/catalog/$slug", params: { slug: data?.slug ?? slug } });
    } catch (e) {
      toast.dismiss(loadingId);
      console.error("[dashboard] submit exception", e);
      toast.error("Erro inesperado ao salvar");
    } finally {
      setSaving(false);
    }
  };

  const currencySymbol =
    CURRENCIES.find((c) => c.code === form.currency)?.symbol ?? "R$";

  const [view, setView] = useState<"showroom" | "wizard">("showroom");

  const goToWizard = () => {
    setStarted(false);
    setStep(1);
    setView("wizard");
  };

  const goToShowroom = () => {
    setView("showroom");
  };

  const handleUnlock = (feature: string) => {
    toast.info(`Em breve redirecionamento para o checkout — ${feature}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/60">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/15 text-primary">
              <span className="text-sm font-bold tracking-tight">HK</span>
            </div>
            <span className="text-lg font-semibold text-foreground">HyperKatalogo</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden text-sm text-muted-foreground sm:inline">
              {user?.email}
            </span>
            <Button variant="outline" size="sm" onClick={handleSignOut}>
              <LogOut className="h-4 w-4" />
              Sair
            </Button>
          </div>
        </div>
      </header>

      {view === "showroom" ? (
        <main className="mx-auto max-w-5xl px-6 py-10">
          <div className="mb-8">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Painel do Lojista
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Escolha uma ferramenta para impulsionar suas vendas
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <DashboardCard
              title="Meu Catálogo Digital"
              description="Crie, edite e gerencie os produtos da sua vitrine."
              isLocked={false}
              icon={<Store className="h-6 w-6" />}
              buttonText="Acessar"
              onAction={goToWizard}
              accentColor="#22c55e"
            />
            <DashboardCard
              title="Pack Premium: Vídeos de Camisas"
              description="Acesso a +X vídeos em alta conversão para Reels e TikTok."
              isLocked={true}
              icon={<Play className="h-6 w-6" />}
              buttonText="Desbloquear Acesso"
              onAction={() => handleUnlock("Pack Premium: Vídeos de Camisas")}
              videoSrc="https://cafctsqyrrslblzphnts.supabase.co/storage/v1/object/public/videos/WhatsApp%20Video%202026-06-04%20at%2013.12.23.mp4"
            />
            <DashboardCard
              title="Artes Editáveis (Canva/Photoshop)"
              description="Templates de alta conversão para posts e anúncios."
              isLocked={true}
              icon={<Palette className="h-6 w-6" />}
              buttonText="Desbloquear Acesso"
              onAction={() => handleUnlock("Artes Editáveis")}
              videoSrc="https://cafctsqyrrslblzphnts.supabase.co/storage/v1/object/public/videos/WhatsApp%20Video%202026-06-04%20at%2013.12.14.mp4"
            />

          </div>
        </main>
      ) : !started ? (
        <>
          <div className="mx-auto max-w-5xl px-6 py-4">
            <Button
              variant="outline"
              size="sm"
              onClick={goToShowroom}
              className="border-border/70"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar ao Painel
            </Button>
          </div>
          <IntroScreen onStart={() => setStarted(true)} />
        </>
      ) : (
        <main className="mx-auto max-w-3xl px-6 py-10 pb-32">
          {/* Progress */}
          <div className="mb-10">
            <div className="flex items-center justify-between">
              {STEPS.map((s, i) => (
                <div key={s.n} className="flex flex-1 items-center">
                  <div
                    className={cn(
                      "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-sm font-medium transition-colors",
                      step === s.n
                        ? "border-emerald-500 bg-emerald-500 text-white"
                        : step > s.n
                          ? "border-emerald-500/60 bg-emerald-500/20 text-emerald-400"
                          : "border-border bg-card text-muted-foreground",
                    )}
                  >
                    {step > s.n ? <Check className="h-4 w-4" /> : s.n}
                  </div>
                  {i < STEPS.length - 1 && (
                    <div
                      className={cn(
                        "mx-2 h-px flex-1 transition-colors",
                        step > s.n ? "bg-emerald-500/60" : "bg-border",
                      )}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="mt-3 text-sm text-muted-foreground">
              Passo {step} de 5 · <span className="text-foreground">{STEPS[step - 1].title}</span>
            </div>
          </div>

          {step === 1 && <StepIdentity form={form} update={update} onLogo={handleLogoUpload} />}
          {step === 2 && <StepVisual form={form} update={update} />}
          {step === 3 && (
            <StepModules
              form={form}
              toggle={toggleModule}
              setLink={(m, v) =>
                setForm((f) => ({ ...f, moduleLinks: { ...f.moduleLinks, [m]: v } }))
              }
            />
          )}
          {step === 4 && <StepLeagues form={form} toggle={toggleLeague} />}
          {step === 5 && <StepPrices form={form} update={update} symbol={currencySymbol} />}

          {/* Fixed footer */}
          <div className="fixed inset-x-0 bottom-0 border-t border-border/60 bg-background/95 backdrop-blur">
            <div className="mx-auto flex max-w-3xl items-center justify-between gap-3 px-6 py-4">
              <Button
                variant="outline"
                onClick={back}
                disabled={step === 1}
                className="border-border/70"
              >
                <ArrowLeft className="h-4 w-4" />
                Voltar
              </Button>
              {step < 5 ? (
                <Button
                  onClick={next}
                  className="bg-emerald-500 text-white hover:bg-emerald-600"
                >
                  Próximo
                  <ArrowRight className="h-4 w-4" />
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={() => {
                    console.log("[dashboard] Criar Catálogo button clicked");
                    submit();
                  }}
                  disabled={saving}
                  className="bg-emerald-500 text-white shadow-lg shadow-emerald-500/30 hover:bg-emerald-600"
                >
                  {saving ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Check className="h-4 w-4" />
                  )}
                  Criar Catálogo
                </Button>
              )}
            </div>
          </div>
        </main>
      )}
    </div>
  );
}

function IntroScreen({ onStart }: { onStart: () => void }) {
  return (
    <main className="mx-auto max-w-2xl px-6 py-16">
      <div className="flex flex-col items-center text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/15 text-emerald-400 ring-1 ring-emerald-500/30">
          <Store className="h-8 w-8" />
        </div>
        <h1 className="mt-6 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Vamos criar seu catálogo!
        </h1>
        <p className="mt-3 max-w-md text-sm text-muted-foreground">
          Em menos de 2 minutos você terá um catálogo digital personalizado com o link
          pronto para compartilhar.
        </p>
      </div>

      <ul className="mt-10 space-y-3">
        {STEPS.map((s) => (
          <li
            key={s.n}
            className="flex items-center gap-4 rounded-xl border border-border/60 bg-card/50 px-5 py-4"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-muted text-sm font-semibold text-foreground">
              {s.n}
            </div>
            <div>
              <div className="text-sm font-medium text-foreground">{s.title}</div>
              <div className="text-xs text-muted-foreground">{s.desc}</div>
            </div>
          </li>
        ))}
      </ul>

      <Button
        onClick={onStart}
        size="lg"
        className="mt-10 h-12 w-full bg-emerald-500 text-base font-semibold text-white shadow-lg shadow-emerald-500/30 hover:bg-emerald-600"
      >
        Começar agora
      </Button>
    </main>
  );
}

type StepProps = {
  form: FormState;
  update: <K extends keyof FormState>(k: K, v: FormState[K]) => void;
};

function StepIdentity({
  form,
  update,
  onLogo,
}: StepProps & { onLogo: (e: React.ChangeEvent<HTMLInputElement>) => void }) {
  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="name">Nome da loja *</Label>
        <Input
          id="name"
          value={form.name}
          onChange={(e) => update("name", e.target.value)}
          placeholder="Ex.: HyperKatalogo Sports"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="whatsapp">WhatsApp (com DDD) *</Label>
        <Input
          id="whatsapp"
          value={form.whatsapp}
          onChange={(e) => update("whatsapp", e.target.value)}
          placeholder="(11) 99999-9999"
        />
      </div>

      <div className="space-y-2">
        <Label>Logo da loja</Label>
        <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border/70 bg-card/40 px-6 py-10 text-center transition-colors hover:border-emerald-500/60 hover:bg-emerald-500/5">
          {form.logoUrl ? (
            <img src={form.logoUrl} alt="Logo" className="h-20 w-20 rounded-lg object-contain" />
          ) : (
            <Upload className="h-6 w-6 text-muted-foreground" />
          )}
          <span className="text-sm text-muted-foreground">
            {form.logoUrl ? "Trocar imagem" : "Clique para enviar a logo"}
          </span>
          <span className="text-xs text-muted-foreground/80">
            Envie um PNG sem fundo (transparente)
          </span>
          <input type="file" accept="image/png,image/svg+xml,image/webp" className="hidden" onChange={onLogo} />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="ig" className="flex items-center gap-1.5">
            <Instagram className="h-3.5 w-3.5" /> Instagram
          </Label>
          <Input
            id="ig"
            type="url"
            value={form.instagram}
            onChange={(e) => update("instagram", e.target.value)}
            placeholder="https://instagram.com/seu-perfil"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="fb" className="flex items-center gap-1.5">
            <Facebook className="h-3.5 w-3.5" /> Facebook
          </Label>
          <Input
            id="fb"
            type="url"
            value={form.facebook}
            onChange={(e) => update("facebook", e.target.value)}
            placeholder="https://facebook.com/sua-pagina"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="tk">TikTok</Label>
          <Input
            id="tk"
            type="url"
            value={form.tiktok}
            onChange={(e) => update("tiktok", e.target.value)}
            placeholder="https://tiktok.com/@seu-perfil"
          />
        </div>
      </div>
    </div>
  );
}

function StepVisual({ form, update }: StepProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <Label>Cor de destaque</Label>
        <div className="flex flex-wrap gap-3">
          {PRESET_COLORS.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => update("accentColor", c)}
              className={cn(
                "h-10 w-10 rounded-full ring-2 ring-offset-2 ring-offset-background transition-all",
                form.accentColor.toLowerCase() === c.toLowerCase()
                  ? "ring-foreground scale-110"
                  : "ring-transparent hover:scale-105",
              )}
              style={{ backgroundColor: c }}
              aria-label={`Cor ${c}`}
            />
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="hex">Código Hexadecimal</Label>
        <div className="flex items-center gap-3">
          <div
            className="h-10 w-10 rounded-md border border-border"
            style={{ backgroundColor: form.accentColor }}
          />
          <Input
            id="hex"
            value={form.accentColor}
            onChange={(e) => update("accentColor", e.target.value)}
            placeholder="#22c55e"
            className="font-mono"
          />
        </div>
      </div>

      <div className="rounded-xl border border-border/60 bg-card/50 p-6">
        <div className="mb-3 text-xs uppercase tracking-wider text-muted-foreground">
          Preview
        </div>
        <button
          type="button"
          className="rounded-lg px-6 py-2.5 text-sm font-semibold text-white shadow-md transition-transform hover:scale-[1.02]"
          style={{ backgroundColor: form.accentColor }}
        >
          Ver catálogo
        </button>
      </div>
    </div>
  );
}

function ToggleCard({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex items-center justify-between rounded-lg border px-4 py-3 text-left text-sm transition-all",
        active
          ? "border-emerald-500 bg-emerald-500/10 text-foreground"
          : "border-border/70 bg-card/40 text-muted-foreground hover:border-border hover:text-foreground",
      )}
    >
      <span className="font-medium">{label}</span>
      <span
        className={cn(
          "ml-3 h-5 w-9 rounded-full p-0.5 transition-colors",
          active ? "bg-emerald-500" : "bg-muted",
        )}
      >
        <span
          className={cn(
            "block h-4 w-4 rounded-full bg-white transition-transform",
            active && "translate-x-4",
          )}
        />
      </span>
    </button>
  );
}

function StepModules({
  form,
  toggle,
  setLink,
}: {
  form: FormState;
  toggle: (m: string) => void;
  setLink: (m: string, v: string) => void;
}) {
  return (
    <div className="space-y-6">
      <div>
        <Label className="mb-3 block">Categorias</Label>
        <div className="grid gap-2 sm:grid-cols-2">
          {MODULES.map((m) => (
            <ToggleCard
              key={m}
              label={m}
              active={!!form.modules[m]}
              onClick={() => toggle(m)}
            />
          ))}
        </div>
      </div>
      <div>
        <Label className="mb-3 block">Recursos extras</Label>
        <div className="space-y-2">
          {EXTRA_MODULES.map((m) => {
            const active = !!form.modules[m];
            const linkCfg = EXTRA_MODULE_LINKS[m];
            return (
              <div
                key={m}
                className="rounded-lg border border-border/70 bg-card/40 px-4 py-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">{m}</span>
                  <Switch
                    checked={active}
                    onCheckedChange={() => toggle(m)}
                  />
                </div>
                {active && linkCfg && (
                  <div className="mt-3 space-y-1.5">
                    <Label htmlFor={`link-${m}`} className="text-xs text-muted-foreground">
                      {linkCfg.label}
                    </Label>
                    <Input
                      id={`link-${m}`}
                      type="url"
                      value={form.moduleLinks[m] ?? ""}
                      onChange={(e) => setLink(m, e.target.value)}
                      placeholder={linkCfg.placeholder}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function StepLeagues({
  form,
  toggle,
}: {
  form: FormState;
  toggle: (l: string) => void;
}) {
  return (
    <div>
      <Label className="mb-3 block">Ligas disponíveis</Label>
      <div className="grid gap-2 sm:grid-cols-2">
        {LEAGUES.map((l) => (
          <ToggleCard
            key={l}
            label={l}
            active={!!form.leagues[l]}
            onClick={() => toggle(l)}
          />
        ))}
      </div>
    </div>
  );
}

function StepPrices({
  form,
  update,
  symbol,
}: StepProps & { symbol: string }) {
  const setPrice = (cat: string, value: string) =>
    update("prices", { ...form.prices, [cat]: value });

  return (
    <div className="space-y-6">
      <p className="text-sm text-muted-foreground">
        Preencha apenas as categorias que deseja exibir
      </p>

      <div className="flex flex-wrap gap-2">
        {CURRENCIES.map((c) => (
          <button
            key={c.code}
            type="button"
            onClick={() => update("currency", c.code)}
            className={cn(
              "rounded-md border px-3 py-1.5 text-xs font-medium transition-colors",
              form.currency === c.code
                ? "border-emerald-500 bg-emerald-500/10 text-foreground"
                : "border-border/70 bg-card/40 text-muted-foreground hover:text-foreground",
            )}
          >
            {c.symbol}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {PRICE_CATEGORIES.map((cat) => (
          <div key={cat} className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">{cat}</Label>
            <div className="relative">
              <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center border-r border-border/70 bg-muted/40 px-3 text-sm font-medium text-muted-foreground">
                {symbol}
              </span>
              <Input
                type="number"
                inputMode="decimal"
                value={form.prices[cat] ?? ""}
                onChange={(e) => setPrice(cat, e.target.value)}
                placeholder="0,00"
                className="pl-16"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
