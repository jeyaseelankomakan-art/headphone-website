export function Footer() {
  return (
    <footer className="relative border-t border-white/5 py-10">
      <div className="container mx-auto max-w-7xl px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="h-2 w-2 rounded-full bg-neon-cyan animate-pulse-glow text-neon-cyan" />
          <span className="font-mono text-xs uppercase tracking-[0.4em] text-white/70">
            Aether · 2026
          </span>
        </div>
        <div className="flex items-center gap-6 font-mono text-[10px] uppercase tracking-[0.35em] text-white/40">
          <a href="#" className="hover:text-neon-cyan transition-colors">Manifesto</a>
          <a href="#" className="hover:text-neon-cyan transition-colors">Support</a>
          <a href="#" className="hover:text-neon-cyan transition-colors">Press</a>
          <a href="#" className="hover:text-neon-cyan transition-colors">Privacy</a>
        </div>
      </div>
    </footer>
  );
}
