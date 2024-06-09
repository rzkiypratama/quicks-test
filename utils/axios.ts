import axios from 'axios';
import { TaskListData, NewTaskListData } from '@/types';

const API_URL = 'https://quicks-be.vercel.app/api';

// TASK LIST API
export const fetchTaskLists = async (): Promise<TaskListData[]> => {
  try {
    const response = await axios.get<{ data: TaskListData[] }>(`${API_URL}/task-lists`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching task lists', error);
    return [];
  }
};

export const createTaskList = async (taskListData: NewTaskListData): Promise<TaskListData | null> => {
  try {
    const response = await axios.post<TaskListData>(
      `${API_URL}/task-lists`,
      { data: taskListData }
    );
    return response.data;
  } catch (error) {
    console.error('Error creating task list', error);
    return null;
  }
};

export const updateTaskList = async (taskId: number, taskListData: NewTaskListData): Promise<TaskListData | null> => {
  try {
    const response = await axios.put<TaskListData>(
      `${API_URL}/task-lists/${taskId}`,
      { data: taskListData }
    );
    return response.data;
  } catch (error) {
    console.error('Error updating task list', error);
    return null;
  }
};

export const deleteTaskList = async (taskId: number): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/task-lists/${taskId}`);
  } catch (error) {
    console.error('Error deleting task list', error);
  }
};
