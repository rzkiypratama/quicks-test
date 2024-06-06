"use client"
import React from "react";
import styles from "@/styles/styles.module.css";
import TaskView from "@/components/task/TaskContainer";
import SearchBar from "@/components/SearchBar";
import Link from "next/link";
import { motion } from "framer-motion";

const ButtonTask: React.FC = () => {

  return (
    <main>
      <div className="ml-auto h-screen border-l-2 lg:w-4/5 lg:border-white">
        <SearchBar />
        <TaskView />
        <div className="fixed bottom-4 right-4 z-10 flex flex-row-reverse gap-5">
          <div className="relative">
            <Link href="/">
              <div
                className={`inbox-shadow cursor-pointer ${styles["inbox-shadow"]}`}
              ></div>
            </Link>
            <motion.img
            whileTap={{
              scale: 0.8,
            }}
              src="/assets/buttonIcon/taskactive-icon.png"
              alt="inbox button"
              className="relative z-20 h-[68px] w-[68px] cursor-pointer object-cover opacity-100 transition-opacity"
            />
          </div>
          <Link href="/inbox">
            <motion.img
            initial={{
              x: 40,
              rotate: 90
            }}
            animate={{
              x: 0,
              rotate: 0
            }}
             whileTap={{
              scale: 0.8,
            }}
              src="/assets/buttonIcon/inboxinactive-icon.png"
              alt="inbox button"
              className="relative z-20 h-[68px] w-[68px] cursor-pointer object-cover opacity-100 transition-opacity"
            />
          </Link>
        </div>
      </div>
    </main>
  );
};

export default ButtonTask;
