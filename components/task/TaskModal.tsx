"use client";
import React from "react";
import useTaskStore from "@/store/useTaskStore";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

interface NewTaskModalProps {
  show: boolean;
  onClose: () => void;
}

const NewTaskModal: React.FC<NewTaskModalProps> = ({ show, onClose }) => {
  const {
    newTaskTitle,
    newTaskDate,
    newTaskDescription,
    setNewTaskTitle,
    setNewTaskDate,
    setNewTaskDescription,
    addTask,
    resetNewTaskFields,
  } = useTaskStore();

  const handleAddTask = () => {
    if (newTaskTitle) {
      addTask(newTaskTitle, newTaskDate, newTaskDescription);
      toast.success("Task Created!");
      onClose();
      resetNewTaskFields();
    } else {
      toast.error("Title is required!");
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-75">
      <motion.div
        initial={{
          y: 10,
          opacity: 0,
          scale: 1,
        }}
        animate={{
          y: 0,
          opacity: 1,
          scale: 1,
        }}
        transition={{
          duration: 0.2,
        }}
        className="w-11/12 rounded-md bg-white p-6 md:w-2/4"
      >
        <h2 className="mb-4 text-2xl font-semibold">New Task</h2>
        <div className="mb-4">
          <label
            htmlFor="newTaskTitle"
            className="block text-sm font-medium text-gray-700"
          >
            Title
          </label>
          <input
            type="text"
            id="newTaskTitle"
            name="newTaskTitle"
            className="mt-1 w-full rounded border border-gray-300 p-2"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="newTaskDate"
            className="block text-sm font-medium text-gray-700"
          >
            Task Date
          </label>
          <input
            type="date"
            id="newTaskDate"
            name="newTaskDate"
            className="mt-1 w-full rounded border border-gray-300 p-2"
            value={newTaskDate}
            onChange={(e) => setNewTaskDate(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="newTaskDescription"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            id="newTaskDescription"
            name="newTaskDescription"
            rows={3}
            className="mt-1 w-full rounded border border-gray-300 p-2"
            value={newTaskDescription}
            onChange={(e) => setNewTaskDescription(e.target.value)}
          ></textarea>
        </div>
        <div className="flex justify-end">
          <button
            className="mr-2 rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
            onClick={handleAddTask}
          >
            Add Task
          </button>
          <button
            className="rounded-md bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default NewTaskModal;
