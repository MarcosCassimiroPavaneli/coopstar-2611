import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { heroSlides } from "../../data/content";
import { Picture } from "../ui/Image";

const AUTOPLAY_MS = 6000;

export function Hero() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timer = useRef<number | null>(null);

  const goTo = useCallback((next: number) => {
    const wrapped = ((next % heroSlides.length) + heroSlides.length) % heroSlides.length;
    setIndex(wrapped);
  }, []);

  useEffect(() => {
    if (paused) return;
    timer.current = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % heroSlides.length);
    }, AUTOPLAY_MS);
    return () => {
      if (timer.current !== null) window.clearInterval(timer.current);
    };
  }, [paused]);

  const slide = heroSlides[index];

  return (
    <div
      className="relative h-[85vh] min-h-[540px] w-full overflow-hidden bg-slate-900"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <AnimatePresence initial={false}>
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="absolute inset-0"
          aria-hidden={true}
        >
          <Picture
            base={slide.image}
            alt=""
            className="h-full w-full object-cover"
            loading={index === 0 ? "eager" : "lazy"}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/45 to-slate-900/20" />
          <div className="absolute top-6 right-6 z-10 rounded-xl bg-white/10 p-2 backdrop-blur-md border border-white/20">
            <img src="/images/logo.png" alt="Coopstar Express" className="h-9 w-auto object-contain" />
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 mx-auto flex h-full max-w-container flex-col justify-end px-4 pb-24 sm:px-6 lg:px-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-2xl"
          >
            <p className="mb-4 inline-block rounded-full bg-white/10 px-4 py-1.5 text-sm font-semibold uppercase tracking-widest text-white backdrop-blur-sm">
              {slide.eyebrow}
            </p>
            <h1 className="text-4xl font-extrabold leading-tight text-white text-balance sm:text-5xl lg:text-6xl">
              {slide.title}
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate-200">
              {slide.subtitle}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#contato"
                className="inline-flex items-center gap-2 rounded-lg bg-brand-blue px-7 py-3.5 text-sm font-semibold text-white shadow-card transition-all hover:-translate-y-0.5 hover:bg-brand-navy hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
              >
                {slide.cta}
              </a>
              <a
                href="#servicos"
                className="inline-flex items-center gap-2 rounded-lg border-2 border-white/40 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:border-white hover:bg-white/20"
              >
                Nossos serviços
              </a>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 items-center gap-3">
        <button
          type="button"
          onClick={() => goTo(index - 1)}
          aria-label="Slide anterior"
          className="rounded-full bg-white/15 p-2 text-white backdrop-blur-sm transition-colors hover:bg-white/30"
        >
          <ChevronLeft size={20} />
        </button>

        <div className="flex items-center gap-2" role="tablist" aria-label="Selecionar slide">
          {heroSlides.map((s, i) => (
            <button
              key={s.image}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Slide ${i + 1}`}
              onClick={() => goTo(i)}
              className={`h-2.5 rounded-full transition-all ${
                i === index ? "w-8 bg-white" : "w-2.5 bg-white/40 hover:bg-white/70"
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => goTo(index + 1)}
          aria-label="Próximo slide"
          className="rounded-full bg-white/15 p-2 text-white backdrop-blur-sm transition-colors hover:bg-white/30"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}
