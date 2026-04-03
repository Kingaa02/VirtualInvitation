import { useState, useEffect, useCallback } from "react";

function useCountdown(targetDate) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(targetDate));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return timeLeft;
}

function calculateTimeLeft(targetDate) {
  const difference = targetDate.getTime() - new Date().getTime();

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
    isExpired: false,
  };
}

function CountdownUnit({ value, label }) {
  return (
    <div className='flex flex-col items-center'>
      <div className='glass-card p-4 md:p-6 min-w-[80px] md:min-w-[100px]'>
        <span className='text-4xl md:text-5xl font-bold text-beer-amber-400 tabular-nums'>
          {String(value).padStart(2, "0")}
        </span>
      </div>
      <span className='text-white/60 text-sm mt-2 uppercase tracking-wider'>
        {label}
      </span>
    </div>
  );
}

export default function CountdownTimer({ targetDate }) {
  const timeLeft = useCountdown(targetDate ?? new Date("2026-04-03T18:00:00"));

  if (timeLeft.isExpired) {
    return (
      <div className='text-center'>
        <span className='text-3xl text-beer-amber-400'>Czas minął! 🎉</span>
      </div>
    );
  }

  return (
    <div className='flex flex-wrap justify-center gap-4 md:gap-6'>
      <CountdownUnit value={timeLeft.days} label='dni' />
      <CountdownUnit value={timeLeft.hours} label='godzin' />
      <CountdownUnit value={timeLeft.minutes} label='minut' />
      <CountdownUnit value={timeLeft.seconds} label='sekund' />
    </div>
  );
}
