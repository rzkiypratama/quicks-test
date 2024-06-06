import { create } from 'zustand';
import { TasksData } from '@/types';

interface TaskState {
  selectedCategory: string;
  showNewTaskModal: boolean;
  tasks: TasksData[];
  newTaskTitle: string;
  newTaskDate: string;
  newTaskDescription: string;
  setSelectedCategory: (category: string) => void;
  setShowNewTaskModal: (show: boolean) => void;
  addTask: (title: string, taskcreated: string, description: string) => void;
  deleteTask: (taskId: number) => void;
  setNewTaskTitle: (title: string) => void;
  setNewTaskDate: (date: string) => void;
  setNewTaskDescription: (description: string) => void;
  resetNewTaskFields: () => void;
  loadTasks: () => void;
}

const useTaskStore = create<TaskState>((set) => ({
  selectedCategory: 'My Task',
  showNewTaskModal: false,
  tasks: [],
  newTaskTitle: '',
  newTaskDate: new Date().toISOString().split('T')[0], // Default to today
  newTaskDescription: '',
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  setShowNewTaskModal: (show) => set({ showNewTaskModal: show }),
  addTask: (title, taskcreated, description) => {
    const newTask: TasksData = {
      id: new Date().getTime(),
      title,
      taskcreated,
      description,
    };
    set((state) => {
      const updatedTasks = [...state.tasks, newTask];
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
      return { tasks: updatedTasks };
    });
  },
  deleteTask: (taskId) => {
    set((state) => {
      const updatedTasks = state.tasks.filter((task) => task.id !== taskId);
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
      return { tasks: updatedTasks };
    });
  },
  setNewTaskTitle: (title) => set({ newTaskTitle: title }),
  setNewTaskDate: (date) => set({ newTaskDate: date }),
  setNewTaskDescription: (description) => set({ newTaskDescription: description }),
  resetNewTaskFields: () => set({
    newTaskTitle: '',
    newTaskDate: new Date().toISOString().split('T')[0], // Reset to today
    newTaskDescription: ''
  }),
  loadTasks: () => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    set({ tasks: storedTasks });
  },
}));

export default useTaskStore;
