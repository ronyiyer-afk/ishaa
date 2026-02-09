"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
  AnimatePresence,
} from "framer-motion";

const IMAGES = [
  "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/WhatsApp-Image-2026-02-10-at-12.13.15-AM-1770662771522.jpeg?width=8000&height=8000&resize=contain",
  "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/WhatsApp-Image-2026-02-10-at-12.13.14-AM-1770662771524.jpeg?width=8000&height=8000&resize=contain",
  "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/2026-02-10-at-12.13.14-AM-1770662771636.jpeg?width=8000&height=8000&resize=contain",
  "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/WhatsApp-Image-2026-02-10-at-12.13.14-AM-1-1770662771590.jpeg?width=8000&height=8000&resize=contain",
];

const LOVE_QUOTES = [
  "Every moment with you feels like a beautiful dream I never want to wake up from.",
  "Your eyes are my favourite thing in this entire universe.",
  "In a room full of art, I'd still stare at you.",
  "You will always be my favourite Ishaa or should I call \"Golu\" :)",
];

/* ── Background Music ───────────────────────────────────── */
function BackgroundMusic() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [playing, setPlaying] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const start = () => {
      if (!loaded) {
        setLoaded(true);
        setPlaying(true);
      }
      window.removeEventListener("click", start);
      window.removeEventListener("scroll", start);
      window.removeEventListener("touchstart", start);
      window.removeEventListener("keydown", start);
    };
    window.addEventListener("click", start);
    window.addEventListener("scroll", start);
    window.addEventListener("touchstart", start);
    window.addEventListener("keydown", start);
    return () => {
      window.removeEventListener("click", start);
      window.removeEventListener("scroll", start);
      window.removeEventListener("touchstart", start);
      window.removeEventListener("keydown", start);
    };
  }, [loaded]);

  const toggleMusic = () => {
    if (!loaded) {
      setLoaded(true);
      setPlaying(true);
      return;
    }
    setPlaying((p) => !p);
  };

  return (
    <>
      <motion.button
        onClick={toggleMusic}
        className="fixed bottom-6 right-6 z-50 w-11 h-11 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer"
        animate={playing ? { scale: [1, 1.05, 1] } : {}}
        transition={
          playing
            ? { duration: 2, repeat: Infinity, ease: "easeInOut" }
            : {}
        }
        title={playing ? "Pause music" : "Play music"}
      >
        <span className="text-white/70 text-sm">{playing ? "♫" : "▶"}</span>
      </motion.button>

      {loaded && (
        <div
          className="fixed -left-[9999px] top-0 w-[300px] h-[200px] opacity-0 pointer-events-none"
          aria-hidden="true"
        >
          {playing && (
            <iframe
              ref={iframeRef}
              src="https://www.youtube.com/embed/oVp6tu1-Xuc?autoplay=1&loop=1&playlist=oVp6tu1-Xuc&controls=0&showinfo=0&mute=0"
              width="300"
              height="200"
              allow="autoplay; encrypted-media"
              title="Background Music"
            />
          )}
        </div>
      )}
    </>
  );
}

/* ── Parallax Star Universe ─────────────────────────────── */
function ParallaxUniverse() {
  const { scrollY } = useScroll();

  const layerConfigs = useMemo(
    () => [
      { count: 120, sizeRange: [1, 1.5], opacityRange: [0.15, 0.35], speed: 0.05 },
      { count: 80, sizeRange: [1.5, 2.5], opacityRange: [0.25, 0.5], speed: 0.12 },
      { count: 40, sizeRange: [2, 3.5], opacityRange: [0.4, 0.7], speed: 0.22 },
    ],
    []
  );

  const [stars, setStars] = useState<
    { id: number; x: number; y: number; size: number; opacity: number; layer: number }[]
  >([]);

  useEffect(() => {
    const allStars: typeof stars = [];
    let id = 0;
    layerConfigs.forEach((layer, li) => {
      for (let i = 0; i < layer.count; i++) {
        allStars.push({
          id: id++,
          x: Math.random() * 100,
          y: Math.random() * 300, // spread across a large vertical area
          size:
            layer.sizeRange[0] +
            Math.random() * (layer.sizeRange[1] - layer.sizeRange[0]),
          opacity:
            layer.opacityRange[0] +
            Math.random() * (layer.opacityRange[1] - layer.opacityRange[0]),
          layer: li,
        });
      }
    });
    setStars(allStars);
  }, [layerConfigs]);

  // Each layer moves at different speed
  const y0 = useTransform(scrollY, (v) => -v * layerConfigs[0].speed);
  const y1 = useTransform(scrollY, (v) => -v * layerConfigs[1].speed);
  const y2 = useTransform(scrollY, (v) => -v * layerConfigs[2].speed);
  const layers = [y0, y1, y2];

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {[0, 1, 2].map((li) => (
        <motion.div key={li} className="absolute inset-0" style={{ y: layers[li] }}>
          {stars
            .filter((s) => s.layer === li)
            .map((star) => (
              <div
                key={star.id}
                className="absolute rounded-full bg-white"
                style={{
                  left: `${star.x}%`,
                  top: `${star.y}%`,
                  width: star.size,
                  height: star.size,
                  opacity: star.opacity,
                }}
              />
            ))}
        </motion.div>
      ))}
    </div>
  );
}

/* ── Twinkling Stars (for specific sections) ────────────── */
function TwinklingStars({ count = 20 }: { count?: number }) {
  const [stars, setStars] = useState<
    { id: number; x: number; y: number; delay: number; size: number }[]
  >([]);

  useEffect(() => {
    setStars(
      Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 4,
        size: 1 + Math.random() * 2,
      }))
    );
  }, [count]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
          }}
          animate={{ opacity: [0, 0.6, 0] }}
          transition={{
            duration: 3,
            delay: star.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

/* ── Hero Section ───────────────────────────────────────── */
function HeroSection() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const photoScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.15]);
  const smoothScale = useSpring(photoScale, { stiffness: 80, damping: 20 });
  const textOpacity = useTransform(scrollYProgress, [0.15, 0.35], [0, 1]);
  const textY = useTransform(scrollYProgress, [0.15, 0.35], [30, 0]);
  const hintOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);

  return (
    <section ref={sectionRef} className="relative h-[200vh]">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <TwinklingStars count={30} />

        {/* Scroll hint */}
        <motion.div
          className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 text-white/30 text-xs tracking-[0.3em] uppercase text-center font-light"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          style={{ opacity: hintOpacity }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            scroll
            <div className="mt-2 text-lg">&darr;</div>
          </motion.div>
        </motion.div>

        {/* Photo */}
        <div className="relative z-10 flex flex-col items-center">
          <motion.div
            className="relative w-56 h-56 md:w-72 md:h-72 rounded-full overflow-hidden border border-white/10 shadow-2xl shadow-black/60"
            style={{ scale: smoothScale }}
          >
            <Image
              src={IMAGES[0]}
              alt="Ishaa"
              fill
              className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
              sizes="320px"
              priority
            />
          </motion.div>

          {/* Subtle glow */}
          <div className="absolute w-56 h-56 md:w-72 md:h-72 rounded-full bg-white/5 blur-3xl" />
        </div>

        {/* Name */}
        <motion.div
          className="absolute z-20 text-center bottom-[15%] left-0 right-0 px-6"
          style={{ opacity: textOpacity, y: textY }}
        >
          <h1 className="text-5xl md:text-7xl font-serif font-light text-white tracking-tight">
            Ishaa
          </h1>
          <p className="text-lg md:text-xl font-serif text-white/40 mt-2 tracking-wide">
              For you Ishaaa :)
          </p>
          <div className="w-12 h-px bg-white/20 mx-auto mt-4" />
          <p className="text-white/25 text-sm font-light mt-4 max-w-sm mx-auto tracking-wide">
            A little something I made just for you
          </p>
        </motion.div>
      </div>
    </section>
  );
}

/* ── Quote Section ──────────────────────────────────────── */
function QuoteSection({ quote, index }: { quote: string; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="min-h-[50vh] flex items-center justify-center px-6 relative"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, ease: "easeOut" }}
        className="max-w-lg text-center"
      >
        <div className="text-white/10 text-5xl font-serif mb-4">&ldquo;</div>
        <p className="text-lg md:text-xl font-serif text-white/60 leading-relaxed italic font-light">
          {quote}
        </p>
        <div className="text-white/10 text-5xl font-serif mt-4">&rdquo;</div>
      </motion.div>
    </section>
  );
}

/* ── Moon Comparison Section ────────────────────────────── */
function MoonSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const moonY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const moonRotate = useTransform(scrollYProgress, [0, 1], [0, 15]);

  return (
    <section ref={sectionRef} className="py-32 px-6 relative overflow-hidden">
      <div ref={ref} className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="text-center mb-20"
        >
          <p className="text-white/20 text-xs tracking-[0.4em] uppercase mb-6">
            a comparison
          </p>
          <h2 className="text-3xl md:text-5xl font-serif font-light text-white tracking-tight">
            The Moon is Beautiful
          </h2>
          <div className="w-16 h-px bg-white/15 mx-auto mt-6" />
        </motion.div>

        {/* Moon & Photo side by side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Moon */}
          <motion.div
            className="flex flex-col items-center"
            style={{ y: moonY, rotate: moonRotate }}
          >
            <div className="relative w-52 h-52 md:w-64 md:h-64">
              {/* Moon circle with craters */}
              <div className="w-full h-full rounded-full bg-gradient-to-br from-gray-200 via-gray-100 to-gray-300 shadow-[0_0_80px_20px_rgba(255,255,255,0.08)] relative overflow-hidden">
                <div className="absolute w-8 h-8 rounded-full bg-gray-300/60 top-[20%] left-[25%]" />
                <div className="absolute w-5 h-5 rounded-full bg-gray-300/50 top-[45%] left-[60%]" />
                <div className="absolute w-12 h-12 rounded-full bg-gray-300/40 top-[60%] left-[30%]" />
                <div className="absolute w-4 h-4 rounded-full bg-gray-300/50 top-[25%] left-[65%]" />
                <div className="absolute w-6 h-6 rounded-full bg-gray-300/35 top-[70%] left-[60%]" />
              </div>
              {/* Moon glow */}
              <div className="absolute inset-0 rounded-full bg-white/5 blur-2xl scale-125" />
            </div>
            <p className="text-white/30 text-sm tracking-[0.2em] mt-8 font-light">
              THE MOON
            </p>
          </motion.div>

          {/* Her */}
          <motion.div
            className="flex flex-col items-center"
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <div className="relative w-52 h-52 md:w-64 md:h-64 rounded-full overflow-hidden border border-white/10 shadow-[0_0_80px_20px_rgba(255,255,255,0.04)]">
              <Image
                src={IMAGES[1]}
                alt="Ishaa"
                fill
                className="object-cover"
                sizes="280px"
              />
            </div>
            <p className="text-white/30 text-sm tracking-[0.2em] mt-8 font-light">
              MY MOON
            </p>
          </motion.div>
        </div>

          {/* Comparison text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-center mt-20"
          >
            <p className="text-white/40 text-lg md:text-xl font-serif italic font-light leading-relaxed max-w-md mx-auto">
              The moon lights up the entire sky,
              <br />
              but you light up my entire universe.
            </p>
            <div className="w-8 h-px bg-white/15 mx-auto mt-8" />
            <p className="text-white/20 text-sm font-light mt-4 tracking-wide">
              and honestly, you&apos;re way prettier
            </p>
              <div className="w-8 h-px bg-white/15 mx-auto mt-8" />
          </motion.div>
      </div>
    </section>
  );
}

/* ── Photo Card ─────────────────────────────────────────── */
function PhotoCard({ src, index }: { src: string; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, ease: "easeOut" }}
      className={`flex items-center justify-center px-6 py-10 ${
        isEven
          ? "md:justify-start md:pl-[15%]"
          : "md:justify-end md:pr-[15%]"
      }`}
    >
      <motion.div
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="relative group"
      >
        <div className="relative w-64 h-80 md:w-72 md:h-96 rounded-sm overflow-hidden shadow-2xl shadow-black/60 border border-white/5">
          <Image
            src={src}
            alt="Ishaa"
            fill
            className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
            sizes="320px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ── Gallery Section ────────────────────────────────────── */
function GallerySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section className="py-24 relative">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="text-center mb-16 relative z-10"
      >
        <p className="text-white/20 text-xs tracking-[0.4em] uppercase mb-4">
          gallery
        </p>
        <h2 className="text-3xl md:text-5xl font-serif font-light text-white tracking-tight">
          Every Picture of Ishaa
        </h2>
        <p className="text-white/25 text-sm font-light mt-3 tracking-wide">
          is my favorite picture
        </p>
        <div className="w-12 h-px bg-white/15 mx-auto mt-6" />
      </motion.div>

      <div className="space-y-4 relative z-10">
        {IMAGES.map((src, i) => (
          <PhotoCard key={i} src={src} index={i} />
        ))}
      </div>
    </section>
  );
}

/* ── Reasons Section ────────────────────────────────────── */
function ReasonsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const reasons = [
    "Teri ankhe jo tere kuch na bolne pe bhi bohot kuch kehe jati hai",
    "Your infectious laugh that makes everything better",
    "The way you made a single chai so special",
    "How effortlessly beautiful you are, inside and out",
    "Basically I love every bit of you",
  ];

  return (
    <section ref={ref} className="py-24 px-6 relative">
      <div className="max-w-lg mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-white/20 text-xs tracking-[0.4em] uppercase mb-4">
            reasons
          </p>
          <h2 className="text-3xl md:text-5xl font-serif font-light text-white tracking-tight">
            Things I Adore
          </h2>
          <p className="text-white/30 text-lg font-serif mt-2 tracking-wide">
            About You, Golu
          </p>
          <div className="w-12 h-px bg-white/15 mx-auto mt-6" />
        </motion.div>

        <div className="space-y-8">
          {reasons.map((reason, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.12, duration: 0.7, ease: "easeOut" }}
              className="flex items-start gap-6 group"
            >
              <span className="text-white/15 text-xs font-light mt-1 shrink-0 font-mono">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <div className="w-4 h-px bg-white/15 mb-3" />
                <p className="text-white/50 text-base font-light leading-relaxed group-hover:text-white/80 transition-colors duration-500">
                  {reason}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Letter Section ─────────────────────────────────────── */
function LetterSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-32 px-6 relative">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, ease: "easeOut" }}
        className="max-w-md mx-auto relative"
      >
        <div className="relative bg-white/[0.03] backdrop-blur-sm border border-white/[0.06] rounded-sm p-8 md:p-12">
          <div className="text-white/15 text-xs tracking-[0.4em] uppercase mb-8 text-center">
            a letter for you
          </div>
          <div className="space-y-5 text-white/45 font-light leading-relaxed text-sm">
            <p>Hey Ishaa,</p>
            <p>
              I know this might seem a little unexpected, but I wanted you to
              know that you make my world brighter just by being in it.
            </p>
            <p>
              Every time I see your smile, my heart skips a beat. Every time I
              hear your laugh, the world feels a little more magical.
            </p>
            <p>
              You probably don&apos;t even realize how amazing you are, Ishita,
              but I see it &mdash; in every little thing you do.
            </p>
              <p>
                I might not be the perfect one for you and made a lot of
                mistakes earlier, but I still haven&apos;t forgot the memories
                we have shared together. I really love you and always will.
              </p>
              <p className="text-white/60 italic pt-4 border-t border-white/[0.06]">
                You&apos;re the most beautiful soul I&apos;ve ever known, my Golu.
              </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

/* ── Final Section ──────────────────────────────────────── */
function FinalSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [clicked, setClicked] = useState(false);

  return (
    <section
      ref={ref}
      className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden"
    >
      <TwinklingStars count={25} />
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 1, ease: "easeOut" }}
        className="text-center relative z-10"
      >
        <motion.div
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="text-5xl mb-10 text-white/40"
        >
          &#9790;
        </motion.div>

        <h2 className="text-3xl md:text-5xl font-serif font-light text-white mb-4 tracking-tight">
          Love you to the moon
        </h2>
        <h2 className="text-xl md:text-2xl font-serif font-light text-white/40 mb-8 tracking-tight leading-relaxed max-w-md mx-auto">
          and yeah i have missed you a lot<br />don&apos;t leave me ever again
        </h2>

        <div className="w-12 h-px bg-white/15 mx-auto mb-8" />

        <p className="text-white/25 text-sm max-w-sm mx-auto mb-12 font-light leading-relaxed">
          I hope this little page brought a smile to your face, Ishaa &mdash;
          just like you always bring one to mine.
        </p>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => setClicked(true)}
          className="bg-white/[0.08] text-white/60 px-8 py-3 rounded-sm text-sm font-light tracking-wide border border-white/10 hover:bg-white/[0.12] hover:text-white/80 transition-all duration-300 cursor-pointer"
        >
          {clicked ? "You are loved" : "Click if you smiled"}
        </motion.button>

        <AnimatePresence>
          {clicked && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 text-white/30 text-sm font-light italic tracking-wide"
            >
              I knew you would, Golu
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}

/* ── Main Page ──────────────────────────────────────────── */
export default function Home() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <div className="relative bg-black min-h-screen overflow-hidden">
      {/* Thin progress line */}
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-px bg-white/20 z-50 origin-left"
      />

      <ParallaxUniverse />
      <BackgroundMusic />

      <HeroSection />

      {/* Quotes */}
      {LOVE_QUOTES.map((quote, i) => (
        <QuoteSection key={`quote-${i}`} quote={quote} index={i} />
      ))}

      <MoonSection />

      <GallerySection />

      <ReasonsSection />

      <LetterSection />

      <FinalSection />

      {/* Footer */}
      <div className="text-center py-12 text-white/10 text-xs font-light tracking-[0.2em]">
        Made with love, just for Ishaa
      </div>
    </div>
  );
}
