import { ReactNode } from "react";
import { Lock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface DashboardCardProps {
  title: string;
  description: string;
  isLocked: boolean;
  icon: ReactNode;
  buttonText: string;
  onAction: () => void;
  accentColor?: string;
  className?: string;
  videoSrc?: string;
}

export function DashboardCard({
  title,
  description,
  isLocked,
  icon,
  buttonText,
  onAction,
  accentColor = "#22c55e",
  className,
  videoSrc,
}: DashboardCardProps) {
  // Locked card with video → Split layout (video top, text bottom)
  if (isLocked && videoSrc) {
    return (
      <div
        className={cn(
          "group relative flex flex-col overflow-hidden rounded-2xl border border-border/40 bg-slate-900 transition-all duration-300",
          className,
        )}
      >
        {/* Topo: Vitrine de vídeo */}
        <div className="relative h-80 w-full bg-black">
          <video
            className="h-full w-full object-contain"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
          {/* Cadeado flutuando sobre o vídeo */}
          <div className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 ring-1 ring-white/20 backdrop-blur">
            <Lock className="h-4 w-4 text-white/90" />
          </div>
        </div>

        {/* Base: Texto e botão */}
        <div className="flex flex-1 flex-col bg-slate-900 p-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-white ring-1 ring-white/15">
            {icon}
          </div>
          <h3 className="mt-4 text-lg font-semibold text-white">{title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-white/70">
            {description}
          </p>
          <div className="mt-6">
            <Button
              onClick={onAction}
              variant="outline"
              className="w-full border-white/20 bg-white/10 text-white backdrop-blur hover:bg-white/20"
            >
              {buttonText}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Card desbloqueado (principal) — sem alterações
  return (
    <div
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl border border-emerald-500/30 bg-card shadow-lg shadow-emerald-500/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-emerald-500/20",
        className,
      )}
    >
      {isLocked && (
        <div className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 ring-1 ring-white/10 backdrop-blur">
          <Lock className="h-4 w-4 text-white/90" />
        </div>
      )}

      <div className="relative z-10 flex flex-1 flex-col p-6">
        <div
          className="flex h-12 w-12 items-center justify-center rounded-xl text-white"
          style={{ backgroundColor: accentColor }}
        >
          {icon}
        </div>
        <h3 className="mt-4 text-lg font-semibold text-foreground">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
      </div>

      <div className="relative z-10 p-6 pt-0">
        <Button
          onClick={onAction}
          className="w-full text-white transition-all duration-200 hover:opacity-90"
          style={{ backgroundColor: accentColor }}
        >
          {buttonText}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
