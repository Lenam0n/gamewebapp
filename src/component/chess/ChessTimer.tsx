import React, { useEffect, useState } from "react";

interface TimerProps {
  onTimeUpdate: (time: string) => void;
}

const Timer: React.FC<TimerProps> = ({ onTimeUpdate }) => {
  const [timeElapsed, setTimeElapsed] = useState<string>("00:00");

  useEffect(() => {
    const startTime = Date.now();
    const timer = setInterval(() => {
      const now = Date.now();
      const elapsed = Math.floor((now - startTime) / 1000);
      const minutes = String(Math.floor(elapsed / 60)).padStart(2, "0");
      const seconds = String(elapsed % 60).padStart(2, "0");
      const newTime = `${minutes}:${seconds}`;
      setTimeElapsed(newTime);
      onTimeUpdate(newTime); // Zeit an die Elternkomponente weitergeben
    }, 1000);

    return () => clearInterval(timer);
  }, [onTimeUpdate]);

  return <p>Verstrichene Zeit: {timeElapsed}</p>;
};

export default Timer;
