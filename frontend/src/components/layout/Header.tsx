const Header = () => {
  return (
    <header className="h-16 border-b border-zinc-800 flex items-center justify-between px-6 bg-zinc-950">
      <div>
        <h1 className="text-lg font-semibold">
          PDF RAG Assistant
        </h1>

        <p className="text-xs text-zinc-500">
          Chat with your documents
        </p>
      </div>

      <div className="text-xs text-zinc-500">
        FastAPI • Gemini • FAISS
      </div>
    </header>
  );
};

export default Header;