import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import MessageBubble from "./MessageBubble.jsx";
import TypingIndicator from "./TypingIndicator.jsx";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

function ChatBox() {
  const [messages, setMessages] = useState([
    {
      id: "welcome",
      sender: "ai",
      text:
        "Hi, I am NeuraTalk. Ask me anything about code, ideas, or content."
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!input.trim() || isLoading) {
      return;
    }

    const userMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: input.trim()
    };

    setMessages((current) => [...current, userMessage]);
    setInput("");
    setError("");
    setIsLoading(true);

    try {
      const response = await axios.post(`${API_BASE_URL}/api/chat`, {
        message: userMessage.text
      });
      const replyText =
        response.data && typeof response.data.reply === "string"
          ? response.data.reply
          : "I could not understand the response from the server.";

      const aiMessage = {
        id: `ai-${Date.now()}`,
        sender: "ai",
        text: replyText
      };

      setMessages((current) => [...current, aiMessage]);
    } catch (err) {
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error);
      } else if (err.message) {
        setError(
          "Something went wrong: " + err.message
        );
      } else {
        setError(
          "Something went wrong while talking to NeuraTalk. Please try again."
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      handleSubmit(event);
    }
  };

  const handleClear = () => {
    setMessages([
      {
        id: "welcome",
        sender: "ai",
        text:
          "Chat cleared. I am ready for your next question."
      }
    ]);
    setError("");
  };

  return (
    <div className="flex flex-col w-full max-h-[calc(100vh-8rem)] sm:max-h-[calc(100vh-10rem)] mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col flex-1 rounded-3xl bg-slate-900/60 border border-cyan-500/20 shadow-2xl shadow-cyan-500/20 backdrop-blur-xl overflow-hidden"
      >
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-slate-700/60 bg-slate-900/70">
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-2xl bg-gradient-to-tr from-sky-500 to-purple-500 flex items-center justify-center shadow-glow">
              <span className="text-sm font-semibold text-white">NT</span>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-100">
                NeuraTalk Chat
              </p>
              <p className="text-xs text-slate-400">
                Futuristic AI conversations in your browser
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleClear}
            className="text-xs sm:text-sm px-3 py-1.5 rounded-full bg-slate-800/80 text-slate-200 border border-slate-600/70 hover:bg-slate-700/80 transition-colors"
          >
            Clear chat
          </button>
        </div>

        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto px-3 sm:px-5 py-4 space-y-3 sm:space-y-4"
        >
          <AnimatePresence initial={false}>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -5, scale: 0.98 }}
                transition={{ duration: 0.22 }}
              >
                <MessageBubble message={message} />
              </motion.div>
            ))}
          </AnimatePresence>
          {isLoading && (
            <div className="flex justify-start mt-1">
              <TypingIndicator />
            </div>
          )}
        </div>

        <div className="px-3 sm:px-5 pb-3 sm:pb-4 pt-2 border-t border-slate-700/70 bg-slate-900/85">
          {error && (
            <div className="mb-2 text-xs sm:text-sm text-rose-300 bg-rose-900/40 border border-rose-700/60 rounded-xl px-3 py-2">
              {error}
            </div>
          )}
          <form
            onSubmit={handleSubmit}
            className="flex items-end gap-2 sm:gap-3"
          >
            <div className="flex-1 relative">
              <textarea
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={handleKeyDown}
                rows={1}
                placeholder="Ask NeuraTalk anything..."
                className="w-full resize-none bg-slate-900/70 border border-slate-700/80 rounded-2xl py-2.5 sm:py-3 px-3 sm:px-4 text-sm sm:text-base text-slate-50 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/60 focus:border-cyan-400/70 scrollbar-thin scrollbar-thumb-slate-700/80 scrollbar-track-transparent"
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              type="submit"
              disabled={isLoading || !input.trim()}
              className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-tr from-sky-500 to-purple-500 text-white px-3 sm:px-4 py-2 sm:py-2.5 text-sm font-medium shadow-glow disabled:opacity-60 disabled:shadow-none disabled:cursor-not-allowed"
            >
              <span className="hidden sm:inline-block mr-1.5">
                {isLoading ? "Thinking" : "Send"}
              </span>
              <span className="sm:hidden">
                {isLoading ? "..." : "➤"}
              </span>
            </motion.button>
          </form>
          <p className="mt-1.5 text-[10px] sm:text-xs text-slate-500 text-right">
            Press Enter to send, Shift + Enter for new line.
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default ChatBox;
