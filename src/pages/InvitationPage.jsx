import { useState, useEffect, useRef } from "react";
import Lottie from "lottie-react";
import { useAuth } from "../context/AuthContext";
import CountdownTimer from "../components/CountdownTimer";
import BeerMug from "../components/BeerMug";
import {
  MapPin,
  Calendar,
  Clock,
  LogOut,
  PartyPopper,
  Check,
  Sparkles,
} from "lucide-react";

// Lottie animation data (embedded to avoid external dependencies)
const beerAnimationData = {
  v: "5.7.4",
  fr: 30,
  ip: 0,
  op: 50,
  w: 400,
  h: 400,
  nm: "Beer Animation",
  ddd: 0,
  assets: [],
  layers: [
    {
      ddd: 0,
      ind: 1,
      ty: 4,
      nm: "Glass",
      sr: 1,
      ks: {
        o: { a: 0, k: 100 },
        r: { a: 0, k: 0 },
        p: { a: 0, k: [200, 220, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: { a: 0, k: [100, 100, 100] },
      },
      ao: 0,
      shapes: [
        {
          ty: "rc",
          d: 1,
          s: { a: 0, k: [120, 180] },
          p: { a: 0, k: [0, 0] },
          r: { a: 0, k: 15 },
          nm: "Beer Glass",
        },
        {
          ty: "fl",
          c: { a: 0, k: [0.96, 0.62, 0.04, 1] },
          o: { a: 0, k: 100 },
          r: 1,
          bm: 0,
          nm: "Beer Fill",
        },
      ],
      ip: 0,
      op: 90,
      st: 0,
    },
    {
      ddd: 0,
      ind: 2,
      ty: 4,
      nm: "Foam",
      sr: 1,
      ks: {
        o: { a: 0, k: 100 },
        r: { a: 0, k: 0 },
        p: { a: 0, k: [200, 130, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: {
          a: 1,
          k: [
            {
              t: 0,
              s: [100, 0, 100],
              i: { x: [0.5], y: [1] },
              o: { x: [0.5], y: [0] },
            },
            { t: 30, s: [100, 100, 100] },
          ],
        },
      },
      ao: 0,
      shapes: [
        {
          ty: "el",
          d: 1,
          s: { a: 0, k: [130, 50] },
          p: { a: 0, k: [0, 0] },
          nm: "Foam Top",
        },
        {
          ty: "fl",
          c: { a: 0, k: [1, 0.96, 0.84, 1] },
          o: { a: 0, k: 100 },
          r: 1,
          bm: 0,
          nm: "Foam Fill",
        },
      ],
      ip: 0,
      op: 90,
      st: 0,
    },
    {
      ddd: 0,
      ind: 3,
      ty: 4,
      nm: "Bubbles",
      sr: 1,
      ks: {
        o: { a: 0, k: 60 },
        r: { a: 0, k: 0 },
        p: {
          a: 1,
          k: [
            {
              t: 0,
              s: [200, 280, 0],
              i: { x: 0.5, y: 1 },
              o: { x: 0.5, y: 0 },
            },
            {
              t: 60,
              s: [200, 150, 0],
              i: { x: 0.5, y: 1 },
              o: { x: 0.5, y: 0 },
            },
            { t: 90, s: [200, 280, 0] },
          ],
        },
        a: { a: 0, k: [0, 0, 0] },
        s: {
          a: 1,
          k: [
            { t: 0, s: [50, 50, 100] },
            { t: 60, s: [100, 100, 100] },
          ],
        },
      },
      ao: 0,
      shapes: [
        {
          ty: "el",
          d: 1,
          s: { a: 0, k: [20, 20] },
          p: { a: 0, k: [0, 0] },
          nm: "Bubble",
        },
        {
          ty: "fl",
          c: { a: 0, k: [1, 1, 1, 1] },
          o: { a: 0, k: 100 },
          r: 1,
          bm: 0,
          nm: "Bubble Fill",
        },
      ],
      ip: 0,
      op: 90,
      st: 0,
    },
  ],
};

const confettiAnimationData = {
  v: "5.7.4",
  fr: 60,
  ip: 0,
  op: 120,
  w: 800,
  h: 600,
  nm: "Confetti",
  ddd: 0,
  assets: [],
  layers: Array.from({ length: 30 }, (_, i) => ({
    ddd: 0,
    ind: i + 1,
    ty: 4,
    nm: `Confetti ${i}`,
    sr: 1,
    ks: {
      o: { a: 0, k: 100 },
      r: {
        a: 1,
        k: [
          {
            t: 0,
            s: [Math.random() * 360],
            i: { x: [0.5], y: [1] },
            o: { x: [0.5], y: [0] },
          },
          { t: 120, s: [Math.random() * 720] },
        ],
      },
      p: {
        a: 1,
        k: [
          { t: 0, s: [400, -50, 0], i: { x: 0.5, y: 1 }, o: { x: 0.5, y: 0 } },
          { t: 120, s: [100 + Math.random() * 600, 650, 0] },
        ],
      },
      a: { a: 0, k: [0, 0, 0] },
      s: { a: 0, k: [100, 100, 100] },
    },
    ao: 0,
    shapes: [
      {
        ty: "rc",
        d: 1,
        s: { a: 0, k: [10, 20] },
        p: { a: 0, k: [0, 0] },
        r: { a: 0, k: 2 },
        nm: "Rectangle",
      },
      {
        ty: "fl",
        c: {
          a: 0,
          k: [
            Math.random() > 0.5
              ? [0.96, 0.62, 0.04, 1]
              : Math.random() > 0.5
                ? [0.8, 0.2, 0.2, 1]
                : [0.2, 0.8, 0.4, 1],
          ],
        },
        o: { a: 0, k: 100 },
        r: 1,
        bm: 0,
        nm: "Fill",
      },
    ],
    ip: 0,
    op: 120,
    st: 0,
  })),
};

export default function InvitationPage() {
  const { user, logout } = useAuth();
  const [hasRSVP, setHasRSVP] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [mounted, setMounted] = useState(false);

  const confettiRef = useRef(null);

  useEffect(() => {
    // Check if user already RSVP'd
    const rsvpStatus = localStorage.getItem("beer_invitation_rsvp");
    if (rsvpStatus) {
      setHasRSVP(true);
    }

    // Trigger mount animation
    setTimeout(() => setMounted(true), 100);
  }, []);

  const handleRSVP = () => {
    localStorage.setItem(
      "beer_invitation_rsvp",
      JSON.stringify({
        confirmed: true,
        timestamp: new Date().toISOString(),
      }),
    );
    setHasRSVP(true);
    setShowConfetti(true);

    setTimeout(() => {
      setShowConfetti(false);
    }, 4000);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div
      className={`min-h-screen p-4 md:p-8 relative overflow-hidden transition-all duration-1000 ${mounted ? "opacity-100" : "opacity-0"}`}>
      {/* Background decorations */}
      <div className='absolute inset-0 overflow-hidden pointer-events-none'>
        <div className='absolute top-10 left-10 text-6xl opacity-5 animate-spin-slow'>
          🍺
        </div>
        <div className='absolute top-1/4 right-20 text-8xl opacity-5 animate-bounce-slow'>
          🍻
        </div>
        <div className='absolute bottom-20 left-1/4 text-5xl opacity-5 animate-pulse'>
          🍻
        </div>
        <div className='absolute bottom-1/3 right-10 text-7xl opacity-5 animate-float'>
          🍺
        </div>
      </div>

      {/* Grain overlay */}
      <div className='absolute inset-0 bg-grain pointer-events-none'></div>

      {/* Confetti overlay */}
      {showConfetti && (
        <div className='fixed inset-0 z-50 pointer-events-none'>
          <Lottie
            lottieRef={confettiRef}
            animationData={confettiAnimationData}
            loop={false}
            style={{ width: "100%", height: "100%" }}
          />
        </div>
      )}

      {/* Header */}
      <header className='flex justify-between items-center mb-8 relative z-10'>
        <div className='flex items-center gap-3'>
          <span className='text-3xl'>🍺</span>
          <span className='text-white/80 font-medium'>Zaproszenie na piwo</span>
        </div>
        <button
          onClick={handleLogout}
          className='flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-white/80 hover:text-white'>
          <LogOut className='w-4 h-4' />
          <span className='hidden sm:inline'>Wyloguj się</span>
        </button>
      </header>

      {/* Main content */}
      <main className='max-w-4xl mx-auto relative z-10'>
        {/* Welcome section */}
        <section
          className={`text-center mb-12 transition-all duration-700 delay-300 ${mounted ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
          <h1 className='text-4xl md:text-6xl font-bold text-white mb-4 text-shadow-glow'>
            Witajcie, {user?.name || "Gościu"}! 🎉
          </h1>
          <p className='text-xl md:text-2xl text-beer-amber-400 font-medium'>
            Masz zaproszenie na niezapomniany wieczór z piwem!
          </p>
        </section>

        {/* Lottie Animation */}
        <section
          className={`flex justify-center mb-12 transition-all duration-700 delay-500 ${mounted ? "scale-100 opacity-100" : "scale-50 opacity-0"}`}>
          <div
            className='w-64 h-64 md:w-80 md:h-80 relative lottie-container'
            style={{ backgroundColor: "transparent" }}>
            <Lottie
              animationData={beerAnimationData}
              loop={true}
              style={{
                width: "100%",
                height: "100%",
                background: "transparent",
              }}
              background='transparent'
            />
            <div className='absolute inset-0 flex items-center justify-center'>
              <Sparkles className='w-12 h-12 text-beer-amber-400 animate-pulse' />
            </div>
          </div>
        </section>

        {/* Event details card */}
        <section
          className={`glass-card p-6 md:p-8 mb-8 transition-all duration-700 delay-700 ${mounted ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
          <h2 className='text-2xl md:text-3xl font-bold text-center text-white mb-6'>
            📋 Szczegóły spotkania
          </h2>

          <div className='grid md:grid-cols-3 gap-6'>
            <div className='flex flex-col items-center text-center p-4 rounded-xl bg-white/5'>
              <div className='w-14 h-14 rounded-full bg-beer-amber-400/20 flex items-center justify-center mb-3'>
                <Calendar className='w-7 h-7 text-beer-amber-400' />
              </div>
              <h3 className='text-white font-semibold mb-1'>Data</h3>
              <p className='text-white/70'>
                {user?.event?.date ?? "Do ustalenia"}
              </p>
              <p className='text-white/50 text-sm'>
                {user?.event?.dayOfWeek ? `(${user.event.dayOfWeek})` : ""}
              </p>
            </div>

            <div className='flex flex-col items-center text-center p-4 rounded-xl bg-white/5'>
              <div className='w-14 h-14 rounded-full bg-beer-amber-400/20 flex items-center justify-center mb-3'>
                <Clock className='w-7 h-7 text-beer-amber-400' />
              </div>
              <h3 className='text-white font-semibold mb-1'>Godzina</h3>
              <p className='text-white/70'>
                {user?.event?.time ?? "Do ustalenia"}
              </p>
              <p className='text-white/50 text-sm'>
                {user?.event?.timeNote ?? ""}
              </p>
            </div>

            <div className='flex flex-col items-center text-center p-4 rounded-xl bg-white/5'>
              <div className='w-14 h-14 rounded-full bg-beer-amber-400/20 flex items-center justify-center mb-3'>
                <MapPin className='w-7 h-7 text-beer-amber-400' />
              </div>
              <h3 className='text-white font-semibold mb-1'>Miejsce</h3>
              <p className='text-white/70'>
                {user?.event?.place ?? "Do ustalenia"}
              </p>
              <p className='text-white/50 text-sm'>
                {user?.event?.placeNote ?? ""}
              </p>
            </div>
          </div>
        </section>

        {/* Countdown */}
        <section
          className={`mb-12 text-center transition-all duration-700 delay-900 ${mounted ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
          <h2 className='text-xl text-white/70 mb-4'>
            ⏰ Odliczanie do spotkania
          </h2>
          <CountdownTimer
            targetDate={
              user?.event?.isoDate ? new Date(user.event.isoDate) : undefined
            }
          />
        </section>

        {/* Interactive Beer Mug */}
        <section
          className={`flex flex-col items-center mb-12 transition-all duration-700 delay-1100 ${mounted ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
          <BeerMug />
        </section>

        {/* RSVP Section */}
        <section
          className={`text-center transition-all duration-700 delay-1300 ${mounted ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
          <div className='glass-card p-8 max-w-lg mx-auto'>
            <h2 className='text-2xl md:text-3xl font-bold text-white mb-4'>
              Potwierdź swoją obecność!
            </h2>
            <p className='text-white/70 mb-6'>
              Kliknij przycisk poniżej, aby potwierdzić, że przyjdziesz na piwo!
            </p>

            {hasRSVP ? (
              <div className='space-y-4'>
                <div className='inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-green-500/20 border border-green-500/30 text-green-400'>
                  <Check className='w-6 h-6' />
                  <span className='font-semibold text-lg'>Zapisano!</span>
                  <PartyPopper className='w-6 h-6 animate-bounce' />
                </div>
                <p className='text-white/60 text-sm'>
                  Do zobaczenia na miejscu! 🍻
                </p>
              </div>
            ) : (
              <button
                onClick={handleRSVP}
                className='btn-primary text-lg px-10 py-4 inline-flex items-center gap-3'>
                <PartyPopper className='w-6 h-6' />
                Tak, będę! 🍺
              </button>
            )}
          </div>
        </section>

        {/* Footer */}
        <footer
          className={`mt-16 text-center text-white/40 text-sm transition-all duration-700 delay-1500 ${mounted ? "opacity-100" : "opacity-0"}`}>
          <p>Wykonane z 🍺 i ❤️</p>
          <p className='mt-1'>Kinga Kobiec Company © 2026</p>
        </footer>
      </main>

      {/* Additional styles for animations */}
      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
