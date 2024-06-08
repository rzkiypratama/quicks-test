"use client";
import React, { useEffect, useState, useRef } from "react";
import chatData, { ChatData } from "@/utils/chatDataGroup";
import NewMessageLine from "../NewMessageLine";
import InboxView from "./InboxContainer";
import { FaArrowLeft, FaXmark } from "react-icons/fa6";
import { motion } from "framer-motion";
import Link from "next/link";

const InboxViewGroup: React.FC = () => {
  const [chatDataGroupState, setChatDataGroup] = useState<ChatData[]>(chatData);
  const [newMessage, setNewMessage] = useState("");
  const [showInboxDetail, setShowInboxDetail] = useState(false);
  const [selectedChatIndex, setSelectedChatIndex] = useState<number | null>(
    null,
  );
  const [showNewMessageBadge, setShowNewMessageBadge] = useState(true);
  const [isReplying, setIsReplying] = useState(false);
  const [replyMessage, setReplyMessage] = useState<string | null>(null);
  const [replyDraft, setReplyDraft] = useState<string>("");
  const [replyMessages, setReplyMessages] = useState<{ [key: number]: string }>(
    {},
  );

  const handleOptionClick = (index: number) => {
    setSelectedChatIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const handleEditClick = () => {
    setSelectedChatIndex(null);
    console.log("Edit clicked");
  };

  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const handleScroll = () => {
      if (chatContainerRef.current) {
        const { scrollTop, scrollHeight, clientHeight } =
          chatContainerRef.current;
        setShowNewMessageBadge(
          scrollTop > 0 && scrollTop + clientHeight < scrollHeight,
        );
      }
    };

    if (chatContainerRef.current) {
      chatContainerRef.current.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (chatContainerRef.current) {
        chatContainerRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  const handleBadgeClick = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth", // biar smooth like fresh air
      });
    }
  };

  // new message line
  const isNewMessage = true;

  const handleDeleteClick = (
    index: number,
    event: React.MouseEvent<HTMLParagraphElement>,
  ) => {
    event.preventDefault();
    const updatedChatData = [...chatDataGroupState];
    updatedChatData.splice(index, 1);
    setChatDataGroup(updatedChatData);
    localStorage.setItem("chatDataGroupState", JSON.stringify(updatedChatData));
    setSelectedChatIndex(null);
  };

  const handleReplyClick = (
    index: number,
    event: React.MouseEvent<HTMLParagraphElement>,
  ) => {
    event.preventDefault();
    setReplyMessage(chatDataGroupState[index].message);
    setIsReplying(true);
  };

  const cancelReply = () => {
    setReplyMessage(null);
    setReplyDraft("");
    setIsReplying(false);
  };

  // testing to add new chat as sender
  const sendMessage = () => {
    if (!newMessage.trim()) {
      return;
    }
    const currentDatetime = new Date();
    const hours = currentDatetime.getHours();
    const minutes = currentDatetime.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";

    // Convert hours to 12-hour format
    const hours12 = hours % 12 || 12;

    const currentTime = `${hours12}:${minutes} ${ampm}`;

    // Update the sender name to something other than "You" to clearly identify the receiver in the front, guys
    const newChat = {
      id: chatDataGroupState.length + 1,
      sender: "You",
      message: newMessage,
      time: currentTime,
      isNew: true,
    };
    setChatDataGroup([...chatDataGroupState, newChat]);
    localStorage.setItem(
      "chatDataGroupState",
      JSON.stringify([...chatDataGroupState, newChat]),
    );
    setNewMessage("");
  };

  useEffect(() => {
    const storedReplyMessages = JSON.parse(
      localStorage.getItem("replyMessages") || "{}",
    );
    setReplyMessages(storedReplyMessages);
  }, []);

  // for a reply purpose
  const sendReply = () => {
    if (!replyDraft.trim() || selectedChatIndex === null) {
      console.log("Reply not sent: Empty or invalid data");
      return;
    }

    const currentTime = new Date().toLocaleTimeString();
    const newReplyChat = {
      id: chatDataGroupState.length + 2,
      sender: "You",
      message: replyDraft,
      time: currentTime,
    };

    const repliedMessage = chatDataGroupState[selectedChatIndex]?.message;
    setChatDataGroup([...chatDataGroupState, newReplyChat]);
    localStorage.setItem(
      "chatDataGroupState",
      JSON.stringify([...chatDataGroupState, newReplyChat]),
    );

    const updatedReplyMessages = {
      ...replyMessages,
      [newReplyChat.id]: repliedMessage,
    };
    setReplyMessages(updatedReplyMessages);
    localStorage.setItem("replyMessages", JSON.stringify(updatedReplyMessages));
    setReplyDraft("");
    setIsReplying(false);

    console.log("Reply sent successfully");
  };

  useEffect(() => {
    const storedChatData = localStorage.getItem("chatDataGroupState");
    if (storedChatData) {
      setChatDataGroup(JSON.parse(storedChatData));
    } else {
      setChatDataGroup(chatData);
    }
    // Retrieve reply messages from localStorage
    const storedReplyMessages = localStorage.getItem("replyMessages");
    if (storedReplyMessages) {
      setReplyMessages(JSON.parse(storedReplyMessages));
    }
  }, []);

  return (
    <main className="fixed right-0 bottom-24 md:right-4 overflow-y-auto z-40 h-[86vh] md:h-[80vh] md:w-[734px] rounded-md bg-white tracking-wide shadow-md">
      <motion.div 
       initial={{
        opacity: 0,
        scale: 1,
      }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      transition={{
        duration: 0.2,
      }}
      className="flex h-[80vh] flex-col">
        {showInboxDetail ? (
          <InboxView />
        ) : (
          <div className="flex items-center justify-between border-b bg-white p-4">
            <div
              className="flex items-center gap-3"
              onClick={() => setShowInboxDetail(true)}
            >
              <FaArrowLeft className="cursor-pointer text-black" />
              <div>
                <h1 className="font-semibold text-main">
                  I-589 - AMARKHIL, Obaidullah [Affirmative Filing with ZHN]
                </h1>
              </div>
            </div>
            <Link href="/">
            <FaXmark
              className="cursor-pointer text-black"
            />
            </Link>
          </div>
        )}

        {/* chat container */}
        <div
          ref={chatContainerRef}
          className="flex-1 space-y-4 overflow-y-auto p-5"
        >
          {chatDataGroupState.map((chat, index) => (
            <div key={index}>
              {chat.isNew && <NewMessageLine isNewMessage={isNewMessage} />}
              <div
                className={
                  chat.sender === "You"
                    ? "items-end text-right font-semibold"
                    : "items-end text-left font-semibold"
                }
              >
                <p className="text-gray-600">{chat.sender}</p>
              </div>

              {/* replied chat bubble without sender */}

              {/* Bubble for the replied message */}
              <div className="flex justify-end">
                {chat.sender === "You" && replyMessages[chat.id] && (
                  <div className="mb-2 rounded-lg bg-[#e0e0e0] p-4">
                    <p>{replyMessages[chat.id]}</p>
                  </div>
                )}
              </div>

              {/* chat bubble dan chat option */}
              <div
                className={
                  chat.sender === "You"
                    ? "flex justify-end gap-3"
                    : "mr-20 flex flex-row-reverse justify-end gap-3"
                }
              >
                {chat.sender === "You" ? (
                  <div>
                    {/* container untuk chat option, edit, dan delete */}
                    <div className="relative">
                      {/* chat option */}
                      <div
                        className="flex cursor-pointer flex-col items-end"
                        onClick={() => handleOptionClick(index)}
                        style={{
                          userSelect: "none",
                        }}
                      >
                        ...
                      </div>

                      {/* container untuk edit dan delete */}
                      {selectedChatIndex === index && (
                        <div className="absolute flex flex-col items-start rounded-md border border-[#bdbdbd] bg-white p-4 pr-10">
                          <p className="text-main" onClick={handleEditClick}>
                            Edit
                          </p>
                          <div className="mt-2 border-t border-gray-700"></div>
                          <p
                            className="mt-2 cursor-pointer text-red-500"
                            onClick={(event) => handleDeleteClick(index, event)}
                          >
                            Delete
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div>
                    {/* container untuk chat option, edit, dan delete */}
                    <div className="relative">
                      {/* chat option */}
                      <div
                        className="flex cursor-pointer flex-col items-end"
                        onClick={() => handleOptionClick(index)}
                        style={{
                          userSelect: "none",
                        }}
                      >
                        ...
                      </div>

                      {/* container untuk edit dan delete */}
                      {selectedChatIndex === index && (
                        <div className="absolute flex flex-col items-start rounded-md border border-[#bdbdbd] bg-white p-4 pr-10">
                          <p className="text-main" onClick={handleEditClick}>
                            Share
                          </p>
                          <div className="mt-2 border-t border-gray-700"></div>
                          <p
                            className="mt-2 cursor-pointer text-main"
                            onClick={(event) => handleReplyClick(index, event)}
                          >
                            Reply
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* chat bubble */}
                <div
                  className={
                    chat.sender === "You"
                      ? "rounded-lg bg-purple-200 p-4"
                      : chat.sender === "Putra"
                        ? "rounded-lg bg-[#FCEED3] p-4"
                        : chat.sender === "Pratama"
                          ? "rounded-lg bg-[#D2F2EA] p-4"
                          : "rounded-lg bg-[#F2F2F2] p-4"
                  }
                >
                  <p>{chat.message}</p>

                  {/* time inside chat bubble */}
                  <p className="mt-2 text-xs text-gray-600">{chat.time}</p>
                </div>
              </div>
            </div>
          ))}
          {/* new message badge */}
          {showNewMessageBadge && (
            <div
              className="fixed z-50 m-auto mx-24 md:mx-72 w-36 cursor-pointer top-2/3 md:top-3/4 rounded-md bg-[#E9F3FF] text-center -translate-y-2/4"
              onClick={handleBadgeClick}
            >
              <h1 className="select-none p-2 text-main">New Message</h1>
            </div>
          )}
        </div>
        {/* chat container over */}

        {/* reply chat bubble */}
        <div className="relative top-1 flex justify-around px-4">
          {isReplying && (
            <div className="mr-2 w-full rounded-t-md border border-gray-300 bg-gray-100 p-2">
              <div className="flex justify-between p-2">
                <span className="mr-2 font-semibold text-gray-500">
                  {isReplying && selectedChatIndex !== null
                    ? `Replying to: ${
                        replyMessage &&
                        chatDataGroupState[selectedChatIndex]?.sender
                      }`
                    : "Replying to: "}
                </span>
                <div
                  className="cursor-pointer text-red-500"
                  onClick={cancelReply}
                >
                  <FaXmark />
                </div>
              </div>
              <div className="flex items-center rounded-md p-2">
                <span className="mr-2">{replyMessage}</span>
              </div>
            </div>
          )}

          <div className="px-10"></div>
        </div>

        <div className="flex justify-around gap-[1.34rem] bg-white px-4 pb-4">
          <input
            className="w-full flex-1 rounded-md border border-gray-300 p-2 focus:outline-none"
            placeholder={isReplying ? "Type your reply" : "Type a new message"}
            type="text"
            value={isReplying ? replyDraft : newMessage}
            onChange={(e) =>
              isReplying
                ? setReplyDraft(e.target.value)
                : setNewMessage(e.target.value)
            }
          />

          <button
            className="rounded-md bg-blue-500 px-4 py-2 text-white"
            onClick={isReplying ? sendReply : sendMessage}
          >
            {isReplying ? "Send" : "Send"}
          </button>
        </div>
      </motion.div>
    </main>
  );
};

export default InboxViewGroup;
