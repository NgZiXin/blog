"use client";

import { useEffect, useState } from "react";

interface Timings {
  seconds: number;
  minutes: number;
  hours: number;
}

export default function Clock() {
  const [seconds, setSeconds] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [hours, setHours] = useState<number>(0);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setSeconds(now.getSeconds());
      setMinutes(now.getMinutes());
      setHours(now.getHours());
    };

    updateTime(); // set immediately on mount
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="w-40 h-40 shadow-xl shadow-slate-400 bg-slate-100 text-slate-800 dark:bg-slate-900 dark:text-slate-100 relative flex items-center justify-center rounded-full">
      <ClockBase />
      <ClockParts seconds={seconds} minutes={minutes} hours={hours} />
    </div>
  );
}

function ClockBase() {
  const clockNumbers = [
    { num: 1, angle: 30 },
    { num: 2, angle: 60 },
    { num: 3, angle: 90 },
    { num: 4, angle: 120 },
    { num: 5, angle: 150 },
    { num: 6, angle: 180 },
    { num: 7, angle: 210 },
    { num: 8, angle: 240 },
    { num: 9, angle: 270 },
    { num: 10, angle: 300 },
    { num: 11, angle: 330 },
    { num: 12, angle: 0 },
  ];
  return (
    <>
      {clockNumbers.map(({ num, angle }) => (
        // Rotate the numbers along the clock face
        <label
          key={num}
          className="absolute inset-1 text-lg text-center"
          style={{ transform: `rotate(${angle}deg)` }}
        >
          {/* Rotate number back to upright position */}
          <span
            className="inline-block"
            style={{ transform: `rotate(${-angle}deg)` }}
          >
            {num}
          </span>
        </label>
      ))}
    </>
  );
}

function ClockParts({ seconds, minutes, hours }: Timings) {
  const secondsAngle: number = seconds * 6;
  const minutesAngle: number = minutes * 6;
  const hoursAngle: number = hours * 30 + minutes / 2;

  return (
    <section className="box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25); absolute z-50 flex h-4 w-4 justify-center">
      {/* Clock Center */}
      <span className="h-3 w-3 bg-slate-300 dark:bg-slate-600 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40" />
      <span className="h-2 w-2 bg-slate-800 dark:bg-slate-100 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50" />
      {/* Second hand */}
      <span
        className="h-[3.6em] w-0.5 bg-slate-800 dark:bg-slate-100 absolute bottom-1/2 left-1/2 -translate-x-1/2 z-30 origin-bottom rounded-md"
        style={{ transform: `rotate(${secondsAngle}deg)` }}
      />
      {/* Minute hand */}
      <span
        className="h-[3.3em] w-[0.15em] bg-slate-600 dark:bg-slate-100 absolute bottom-1/2 left-1/2 -translate-x-1/2 z-20 origin-bottom rounded-md"
        style={{ transform: `rotate(${minutesAngle}deg)` }}
      />
      {/* Hour hand */}
      <span
        className="h-[2.8em] w-[0.2em] bg-slate-600 dark:bg-slate-100 absolute bottom-1/2 left-1/2 -translate-x-1/2 z-10 origin-bottom divide-zinc-100 rounded-md"
        style={{ transform: `rotate(${hoursAngle}deg)` }}
      />
    </section>
  );
}
