import React, { useEffect, useRef, useState } from "react";

interface ChronoProps {
  isRunning: boolean;
  resetSignal?: number;
}

const Chrono: React.FC<ChronoProps> = ({ isRunning, resetSignal = 0 }) => {
  const [seconds, setSeconds] = useState<number>(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isRunning]);

  useEffect(() => {
    setSeconds(0);
  }, [resetSignal]);

  const formatTime = (totalSeconds: number): string => {
    const minutes = Math.floor(totalSeconds / 60)
      .toString()
      .padStart(2, "0");
    const secs = (totalSeconds % 60).toString().padStart(2, "0");
    return `${minutes}:${secs}`;
  };

  return (
    <div>
      <span className="text-colorTitle lg:text-[64px] font-medium">
        {formatTime(seconds)}
      </span>
    </div>
  );
};

export default Chrono;
