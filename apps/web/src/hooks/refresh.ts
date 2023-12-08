import { useState } from "react";

export const useRefreshToken = (): [number, () => void] => {
  const [token, setToken] = useState(0);

  return [token, () => setToken((token) => token + 1)];
};
