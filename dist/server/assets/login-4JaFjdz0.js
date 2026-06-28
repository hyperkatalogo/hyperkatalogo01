import { jsx, jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useNavigate, Link } from "@tanstack/react-router";
import { z } from "zod";
import { Trophy, EyeOff, Eye, Loader2 } from "lucide-react";
import { s as supabaseExternal } from "./router-DoVWgnuL.js";
import { L as Label, I as Input, B as Button } from "./label-D-0vr4cf.js";
import { C as Card, a as CardHeader, b as CardTitle, c as CardDescription, d as CardContent } from "./card-Bktn04MR.js";
import { toast } from "sonner";
import "@tanstack/react-query";
import "@supabase/supabase-js";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "@radix-ui/react-label";
import "clsx";
import "tailwind-merge";
const schema = z.object({
  email: z.string().trim().email({
    message: "E-mail inválido"
  }).max(255),
  password: z.string().min(6, {
    message: "A senha deve ter ao menos 6 caracteres"
  }).max(128)
});
function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const parsed = schema.safeParse({
      email,
      password
    });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
    setLoading(true);
    const {
      error
    } = await supabaseExternal.auth.signInWithPassword({
      email: parsed.data.email,
      password: parsed.data.password
    });
    setLoading(false);
    if (error) {
      toast.error("E-mail ou senha incorretos");
      return;
    }
    toast.success("Bem-vindo de volta!");
    navigate({
      to: "/dashboard"
    });
  };
  return /* @__PURE__ */ jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxs("div", { className: "w-full max-w-md", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-8 flex flex-col items-center text-center", children: [
      /* @__PURE__ */ jsx("div", { className: "mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15 text-primary", children: /* @__PURE__ */ jsx(Trophy, { className: "h-6 w-6" }) }),
      /* @__PURE__ */ jsx("h1", { className: "text-2xl font-semibold tracking-tight text-foreground", children: "HyperKatalogo" }),
      /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Acesse seu painel para gerenciar seu catálogo" })
    ] }),
    /* @__PURE__ */ jsxs(Card, { className: "border-border/60 shadow-2xl", children: [
      /* @__PURE__ */ jsxs(CardHeader, { children: [
        /* @__PURE__ */ jsx(CardTitle, { children: "Entrar" }),
        /* @__PURE__ */ jsx(CardDescription, { children: "Use seu e-mail e senha" })
      ] }),
      /* @__PURE__ */ jsxs(CardContent, { children: [
        /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "email", children: "E-mail" }),
            /* @__PURE__ */ jsx(Input, { id: "email", type: "email", autoComplete: "email", placeholder: "voce@exemplo.com", value: email, onChange: (e) => setEmail(e.target.value), required: true })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "password", children: "Senha" }),
            /* @__PURE__ */ jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsx(Input, { id: "password", type: showPassword ? "text" : "password", autoComplete: "current-password", placeholder: "••••••••", value: password, onChange: (e) => setPassword(e.target.value), required: true, className: "pr-10" }),
              /* @__PURE__ */ jsx("button", { type: "button", onClick: () => setShowPassword((v) => !v), className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors", tabIndex: -1, "aria-label": showPassword ? "Ocultar senha" : "Mostrar senha", children: showPassword ? /* @__PURE__ */ jsx(EyeOff, { className: "h-4 w-4" }) : /* @__PURE__ */ jsx(Eye, { className: "h-4 w-4" }) })
            ] })
          ] }),
          /* @__PURE__ */ jsxs(Button, { type: "submit", className: "w-full", disabled: loading, children: [
            loading && /* @__PURE__ */ jsx(Loader2, { className: "h-4 w-4 animate-spin" }),
            "Entrar"
          ] })
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "mt-6 text-center text-sm text-muted-foreground", children: [
          "Não tem uma conta?",
          " ",
          /* @__PURE__ */ jsx(Link, { to: "/signup", className: "font-medium text-primary hover:underline", children: "Cadastre-se" })
        ] })
      ] })
    ] })
  ] }) });
}
export {
  LoginPage as component
};
