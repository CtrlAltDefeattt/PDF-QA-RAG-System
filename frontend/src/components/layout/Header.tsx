const Header = () => {
  return (
    <header className="flex min-h-16 items-center justify-between gap-4 border-b border-zinc-800 bg-zinc-950 px-4 py-3 sm:px-6">
      <div>
        <h1 className="text-lg font-semibold tracking-tight text-white">
          HyperRAG Engine
        </h1>

        <p className="text-xs text-zinc-500">
          Evidence-first PDF intelligence
        </p>
      </div>

      <div className="hidden rounded-full border border-zinc-800 px-3 py-1 text-xs text-zinc-400 sm:block">
        FastAPI / Gemini / FAISS
      </div>
    </header>
  );
};

export default Header;
