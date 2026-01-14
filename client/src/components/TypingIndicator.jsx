import { motion } from "framer-motion";

function TypingIndicator() {
  return (
    <div className="inline-flex items-center gap-2 rounded-2xl bg-slate-900/80 border border-slate-700/70 px-3 py-1.5 text-xs text-slate-300">
      <span className="h-6 w-6 rounded-full bg-gradient-to-tr from-sky-500 to-purple-500 flex items-center justify-center">
        <span className="h-2 w-2 rounded-full bg-white/90" />
      </span>
      <div className="flex items-center gap-1">
        {[0, 1, 2].map((index) => (
          <motion.span
            key={index}
            className="h-1.5 w-1.5 rounded-full bg-slate-300"
            animate={{ opacity: [0.4, 1, 0.4], y: [0, -2, 0] }}
            transition={{
              duration: 0.9,
              delay: index * 0.2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default TypingIndicator;