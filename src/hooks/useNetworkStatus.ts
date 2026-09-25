import { useCallback, useEffect, useState } from "react";
import { getNetworkState } from "../utils/networkUtils";
import { NetworkState } from "../types";

export function useNetworkStatus() {
  const [status, setStatus] = useState<NetworkState>("unknown");

  const refresh = useCallback(async () => {
    const state = await getNetworkState();
    setStatus(state);
  }, []);

  useEffect(() => {
    refresh();
    const interval = setInterval(refresh, 15000);
    return () => clearInterval(interval);
  }, [refresh]);

  return { status, refresh };
}
