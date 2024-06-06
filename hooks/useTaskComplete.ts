import { useState, useEffect } from 'react';

export const useTaskCompletion = (taskId: number, initialIsComplete: boolean) => {
  const [isTaskCompleted, setIsTaskCompleted] = useState<boolean>(() => {
    const storedState = localStorage.getItem(`task_${taskId}_isComplete`);
    return storedState !== null ? JSON.parse(storedState) : initialIsComplete;
  });

  useEffect(() => {
    localStorage.setItem(`task_${taskId}_isComplete`, JSON.stringify(isTaskCompleted));
  }, [isTaskCompleted, taskId]);

  return { isTaskCompleted, setIsTaskCompleted };
};
