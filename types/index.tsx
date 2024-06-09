export interface ChatDatas {
  id: number;
  attributes: {
    sender: string;
    message: string;
    time: string;
  };
}
export interface ReplyData {
  id: number;
  attributes: {
    chatId: number;
    sender: string;
    message: string;
    time: string;
  };
}

export interface NewChatMessage {
  sender: string;
  message: string;
}

export interface TasksData {
  id: number;
  title: string;
  description: string;
  taskcreated: string;
}

export interface Task {
  id: number;
  title: string;
  description?: string;
  date: string;
}

export interface TaskModalProps {
  show: boolean;
  onClose: () => void;
}

export interface TaskItemProps {
  taskId: number;
  title: string;
  description: string;
  taskcreated: string;
  isComplete: boolean;
  onDelete: () => void;
  setTasks: React.Dispatch<React.SetStateAction<TasksData[]>>;
  stickerOptions: string[];
}

export interface LoadingIndicatorProps {
  loadingText: string;
}

export interface TaskListData {
  id: number;
  title: string;
  date: string;
  description: string;
}

export interface NewTaskListData {
  title: string;
  date: string;
  description: string;
}
