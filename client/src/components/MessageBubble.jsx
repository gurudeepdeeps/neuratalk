import ReactMarkdown from "react-markdown";

function MessageBubble({ message }) {
  const isUser = message.sender === "user";

  return (
    <div
      className={`flex w-full ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`max-w-[82%] sm:max-w-[70%] rounded-2xl px-3.5 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-[0.95rem] leading-relaxed ${
          isUser
            ? "bg-sky-600/90 text-slate-50 shadow-lg shadow-sky-500/40 rounded-br-sm"
            : "bg-slate-900/80 text-slate-100 border border-purple-500/40 shadow-lg shadow-purple-500/30 rounded-bl-sm"
        }`}
      >
        <ReactMarkdown className="prose prose-invert prose-sm max-w-none">
          {message.text}
        </ReactMarkdown>
      </div>
    </div>
  );
}

export default MessageBubble;