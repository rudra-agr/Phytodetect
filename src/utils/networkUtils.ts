import * as Network from "expo-network";
import { NetworkState } from "../types";

export async function getNetworkState(): Promise<NetworkState> {
  try {
    const state = await Network.getNetworkStateAsync();
    if (state.isConnected && state.isInternetReachable !== false) {
      return "online";
    }
    return "offline";
  } catch (e) {
    return "unknown";
  }
}
