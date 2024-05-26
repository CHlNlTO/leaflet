import React, { useState, useEffect, useRef, FormEvent } from "react";
import { Card, CardHeader, CardContent, CardFooter } from "../ui/card";
import { Input } from "../ui/input";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { IconProps } from "@/lib/types";
import { LeafIcon } from "./Logo";
import { motion } from "framer-motion";
import { Image, Maximize2, Minimize2, UploadIcon } from "lucide-react";
import { askBot } from "@/lib/chatbot";
import { markdownToHtml } from "@/utils/markdownToHtml";

interface Message {
  text: string;
  isUser: boolean;
}

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "Hi, I am Snapfolia, how can I help you with your plants today?",
      isUser: false,
    },
  ]);

  const [newMessage, setNewMessage] = useState("");
  const [isMinimized, setIsMinimized] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (newMessage.trim()) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: newMessage, isUser: true },
      ]);

      setNewMessage("");

      const response = await askBot(newMessage);
      const htmlResponse = await markdownToHtml(response);

      setMessages((prevMessages) => [
        ...prevMessages,
        { text: htmlResponse, isUser: false },
      ]);
    }
  };

  // const handleFileChange = (event: ) => {
  //   if (event.target.files && event.target.files.length > 0) {
  //     const file = event.target.files[0];

  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       if (typeof reader.result === "string") {
  //         setBase64Image(reader.result);
  //         form.setValue("image", file);
  //       }
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // }

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  return (
    <motion.div
      className="fixed bottom-0 right-0 sm:bottom-4 sm:right-4 z-[400]"
      initial="hidden"
      animate={isMinimized ? "minimized" : "open"}
      variants={{
        hidden: { y: 510, opacity: 0 },
        minimized: { y: 510, opacity: 1 },
        open: { y: 0, opacity: 1 },
      }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <Card className="max-w-md w-full bg-gradient-to-br from-green-200 to-green-300/50 border border-gray-200">
        <CardHeader className="flex flex-row items-start justify-between gap-6 px-6 pt-6 pb-8 sm:p-6">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarFallback className="text-green-900 hover:text-green-700 active:text-green-500">
                <LeafIcon className="w-6 h-6 hover:fill-current" />
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col justify-center items-start">
              <p className="text-sm font-semibold leading-none text-green-950">
                Snapfolia
              </p>
              <p className="text-xs text-gray-800 dark:text-gray-400">
                Virtual plant expert
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center p-0 pr-2">
            {isMinimized ? (
              <Maximize2
                className="w-6 h-6 hover:fill-current text-green-900 hover:text-green-700 active:text-green-500 hover:w-[26px] hover:h-[26px] transition-all cursor-pointer"
                onClick={toggleMinimize}
              />
            ) : (
              <Minimize2
                className="w-6 h-6 hover:fill-current text-green-900 hover:text-green-700 active:text-green-500 hover:w-[26px] hover:h-[26px] transition-all cursor-pointer"
                onClick={toggleMinimize}
              />
            )}
          </div>
        </CardHeader>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isMinimized ? 0 : 1 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <CardContent className="overflow-y-auto pl-6 pt-6 pb-6 pr-0">
            <div className="space-y-3 h-96 max-h-96 overflow-y-auto">
              {messages.map((message, index) => (
                <div key={index} className="flex flex-col">
                  <div
                    className={`inline-block max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm ${
                      message.isUser
                        ? "ml-auto bg-green-900 text-white dark:bg-gray-50 dark:text-green-800 mr-2"
                        : "bg-gray-100 dark:bg-green-800"
                    }`}
                    dangerouslySetInnerHTML={{ __html: message.text }}
                  />
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </CardContent>
          <CardFooter>
            <form
              className="flex w-full items-center space-x-2"
              onSubmit={handleSubmit}
            >
              <div className="relative w-full">
                <label
                  htmlFor="fileInput"
                  className="absolute left-3 top-2.5 h-5 w-5 text-green-900 hover:text-green-700 active:text-green-500 cursor-pointer"
                >
                  <Image className="h-5 w-5" />
                </label>
                <input
                  id="fileInput"
                  type="file"
                  accept="image/*"
                  className="absolute hidden"
                  // onChange={(e) => handleFileChange(e.target.files)}
                />
                <Input
                  autoComplete="off"
                  className="pl-10 focus-visible:ring-green-900"
                  id="message"
                  placeholder="Type your message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                />
              </div>

              <Button
                size="icon"
                type="submit"
                className="bg-green-900 hover:bg-green-800 active:bg-green-700 focus-visible:ring-green-900 px-3"
              >
                <SendIcon className="h-4 w-4" />
                <span className="sr-only">Send</span>
              </Button>
            </form>
          </CardFooter>
        </motion.div>
      </Card>
    </motion.div>
  );
}

function SendIcon(props: IconProps) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m22 2-7 20-4-9-9-4Z" />
      <path d="M22 2 11 13" />
    </svg>
  );
}