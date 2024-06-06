import { useState, useEffect } from 'react';

export const useTaskStickers = (taskId: number) => {
  const [selectedStickers, setSelectedStickers] = useState<string[]>([]);

  useEffect(() => {
    try {
      const storedStickers = localStorage.getItem(`task_${taskId}_selectedSticker`);
      if (storedStickers) {
        setSelectedStickers(JSON.parse(storedStickers));
      }
    } catch (error) {
      console.error("Error retrieving stickers from local storage:", error);
    }
  }, [taskId]);

  const storeStickers = (stickers: string[]) => {
    try {
      localStorage.setItem(`task_${taskId}_selectedSticker`, JSON.stringify(stickers));
    } catch (error) {
      console.error("Error storing stickers in local storage:", error);
    }
  };

  return { selectedStickers, setSelectedStickers, storeStickers };
};
