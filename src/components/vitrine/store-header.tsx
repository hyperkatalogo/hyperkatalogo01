export function StoreHeader() {
  return (
    <header className="flex flex-col items-center text-center">
      <p className="font-display mt-5 text-xs font-medium tracking-[0.35em] text-gray-400 uppercase">
        Catálogo Oficial
      </p>

      <div className="mt-5 h-28 w-28 overflow-hidden rounded-full border-2 border-[#007AFF] shadow-[0_0_20px_rgba(0,122,255,0.4)]">
        <img
          src="/logo.jpg"
          alt="HyperKatálogo logo"
          className="h-full w-full rounded-full bg-black object-contain p-1"
        />
      </div>

      <h1 className="font-display mt-4 text-4xl font-bold tracking-tight uppercase">
        HyperKatálogo
      </h1>
    </header>
  );
}
