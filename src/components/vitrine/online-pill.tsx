export function OnlinePill() {
  return (
    <div className="mt-6 flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 backdrop-blur-md">
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#39FF14] opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-[#39FF14]" />
      </span>
      <span className="text-[10px] font-medium tracking-wide text-white/80">ONLINE</span>
    </div>
  );
}
