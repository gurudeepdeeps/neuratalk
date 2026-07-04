import ReactMarkdown from "react-markdown";

function MessageBubble({ message, onRecommendationClick }) {
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

        {!isUser && message.recommendations && message.recommendations.length > 0 && (
          <div className="mt-3.5 pt-3 border-t border-purple-500/20 flex flex-col gap-1.5">
            <p className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold mb-0.5">
              Suggestions & Next Steps
            </p>
            <div className="flex flex-wrap gap-2">
              {message.recommendations.map((rec, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => onRecommendationClick && onRecommendationClick(rec)}
                  className="text-left text-xs px-3 py-1.5 rounded-xl bg-purple-950/40 hover:bg-purple-900/60 text-purple-200 border border-purple-500/25 hover:border-purple-400/50 hover:text-white transition-all duration-200"
                >
                  {rec} →
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MessageBubble;