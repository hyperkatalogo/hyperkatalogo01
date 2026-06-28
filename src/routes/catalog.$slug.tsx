import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Loader2, Phone, Instagram, Facebook, ExternalLink, Shirt, Ruler, Package, Tag } from "lucide-react";
import { supabaseExternal } from "@/integrations/supabase/external-client";

export const Route = createFileRoute("/catalog/$slug")({
  ssr: false,
  head: ({ params }) => ({
    meta: [
      { title: `Catálogo — ${params.slug}` },
      { name: "description", content: "Catálogo digital de camisas de time." },
    ],
  }),
  component: CatalogPage,
});

type LojaRow = {
  id: string;
  user_id: string;
  nome_loja: string;
  whatsapp: string | null;
  logo_url: string | null;
  instagram: string | null;
  facebook: string | null;
  tiktok: string | null;
  cor_destaque: string | null;
  modulos: any;
  ligas: any;
  precos: any;
  slug: string;
};

const CURRENCY_SYMBOL: Record<string, string> = {
  BRL: "R$",
  USD: "$",
  EUR: "€",
  GBP: "£",
  ARS: "$ ARS",
  MXN: "$ MXN",
  CLP: "CLP",
};

function CatalogPage() {
  const { slug } = Route.useParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ["catalog", slug],
    queryFn: async () => {
      const { data, error } = await supabaseExternal
        .from("lojas")
        .select("*")
        .eq("slug", slug)
        .maybeSingle();
      if (error) throw error;
      if (!data) throw new Error("not_found");
      return data as LojaRow;
    },
  });

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error || !data) {
    const isNotFound = error instanceof Error && error.message === "not_found";
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground">
            {isNotFound ? "Catálogo não encontrado" : "Erro"}
          </h1>
          <p className="mt-2 text-muted-foreground">
            {isNotFound
              ? "O link pode estar incorreto ou o catálogo foi removido."
              : error instanceof Error
                ? error.message
                : "Não foi possível carregar o catálogo."}
          </p>
        </div>
      </div>
    );
  }

  const store = data;
  const accent = store.cor_destaque ?? "#22c55e";
  const modulos = (store.modulos ?? {}) as {
    categorias?: Record<string, boolean>;
    extras_links?: Record<string, string>;
    moeda?: string;
  };
  const categorias = modulos.categorias ?? {};
  const moduleLinks = modulos.extras_links ?? {};
  const moeda = modulos.moeda ?? "BRL";
  const currencySymbol = CURRENCY_SYMBOL[moeda] ?? "R$";

  const activeModules = Object.entries(categorias)
    .filter(([, v]) => v)
    .map(([k]) => k);

  const activeLeagues = Object.entries((store.ligas ?? {}) as Record<string, boolean>)
    .filter(([, v]) => v)
    .map(([k]) => k);

  const prices = (store.precos ?? {}) as Record<string, string>;
  const waNumber = (store.whatsapp ?? "").replace(/\D/g, "");

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/60">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            {store.logo_url ? (
              <img
                src={store.logo_url}
                alt={store.nome_loja}
                className="h-10 w-10 rounded-lg object-contain"
              />
            ) : (
              <div
                className="flex h-10 w-10 items-center justify-center rounded-lg text-white font-bold text-sm"
                style={{ backgroundColor: accent }}
              >
                {store.nome_loja.charAt(0).toUpperCase()}
              </div>
            )}
            <div>
              <h1 className="text-lg font-semibold text-foreground leading-tight">
                {store.nome_loja}
              </h1>
              <p className="text-xs text-muted-foreground">Catálogo digital</p>
            </div>
          </div>
          <a
            href={`https://wa.me/${waNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: accent }}
          >
            <Phone className="h-4 w-4" />
            Pedir no WhatsApp
          </a>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-8 pb-20">
        {(store.instagram || store.facebook || store.tiktok) && (
          <div className="mb-8 flex flex-wrap gap-3">
            {store.instagram && (
              <a
                href={store.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-4 py-2 text-sm text-foreground hover:bg-accent transition-colors"
              >
                <Instagram className="h-4 w-4" />
                Instagram
                <ExternalLink className="h-3 w-3 text-muted-foreground" />
              </a>
            )}
            {store.facebook && (
              <a
                href={store.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-4 py-2 text-sm text-foreground hover:bg-accent transition-colors"
              >
                <Facebook className="h-4 w-4" />
                Facebook
                <ExternalLink className="h-3 w-3 text-muted-foreground" />
              </a>
            )}
            {store.tiktok && (
              <a
                href={store.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-4 py-2 text-sm text-foreground hover:bg-accent transition-colors"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                </svg>
                TikTok
                <ExternalLink className="h-3 w-3 text-muted-foreground" />
              </a>
            )}
          </div>
        )}

        {activeModules.length > 0 && (
          <section className="mb-8">
            <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-foreground">
              <Shirt className="h-5 w-5" style={{ color: accent }} />
              Módulos
            </h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {activeModules.map((mod) => (
                <div
                  key={mod}
                  className="flex items-center justify-between rounded-xl border border-border bg-card p-4"
                >
                  <span className="text-sm font-medium text-foreground">{mod}</span>
                  {moduleLinks[mod] && (
                    <a
                      href={moduleLinks[mod]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
                    >
                      Ver <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {activeLeagues.length > 0 && (
          <section className="mb-8">
            <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-foreground">
              <Tag className="h-5 w-5" style={{ color: accent }} />
              Ligas
            </h2>
            <div className="flex flex-wrap gap-2">
              {activeLeagues.map((league) => (
                <span
                  key={league}
                  className="rounded-full px-4 py-1.5 text-sm font-medium text-white"
                  style={{ backgroundColor: accent }}
                >
                  {league}
                </span>
              ))}
            </div>
          </section>
        )}

        {prices && Object.keys(prices).some((k) => prices[k]) && (
          <section className="mb-8">
            <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-foreground">
              <Package className="h-5 w-5" style={{ color: accent }} />
              Preços
            </h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {Object.entries(prices)
                .filter(([, v]) => v)
                .map(([category, price]) => (
                  <div
                    key={category}
                    className="flex items-center justify-between rounded-xl border border-border bg-card p-4"
                  >
                    <span className="text-sm text-foreground">{category}</span>
                    <span className="text-sm font-bold" style={{ color: accent }}>
                      {currencySymbol} {price}
                    </span>
                  </div>
                ))}
            </div>
          </section>
        )}

        {Object.entries(moduleLinks)
          .filter(([k]) => !activeModules.includes(k) && k)
          .filter(([, v]) => v)
          .length > 0 && (
          <section className="mb-8">
            <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-foreground">
              <Ruler className="h-5 w-5" style={{ color: accent }} />
              Links úteis
            </h2>
            <div className="space-y-3">
              {Object.entries(moduleLinks)
                .filter(([k]) => !activeModules.includes(k) && k)
                .filter(([, v]) => v)
                .map(([label, url]) => (
                  <a
                    key={label}
                    href={url as string}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between rounded-xl border border-border bg-card p-4 text-sm text-foreground hover:bg-accent transition-colors"
                  >
                    <span>{label}</span>
                    <ExternalLink className="h-4 w-4 text-muted-foreground" />
                  </a>
                ))}
            </div>
          </section>
        )}

        <div className="mt-10 flex justify-center">
          <a
            href={`https://wa.me/${waNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl px-8 py-3 text-base font-semibold text-white shadow-lg transition-opacity hover:opacity-90"
            style={{ backgroundColor: accent }}
          >
            <Phone className="h-5 w-5" />
            Fazer pedido pelo WhatsApp
          </a>
        </div>
      </main>

      <footer className="border-t border-border/60 py-6 text-center text-xs text-muted-foreground">
        Catálogo criado com HyperKatalogo
      </footer>
    </div>
  );
}
