import { useEffect, useState } from "react";

export const useFadeIn = (time: number = 500): React.CSSProperties => {
  const [isNew, setIsNew] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsNew(false), time);
  }, []);

  return {
    transition: `opacity ${time}ms ease-in-out`,
    opacity: isNew ? 0 : 1,
  };
};
