"use client";

import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";

// ─────────────────────────────────────────────────────────────────────────────
// 🌍 CONTENT — swap this object to translate the entire page
// ─────────────────────────────────────────────────────────────────────────────
const T = {
  nav: {
    links: [
      { label: "Tours",      anchor: "#tours"      },
      { label: "Fauna",      anchor: "#wildlife"   },
      { label: "Sobre Luis", anchor: "#about-luis" },
      { label: "Contacto",   anchor: "#contact"    },
    ],
    cta: "Reservar un Tour",
  },

  hero: {
    location: "Bocas del Toro · Panamá",
    title1:   "La Jungla está",
    titleEm:  "Viva.",
    title2:   "Ven a Descubrirla.",
    sub:      "Tours guiados de naturaleza por la selva y la playa con Luis — nativo de playa Bluff y guardián de toda la vida de su costa salvaje.",
    cta1:     "Ver los Tours",
    cta2:     "Conocer a Luis",
    scroll:   "Desplazar",
  },

  ticker: [
    "🌿 Selva",
    "🦜 Aves Exóticas",
    "🥥 Cultura Ngöbe",
    "🌊 Playa Bluff",
    "🦥 Perezosos Salvajes",
    "🐒 Monos Aulladores",
    "🌺 Flora Tropical",
    "🐸 Ranas Venenosas",
  ],

  about: {
    eyebrow:  "Conoce a tu guía",
    title1:   "Una vida en la",
    titleEm:  "selva",
    title2:   "es tu mejor maestra.",
    p1: "Luis nació y creció en Isla Bluff, rodeado de la misma selva, playas y fauna que ahora comparte con los visitantes. Es Ngöbe — parte de la comunidad indígena que ha vivido con y de esta tierra durante siglos.",
    p2: "Su conocimiento va mucho más allá de cualquier guía turística. Sabe qué hoja cura una picadura, dónde duermen los perezosos, cómo el ave manakin baila para atraer a su pareja, y las historias que su cultura ha tejido alrededor de cada planta y animal de esta costa. Caminar con Luis es caminar con el bosque mismo.",
    quote:    "\"No solo te muestro la selva — te enseño a verla.\"",
    quoteBy:  "— Luis",
    badge:    { label: "Tu Guía", name: "Luis", sub: "Nativo de Isla Bluff" },
    tags:     ["Guía Ngöbe Nativo", "Experto en Fauna", "Nacido en Isla Bluff", "Español e Inglés", "Solo Grupos Pequeños"],
  },

  tours: {
    eyebrow: "Elige tu aventura",
    title1:  "Dos senderos.",
    titleEm: "Infinitos",
    title2:  "descubrimientos.",
    cta:     "Reservar por WhatsApp →",
  },

  tour1: {
    tag:   "🌿 Sendero de Selva",
    num:   "Sendero 01",
    title: "Sendero del Manakin",
    desc:  "Comenzando en el brillante borde de Playa Bluff, este sendero te lleva profundo a la selva donde ceibas imponentes, monos aulladores, aves manakin brillantes como joyas, y cientos de especies de plantas comparten la misma catedral de verde. Luis comparte cómo el pueblo Ngöbe ha vivido junto a estas plantas y animales por generaciones.",
    details: [
      ["⏱", "2–3 horas"],
      ["📍", "Comienza en Playa Bluff"],
      ["👟", "Fácil a moderado — todos los niveles"],
      ["🌅", "Salida matutina recomendada"],
      ["👥", "Máx. 8 personas por grupo"],
    ],
  },

  tour2: {
    tag:   "🌊 Sendero de Playa",
    num:   "Sendero 02",
    title: "Sendero El Perezoso",
    desc:  "Nombrado así por los perezosos que perezosamente cuelgan de las palmeras costeras, esta suave caminata por la playa sigue el borde salvaje de la costa de Bluff. Luis comparte el profundo conocimiento de su pueblo Ngöbe — las historias detrás de las plantas costeras, la fauna que depende de este tramo de costa caribeña, y lo que significa crecer en uno de los lugares más biodiversos de la Tierra.",
    details: [
      ["⏱", "1.5–2 horas"],
      ["📍", "A lo largo de la costa de Playa Bluff"],
      ["👟", "Fácil — apto para descalzos"],
      ["🌴", "Cultura Ngöbe y plantas costeras"],
      ["👨‍👩‍👧", "Perfecto para familias y niños"],
    ],
  },

  wildlife: {
    eyebrow: "Lo que podrías encontrar",
    title1:  "La fauna de",
    titleEm: "Bluff",
    sub:     "Bocas del Toro es uno de los rincones más biodiversos de Centroamérica. Cada caminata con Luis es un nuevo capítulo de la misma historia extraordinaria.",
    items: [
      { emoji: "🦜", label: "Oropéndola"        },
      { emoji: "🐒", label: "Monos Aulladores"        },
      { emoji: "🦎", label: "Iguanas Verdes"          },
      { emoji: "🐦", label: "Aves Manakin"            },
      { emoji: "🦋", label: "Mariposas Morpho"        },
      { emoji: "🐸", label: "Ranas de Flecha"   },
      { emoji: "🦥", label: "Perezosos de Tres Dedos" },
      { emoji: "🌺", label: "Orquídeas Tropicales"    },
      { emoji: "🦀", label: "Cangrejos Terrestres"    },
      { emoji: "🌿", label: "Plantas Medicinales"     },
      { emoji: "🐊", label: "Caimanes"                },
      { emoji: "🥥", label: "Palmeras de Coco Silvestre" },
    ],
  },

  why: {
    eyebrow: "Por qué elegir a Luis",
    title1:  "No solo un guía.",
    titleEm: "Un guardián del bosque.",
    cards: [
      { icon: "🌱", title: "Nacido en la Isla",          body: "Luis creció en la selva de Bluff, Bocas del Toro. Cada sendero, planta y animal es parte de su experiencia vivida — no de un libro de texto." },
      { icon: "🏡", title: "Conocimiento Indígena Ngöbe", body: "Porta generaciones de sabiduría Ngöbe — las historias, los nombres de las plantas, el significado cultural detrás de todo lo que esta tierra provee." },
      { icon: "🔭", title: "Rastreador de Fauna",        body: "Su ojo entrenado captura lo que los visitantes pasan por alto: un perezoso camuflado en la corteza, una rana flecha sobre el musgo, un manakin bailando en el aire." },
      { icon: "💬", title: "Cálido y Apasionado",        body: "Más que un guía, Luis es un cuentacuentos. Cada parada en el sendero viene con una historia, una risa y una conexión humana genuina." },
      { icon: "🌊", title: "Experto en Mar y Selva",     body: "Desde las poderosas olas de Bluff hasta la catedral-silencio de la selva interior, Luis conoce íntimamente todo este extraordinario ecosistema." },
      { icon: "♻️", title: "Bajo Impacto y Responsable",  body: "Grupos pequeños, sin motores, sin extracción. Luis camina ligero y te enseña a hacer lo mismo — dejando la selva exactamente como la encontraste." },
    ],
  },

  banner: {
    location: "Playa Bluff · Bocas del Toro",
    title1:   "Panamá",
    titleEm:  "sin filtros.",
    title2:   "",
    sub:      "Selva, mar y pura vida salvaje. Bocas del Toro como pocos la conocen.",
  },
  contact: {
    eyebrow: "¿Listo para explorar?",
    title:   "Reserva tu tour con Luis",
    sub:     "Los tours salen todos los días, si el clima lo permite. Solo grupos pequeños. Envíale un mensaje a Luis por WhatsApp para verificar disponibilidad y reservar tu lugar.",
    cta:     "Mensaje a Luis por WhatsApp",
    note:    "Responde en unas horas · Bocas del Toro, Panamá",
  },

  wa:     { tooltip: "Chatear con Luis" },

  footer: {
    tagline: "Tours de Naturaleza · Playa Bluff · Bocas del Toro, Panamá",
    credit:  "Guiado por Luis, nativo de la isla.",
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// WhatsApp
// ─────────────────────────────────────────────────────────────────────────────
const WA_LINK = "https://wa.me/50765330998";

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────
function Reveal({ children, delay = 0, className = "" }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref} className={className}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function FadeIn({ children, delay = 0, className = "" }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref} className={className}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 1, delay }}
    >
      {children}
    </motion.div>
  );
}

const WaIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 32 32" fill="currentColor">
    <path d="M16.002 2.667C8.638 2.667 2.667 8.637 2.667 16c0 2.348.635 4.55 1.74 6.447L2.667 29.333l7.09-1.717A13.28 13.28 0 0016.002 29.333C23.365 29.333 29.333 23.363 29.333 16S23.365 2.667 16.002 2.667zm0 2.4c5.922 0 10.933 5.01 10.933 10.933s-5.01 10.933-10.933 10.933a10.9 10.9 0 01-5.57-1.527l-.397-.237-4.208 1.02 1.054-4.1-.26-.415A10.893 10.893 0 015.069 16c0-5.922 5.01-10.933 10.933-10.933zm-3.29 5.6c-.21 0-.55.079-.838.395-.288.317-1.1 1.075-1.1 2.62 0 1.546 1.126 3.04 1.283 3.25.158.21 2.2 3.513 5.423 4.787 2.693 1.061 3.24.85 3.826.797.585-.053 1.888-.77 2.155-1.515.266-.744.266-1.382.186-1.516-.079-.132-.288-.21-.604-.369-.316-.158-1.888-.93-2.18-1.036-.29-.105-.502-.158-.713.159-.21.316-.817 1.036-.999 1.246-.185.21-.37.236-.686.08-.315-.159-1.33-.49-2.534-1.563-.937-.836-1.57-1.868-1.754-2.184-.185-.316-.02-.487.138-.644.143-.14.317-.37.475-.554.158-.184.21-.316.316-.527.105-.21.053-.395-.026-.554-.08-.158-.704-1.71-.968-2.34-.253-.605-.513-.524-.712-.533-.184-.008-.396-.01-.607-.01z"/>
  </svg>
);

// ─────────────────────────────────────────────────────────────────────────────
// Floating WhatsApp button
// ─────────────────────────────────────────────────────────────────────────────
function FloatingWhatsApp() {
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 1800);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed bottom-7 right-7 z-50 flex items-center gap-3"
          initial={{ opacity: 0, scale: 0.4, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.4, y: 24 }}
          transition={{ type: "spring", stiffness: 280, damping: 22 }}
        >
          {/* tooltip */}
          <AnimatePresence>
            {hovered && (
              <motion.div
                className="bg-[#152b1d] text-white text-xs font-medium px-4 py-2.5 rounded-full shadow-2xl whitespace-nowrap pointer-events-none"
                initial={{ opacity: 0, x: 8, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 8, scale: 0.95 }}
                transition={{ duration: 0.18 }}
              >
                {T.wa.tooltip}
              </motion.div>
            )}
          </AnimatePresence>

          {/* button */}
          <motion.a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="relative w-16 h-16 rounded-full flex items-center justify-center text-white shadow-[0_8px_32px_rgba(37,211,102,0.45)]"
            style={{ background: "linear-gradient(135deg,#25d366 0%,#128c7e 100%)" }}
            onHoverStart={() => setHovered(true)}
            onHoverEnd={() => setHovered(false)}
            whileHover={{ scale: 1.13 }}
            whileTap={{ scale: 0.92 }}
          >
            {/* outer pulse */}
            <motion.span
              className="absolute inset-0 rounded-full bg-[#25d366]"
              animate={{ scale: [1, 1.6], opacity: [0.5, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
            />
            {/* inner pulse */}
            <motion.span
              className="absolute inset-0 rounded-full bg-[#25d366]"
              animate={{ scale: [1, 2], opacity: [0.3, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: 0.5 }}
            />
            <WaIcon className="w-8 h-8 relative z-10" />
          </motion.a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────
export default function Page() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY       = useTransform(scrollYProgress, [0, 1], ["0%", "28%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <div className="bg-[#fdfcf8] text-[#152b1d] overflow-x-hidden">

      <FloatingWhatsApp />

      {/* ── NAV ─────────────────────────────────────────────────────────── */}
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 transition-all duration-500 ${
          scrolled ? "bg-[#152b1d]/95 backdrop-blur-md shadow-xl" : "bg-transparent"
        }`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <a href="#" className="font-serif text-xl text-white tracking-wide no-underline">
          Wild<em className="text-[#93c47d] not-italic font-bold">Bluff</em>
        </a>
        <ul className="hidden md:flex gap-8 list-none m-0 p-0">
          {T.nav.links.map(({ label, anchor }) => (
            <li key={label}>
              <a href={anchor} className="text-white/70 hover:text-[#93c47d] text-xs uppercase tracking-widest transition-colors no-underline">
                {label}
              </a>
            </li>
          ))}
        </ul>
        <motion.a
          href={WA_LINK} target="_blank" rel="noopener noreferrer"
          className="bg-[#c8882a] text-white text-xs uppercase tracking-widest px-5 py-2.5 rounded-sm font-medium no-underline"
          whileHover={{ scale: 1.04, backgroundColor: "#a86e1f" }}
          whileTap={{ scale: 0.97 }}
        >
          {T.nav.cta}
        </motion.a>
      </motion.nav>

      {/* ── HERO ────────────────────────────────────────────────────────── */}
      <section ref={heroRef} className="relative h-screen min-h-[640px] flex items-center justify-center overflow-hidden">
        <motion.div className="absolute inset-0" style={{ y: heroY }}>
          <Image 
            src="/photo5.png" 
            alt="Bluff Beach Bocas del Toro" 
            fill 
            priority 
            sizes="100vw"
            className="object-cover object-center" 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#152b1d]/60 via-[#152b1d]/30 to-[#152b1d]/80" />
        </motion.div>

        <motion.div className="relative z-10 text-center px-6 max-w-3xl" style={{ opacity: heroOpacity }}>
          <motion.span
            className="font-['Caveat',cursive] text-[#93c47d] text-xl tracking-wide block mb-3"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            {T.hero.location}
          </motion.span>
          <motion.h1
            className="font-serif text-5xl md:text-7xl font-black text-white leading-[1.05] mb-6 drop-shadow-2xl"
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            {T.hero.title1} <em className="text-[#93c47d]">{T.hero.titleEm}</em>
            <br />{T.hero.title2}
          </motion.h1>
          <motion.p
            className="text-[#cdddc5] text-lg md:text-xl font-light leading-relaxed max-w-xl mx-auto mb-10"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            {T.hero.sub}
          </motion.p>
          <motion.div
            className="flex gap-4 justify-center flex-wrap"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
          >
            <motion.a href="#tours" className="bg-[#c8882a] text-white px-8 py-3.5 text-sm uppercase tracking-widest font-medium rounded-sm no-underline"
              whileHover={{ scale: 1.04, backgroundColor: "#a86e1f" }} whileTap={{ scale: 0.97 }}
            >
              {T.hero.cta1}
            </motion.a>
            <motion.a href="#about-luis" className="border border-white/40 text-white px-8 py-3.5 text-sm uppercase tracking-widest font-light rounded-sm hover:border-[#93c47d] hover:bg-white/5 transition-all no-underline"
              whileHover={{ scale: 1.02 }}
            >
              {T.hero.cta2}
            </motion.a>
          </motion.div>
        </motion.div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
          <span className="text-white/40 text-[10px] uppercase tracking-[0.2em]">{T.hero.scroll}</span>
          <motion.div
            className="w-px h-12 bg-gradient-to-b from-white/40 to-transparent"
            animate={{ scaleY: [1, 0.3, 1], opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </section>

      {/* ── TICKER ──────────────────────────────────────────────────────── */}
      <div className="bg-[#2a5038] py-4 overflow-hidden">
        <motion.div
          className="flex gap-16 whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
        >
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex gap-16 shrink-0">
              {T.ticker.map((t) => (
                <span key={t} className="text-[#cdddc5] text-xs uppercase tracking-[0.18em] font-light">{t}</span>
              ))}
            </div>
          ))}
        </motion.div>
      </div>

      {/* ── ABOUT LUIS ──────────────────────────────────────────────────── */}
      <section id="about-luis" className="bg-[#152b1d] py-28 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-20 items-center">
          <Reveal>
            <div className="relative">
              <div className="relative h-[560px] rounded overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.45)]">
                <Image 
                  src="/photo1.png" 
                  alt="Luis your guide" 
                  fill 
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#152b1d]/40 to-transparent" />
              </div>
              <div className="absolute -bottom-5 -right-5 w-40 h-40 bg-[#c8882a] rounded -z-10" />
              <div className="absolute top-6 -right-6 bg-[#2a5038] border border-[#93c47d]/20 rounded px-5 py-4 shadow-xl hidden md:block">
                <p className="text-[#93c47d] text-xs uppercase tracking-widest mb-1">{T.about.badge.label}</p>
                <p className="text-white font-serif text-xl font-bold">{T.about.badge.name}</p>
                <p className="text-[#cdddc5] text-xs mt-0.5">{T.about.badge.sub}</p>
              </div>
            </div>
          </Reveal>
          <div>
            <Reveal delay={0.1}><span className="font-['Caveat',cursive] text-[#93c47d] text-xl block mb-3">{T.about.eyebrow}</span></Reveal>
            <Reveal delay={0.2}>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
                {T.about.title1} <em className="text-[#93c47d]">{T.about.titleEm}</em> {T.about.title2}
              </h2>
            </Reveal>
            <Reveal delay={0.3}><p className="text-[#cdddc5] text-base font-light leading-relaxed mb-5">{T.about.p1}</p></Reveal>
            <Reveal delay={0.4}><p className="text-[#cdddc5] text-base font-light leading-relaxed mb-6">{T.about.p2}</p></Reveal>
            <Reveal delay={0.5}>
              <blockquote className="border-l-4 border-[#c8882a] pl-5 font-serif italic text-[#cdddc5] text-lg leading-relaxed mb-8">
                {T.about.quote}
                <span className="block mt-2 text-sm not-italic font-light text-[#93c47d]">{T.about.quoteBy}</span>
              </blockquote>
            </Reveal>
            <Reveal delay={0.6}>
              <div className="flex flex-wrap gap-2">
                {T.about.tags.map((b) => (
                  <span key={b} className="bg-[#93c47d]/10 border border-[#93c47d]/25 text-[#93c47d] text-xs px-4 py-1.5 rounded-full tracking-wide">{b}</span>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── TOURS ───────────────────────────────────────────────────────── */}
      <section id="tours" className="bg-[#1a3326] py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center mb-20">
            <span className="font-['Caveat',cursive] text-[#93c47d] text-xl block mb-3">{T.tours.eyebrow}</span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-white leading-tight">
              {T.tours.title1} <em className="text-[#93c47d]">{T.tours.titleEm}</em> {T.tours.title2}
            </h2>
          </Reveal>

          {/* Tour 1 */}
          <Reveal delay={0.1} className="mb-14">
            <div className="grid md:grid-cols-2 rounded-lg overflow-hidden border border-white/8 shadow-[0_24px_80px_rgba(0,0,0,0.4)]">
              <div className="relative min-h-[480px]">
                <Image 
                  src="/photo3.png" 
                  alt={T.tour1.title} 
                  fill 
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover" 
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#1a3326]/60" />
                <span className="absolute top-6 left-6 bg-[#c8882a]/90 backdrop-blur-sm text-white text-xs uppercase tracking-widest px-4 py-1.5 rounded-sm font-medium">
                  {T.tour1.tag}
                </span>
              </div>
              <div className="bg-[#152b1d] p-10 md:p-14 flex flex-col justify-center">
                <span className="font-['Caveat',cursive] text-[#93c47d] text-lg mb-2 block">{T.tour1.num}</span>
                <h3 className="font-serif text-4xl font-bold text-white leading-tight mb-5">{T.tour1.title}</h3>
                <p className="text-[#cdddc5] font-light leading-relaxed mb-7 text-sm">{T.tour1.desc}</p>
                <ul className="space-y-3 mb-8 list-none p-0">
                  {T.tour1.details.map(([icon, text]) => (
                    <li key={text} className="flex items-center gap-3 text-[#cdddc5] text-sm">
                      <span className="w-6 text-center">{icon}</span><span>{text}</span>
                    </li>
                  ))}
                </ul>
                <motion.a href={WA_LINK} target="_blank" rel="noopener noreferrer"
                  className="inline-block self-start bg-[#c8882a] text-white text-xs uppercase tracking-widest px-7 py-3 rounded-sm font-medium no-underline"
                  whileHover={{ scale: 1.04, backgroundColor: "#a86e1f" }} whileTap={{ scale: 0.97 }}
                >
                  {T.tours.cta}
                </motion.a>
              </div>
            </div>
          </Reveal>

          {/* Tour 2 */}
          <Reveal delay={0.15}>
            <div className="grid md:grid-cols-2 rounded-lg overflow-hidden border border-white/8 shadow-[0_24px_80px_rgba(0,0,0,0.4)]">
              <div className="bg-[#152b1d] p-10 md:p-14 flex flex-col justify-center order-2 md:order-1">
                <span className="font-['Caveat',cursive] text-[#93c47d] text-lg mb-2 block">{T.tour2.num}</span>
                <h3 className="font-serif text-4xl font-bold text-white leading-tight mb-5">{T.tour2.title}</h3>
                <p className="text-[#cdddc5] font-light leading-relaxed mb-7 text-sm">{T.tour2.desc}</p>
                <ul className="space-y-3 mb-8 list-none p-0">
                  {T.tour2.details.map(([icon, text]) => (
                    <li key={text} className="flex items-center gap-3 text-[#cdddc5] text-sm">
                      <span className="w-6 text-center">{icon}</span><span>{text}</span>
                    </li>
                  ))}
                </ul>
                <motion.a href={WA_LINK} target="_blank" rel="noopener noreferrer"
                  className="inline-block self-start bg-[#c8882a] text-white text-xs uppercase tracking-widest px-7 py-3 rounded-sm font-medium no-underline"
                  whileHover={{ scale: 1.04, backgroundColor: "#a86e1f" }} whileTap={{ scale: 0.97 }}
                >
                  {T.tours.cta}
                </motion.a>
              </div>
              <div className="relative min-h-[480px] order-1 md:order-2">
                <Image 
                  src="/photo2.png" 
                  alt={T.tour2.title} 
                  fill 
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover" 
                />
                <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#1a3326]/60" />
                <span className="absolute top-6 right-6 bg-[#2a5038]/90 backdrop-blur-sm text-[#cdddc5] text-xs uppercase tracking-widest px-4 py-1.5 rounded-sm font-medium">
                  {T.tour2.tag}
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── PHOTO STRIP ─────────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 md:grid-cols-4 h-64 md:h-80">
        {[
          { src: "/photo4.png", sizes: "(max-width: 768px) 50vw, 25vw" },
          { src: "/photo6.png", sizes: "(max-width: 768px) 50vw, 25vw" },
          { src: "/photo7.png", sizes: "(max-width: 768px) 50vw, 25vw" },
          { src: "/photo9.png", sizes: "(max-width: 768px) 50vw, 25vw" }
        ].map(({ src, sizes }, i) => (
          <FadeIn key={src} delay={i * 0.1} className="relative overflow-hidden group">
            <Image 
              src={src} 
              alt="Wildlife Bocas del Toro" 
              fill
              sizes={sizes}
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-[#152b1d]/25 group-hover:bg-[#152b1d]/0 transition-colors duration-500" />
          </FadeIn>
        ))}
      </div>

      {/* ── WILDLIFE ────────────────────────────────────────────────────── */}
      <section id="wildlife" className="bg-[#f4efe4] py-28 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <Reveal>
            <span className="font-['Caveat',cursive] text-[#2a5038] text-xl block mb-3">{T.wildlife.eyebrow}</span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#152b1d] leading-tight mb-4">
              {T.wildlife.title1} <em className="text-[#2a5038]">{T.wildlife.titleEm}</em>
            </h2>
            <p className="text-[#2a5038] font-light text-base leading-relaxed max-w-lg mx-auto mb-14">{T.wildlife.sub}</p>
          </Reveal>
          <div className="flex flex-wrap gap-3 justify-center">
            {T.wildlife.items.map(({ emoji, label }, i) => (
              <motion.div key={label}
                className="flex items-center gap-2 bg-white border border-[#2a5038]/15 px-5 py-2.5 rounded-full shadow-sm cursor-default"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.06, ease: "backOut" }}
                whileHover={{ y: -4, boxShadow: "0 8px 24px rgba(0,0,0,0.12)" }}
              >
                <span className="text-2xl">{emoji}</span>
                <span className="text-sm font-medium text-[#2a5038]">{label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY LUIS ────────────────────────────────────────────────────── */}
      <section className="bg-white py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center mb-16">
            <span className="font-['Caveat',cursive] text-[#2a5038] text-xl block mb-3">{T.why.eyebrow}</span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#152b1d] leading-tight">
              {T.why.title1} <em className="text-[#2a5038]">{T.why.titleEm}</em>
            </h2>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-6">
            {T.why.cards.map(({ icon, title, body }, i) => (
              <motion.div key={title}
                className="bg-[#f4efe4] rounded-md p-8 border-b-4 border-[#2a5038]"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -6, boxShadow: "0 16px 40px rgba(0,0,0,0.1)" }}
              >
                <span className="text-4xl block mb-4">{icon}</span>
                <h4 className="font-serif text-xl font-bold text-[#152b1d] mb-3">{title}</h4>
                <p className="text-[#2a5038] text-sm leading-relaxed font-light">{body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BANNER ──────────────────────────────────────────────────────── */}
      <section className="relative py-36 px-6 overflow-hidden">
        <div className="absolute inset-0">
          <Image 
            src="/photo6.png" 
            alt="Bocas del Toro nature" 
            fill 
            sizes="100vw"
            className="object-cover" 
          />
          <div className="absolute inset-0 bg-[#152b1d]/80" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <Reveal>
            <span className="font-['Caveat',cursive] text-[#93c47d] text-2xl block mb-5">{T.banner.location}</span>
            <h2 className="font-serif text-4xl md:text-6xl font-black text-white leading-tight mb-6">
              {T.banner.title1} <em className="text-[#93c47d]">{T.banner.titleEm}</em>
            </h2>
            <p className="text-[#cdddc5] font-light text-lg leading-relaxed max-w-xl mx-auto">{T.banner.sub}</p>
          </Reveal>
        </div>
      </section>

      {/* ── CONTACT ─────────────────────────────────────────────────────── */}
      <section id="contact" className="bg-[#152b1d] py-28 px-6">
        <div className="max-w-xl mx-auto text-center">
          <Reveal>
            <span className="font-['Caveat',cursive] text-[#93c47d] text-xl block mb-3">{T.contact.eyebrow}</span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-white leading-tight mb-5">{T.contact.title}</h2>
            <p className="text-[#cdddc5] font-light leading-relaxed mb-10 text-base">{T.contact.sub}</p>
          </Reveal>
          <Reveal delay={0.2}>
            <motion.a
              href={WA_LINK} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-3 text-white text-sm uppercase tracking-widest px-10 py-5 rounded-sm font-medium no-underline"
              style={{ background: "linear-gradient(135deg,#25d366 0%,#128c7e 100%)", boxShadow: "0 8px 40px rgba(37,211,102,0.3)" }}
              whileHover={{ scale: 1.05, boxShadow: "0 12px 50px rgba(37,211,102,0.5)" }}
              whileTap={{ scale: 0.97 }}
            >
              <WaIcon className="w-5 h-5" />
              {T.contact.cta}
            </motion.a>
            <p className="text-white/25 text-xs mt-6 tracking-wide">{T.contact.note}</p>
          </Reveal>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────────────────────── */}
      <footer className="bg-[#0e1f14] py-10 px-6 text-center">
        <p className="font-serif text-2xl text-white mb-1">
          Wild<em className="text-[#93c47d] not-italic font-bold">Bluff</em>
        </p>
        <p className="text-white/30 text-xs tracking-widest uppercase mb-3">{T.footer.tagline}</p>
        <p className="text-white/20 text-xs">© {new Date().getFullYear()} WildBluff. {T.footer.credit}</p>
      </footer>

    </div>
  );
}