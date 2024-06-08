"use client";
import { useEffect, useState } from "react";
import Head from "next/head";
import TaskBubble from "./TaskBubble";
import LoadingIndicator from "../Loader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useTaskStore from "@/store/useTaskStore";
import TaskModal from "./TaskModal";
import { motion } from "framer-motion";

const TaskContainer: React.FC = () => {
  const {
    selectedCategory,
    showNewTaskModal,
    tasks,
    setSelectedCategory,
    setShowNewTaskModal,
    deleteTask,
    loadTasks,
  } = useTaskStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await loadTasks();
      setLoading(false);
    };

    loadData();
  }, [loadTasks]);

  const handleNewTaskClick = () => {
    setShowNewTaskModal(true);
  };

  const handleModalClose = () => {
    setShowNewTaskModal(false);
  };

  return (
    <main className="fixed bottom-24 h-[86vh] w-full overflow-y-auto rounded-md bg-white pt-3 tracking-wide shadow-md md:mx-4 md:px-9 md:py-6 lg:right-4 lg:mx-0 lg:h-[80vh] lg:w-[734px]">
      <Head>
        <title>Task List</title>
      </Head>
      <ToastContainer
        position="top-right"
        autoClose={1750}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* task header */}
      <div className="sticky top-0 z-20 w-full bg-white px-5 md:px-0 md:pl-8">
        <div className="mb-0 flex justify-between">
          <div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="rounded border border-gray-300 p-2"
            >
              <option value="My Task">My Task</option>
              <option value="Personal Errands">Personal Errands</option>
              <option value="Urgent To-Do">Urgent To-Do</option>
            </select>
          </div>
          <div>
            <motion.button
              whileTap={{
                scale: 0.95,
              }}
              className="rounded-md bg-blue-500 p-2 px-4 text-white hover:bg-blue-600"
              onClick={handleNewTaskClick}
            >
              New Task
            </motion.button>
          </div>
        </div>
      </div>

      {/* task bubble body */}
      <motion.div
        initial={{
          opacity: 0.1,
          scale: 1,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        transition={{
          duration: 0.2,
        }}
        className="h-[70vh]"
      >
        {loading ? (
          <LoadingIndicator loadingText={"loading"} />
        ) : tasks.length === 0 ? (
          <div className="pt-56 text-center text-gray-500">
            <p>Currently No Task Available</p>
            <p
              className="mt-3 cursor-pointer text-main"
              onClick={handleNewTaskClick}
            >
              Click here to create task
            </p>
          </div>
        ) : (
          tasks.map((task, index) => (
            <div key={index}>
              <TaskBubble
                title={task.title}
                taskcreated={task.taskcreated}
                description={task.description}
                onDelete={() => deleteTask(task.id)}
                setTasks={() => {}}
                taskId={task.id}
                isComplete={false}
                stickerOptions={[
                  "Important ASAP",
                  "Client Related",
                  "Self Task",
                  "Offline Meeting",
                  "Virtual Meeting",
                  "ASAP",
                  "Appointments",
                  "Court Related",
                ]}
              />
              <hr className="border-1" />
            </div>
          ))
        )}
      </motion.div>

      {/* Use TaskModal component */}
      <TaskModal show={showNewTaskModal} onClose={handleModalClose} />
    </main>
  );
};

export default TaskContainer;
