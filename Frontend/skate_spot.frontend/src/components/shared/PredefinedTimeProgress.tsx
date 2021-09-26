import { LinearProgress } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import "./sharedStyles.scss";

interface Props {
  clearDate: number;
}

export const PredefinedTimeProgress: React.FC<Props> = ({ clearDate }) => {
  const maxProgressValue = 100;
  const intervalTime = 50;
  const duration = clearDate - Date.now();

  const [progress, setProgress] = useState(maxProgressValue);

  useEffect(() => {
    setProgress(maxProgressValue);

    const interval = setInterval(() => {
      const timeLeft = clearDate - intervalTime - Date.now();

      setProgress(
        ((timeLeft < 0 ? 0 : timeLeft) * maxProgressValue) / duration
      );

      if (timeLeft <= 0) {
        clearInterval(interval);
        return;
      }
    }, intervalTime);

    return () => clearInterval(interval);
  }, [clearDate]);

  return <LinearProgress variant="determinate" value={progress} />;
};
