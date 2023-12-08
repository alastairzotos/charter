import { useRefreshToken } from "hooks/refresh";
import { useEffect, useState } from "react";

export type IConnStatus =
  | "connecting"
  | "connected"
  | "disconnected"
  | "error"
  | null;
type IReconnectFn = () => void;

export const useWebSockets = <T extends Object>(
  url: string,
  handle: string,
  onReceiveMessage: (data: T) => void
): [IConnStatus, IReconnectFn] => {
  const [token, refreshToken] = useRefreshToken();
  const [connStatus, setConnStatus] = useState<IConnStatus>(null);

  useEffect(() => {
    setConnStatus("connecting");
    const ws = new WebSocket(url + `/ws?handle=${handle}`);

    ws.onopen = () => setConnStatus("connected");
    ws.onerror = () => setConnStatus("error");
    ws.onclose = () => setConnStatus("disconnected");
    ws.onmessage = (e) => onReceiveMessage(JSON.parse(e.data));
  }, [token]);

  return [connStatus, refreshToken];
};
