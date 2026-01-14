import { motion } from "framer-motion";
import ChatBox from "../components/ChatBox.jsx";

function Home() {
  return (
    <div className="min-h-screen bg-slate-950 bg-neura-gradient text-slate-50 flex flex-col">
      <header className="w-full px-4 sm:px-8 pt-6 sm:pt-10 pb-4">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center sm:items-end justify-between gap-4">
          <div className="flex items-center gap-3">
            <motion.img
              src="/neuratalk-logo.png"
              alt="NeuraTalk logo"
              initial={{ opacity: 0, scale: 0.8, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.55 }}
              className="h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 rounded-2xl shadow-glow object-contain bg-slate-900/40"
            />
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="neuratalk-heading text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight bg-gradient-to-r from-sky-400 via-cyan-300 to-purple-400 bg-clip-text text-transparent drop-shadow"
            >
              NeuraTalk
            </motion.h1>
          </div>
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-1 text-sm sm:text-base text-slate-300 max-w-md"
          >
            Your intelligent AI assistant for ideas, code, and conversations.
          </motion.p>
        </div>
      </header>
      <main className="flex-1 w-full px-3 sm:px-6 pb-4 sm:pb-8 flex">
        <div className="max-w-5xl mx-auto flex-1 flex">
          <ChatBox />
        </div>
      </main>
    </div>
  );
}

export default Home;
