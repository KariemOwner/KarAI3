"use client";

import { useState } from "react";
import { useChatStore } from "@/lib/store";

export default function ChatInput() {
  const [input, setInput] = useState("");
  const { addMessage, activeMode } = useChatStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    addMessage({
      role: "user",
      content: input.trim(),
    });

    // TODO: In Phase 2, call AI API here
    // For now, just clear the input
    setInput("");
  };

  const handleFileUpload = () => {
    // TODO: Implement file upload in Phase 2
    console.log("File upload clicked - to be implemented");
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-3">
      <button
        type="button"
        onClick={handleFileUpload}
        className="p-3 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
        title="Upload file or image"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13"
          />
        </svg>
      </button>

      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={`Message KarAI3 (${activeMode} mode)...`}
        className="flex-1 bg-gray-800 text-white placeholder-gray-400 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
      />

      <button
        type="submit"
        disabled={!input.trim()}
        className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
          />
        </svg>
      </button>
    </form>
  );
}
