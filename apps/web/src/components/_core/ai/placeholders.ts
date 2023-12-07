import { useEffect, useState } from "react";

const placeholders = [
  "I would like to try some watersports",
  "What family-friendly boat trips are there?",
  "I'd like to hire a boat",
  "I want to drive a car around the island",
  "Where can I try the food?",
  "I would like to see Corfu town",
];

export const usePlaceholder = () => {
  const [currentPlaceholderIndex, setCurrentPlaceholderIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentPlaceholderIndex((prevIndex) =>
        prevIndex === placeholders.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(intervalId);
  }, []);

  return placeholders[currentPlaceholderIndex];
};
