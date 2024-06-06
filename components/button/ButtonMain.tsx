"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

interface Props {

}

const ButtonUnclicked: React.FC<Props> = ({
}) => {
  const [isTaskVisible, setTaskVisible] = useState(false);

  const handleMainButtonClick = () => {
    setTaskVisible(!isTaskVisible);
  };

  return (
    <div
      className={`fixed bottom-4 right-4 z-10 flex flex-row-reverse items-center justify-center gap-2 tracking-wider`}
    >
      <div className="flex flex-col items-center gap-2">
        <p className="opacity-0">main</p>
        <img
          src="/assets/buttonIcon/main-button.png"
          alt="main button"
          className={`h-[68px] w-[68px] transform cursor-pointer transition-transform ${isTaskVisible ? "rotate-45" : ""}`}
          onClick={handleMainButtonClick}
        />
      </div>
      {isTaskVisible && (
        <div className="flex items-center gap-2 text-white">
          <div className="flex flex-col items-center gap-2">
            <p>Tasks</p>
            <Link href="/task">
            <motion.img
              initial={{
                x: 10,
                opacity: 0,
                scale: 1,
                rotate: 30,
              }}
              animate={{
                x: 0,
                opacity: 1,
                scale: 1,
                rotate: 0,
              }}
              transition={{
                duration: 0.2,
              }}
              whileTap={{
                scale: 0.8,
              }}
              exit={{ scale: 1, rotate: 30 }}
              src="/assets/buttonIcon/taskinactive-icon.png"
              alt="task button"
              className="delay-400 h-[68px] w-[68px] cursor-pointer opacity-100 transition-opacity"
            />
            </Link>
          </div>

          <div className="flex flex-col items-center gap-2">
            <p>Inbox</p>
            <Link href="/inbox">
            <motion.img
              initial={{
                x: 10,
                opacity: 0,
                scale: 1,
                rotate: 30,
              }}
              animate={{
                x: 0,
                opacity: 1,
                scale: 1,
                rotate: 0,
              }}
              transition={{
                duration: 0.2,
              }}
              whileTap={{
                scale: 0.8,
              }}
              src="/assets/buttonIcon/inboxinactive-icon.png"
              alt="inbox button"
              className="h-[68px] w-[68px] cursor-pointer opacity-100 transition-opacity delay-200"
            />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default ButtonUnclicked;
