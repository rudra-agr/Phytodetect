import { useCallback, useEffect, useState } from "react";
import { historyRepository } from "../storage/historyStorage";
import { HistoryItem } from "../types";

export function useHistory() {
  const [items, setItems] = useState<HistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const load = useCallback(async () => {
    setIsLoading(true);
    const data = await historyRepository.getAll();
    setItems(data);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const removeItem = useCallback(
    async (id: string) => {
      await historyRepository.remove(id);
      await load();
    },
    [load]
  );

  const clearAll = useCallback(async () => {
    await historyRepository.clear();
    await load();
  }, [load]);

  return { items, isLoading, reload: load, removeItem, clearAll };
}
