"use client";

import { useChatStore } from "@/lib/store";
import ModeSelector from "./ModeSelector";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";

export default function ChatArea() {
  const { messages } = useChatStore();

  return (
    <main className="flex-1 flex flex-col h-screen overflow-hidden">
      {/* Header with Mode Selector */}
      <header className="px-6 py-4 bg-gray-900 border-b border-gray-700">
        <ModeSelector />
      </header>

      {/* Messages List */}
      <div className="flex-1 overflow-y-auto px-6 py-4">
        {messages.length === 0 ? (
          <div className="h-full flex items-center justify-center text-gray-500">
            <div className="text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-16 h-16 mx-auto mb-4 opacity-50"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 01.978-3.277c.47-.577.86-1.224 1.158-1.918A9.003 9.003 0 013 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
                />
              </svg>
              <p className="text-lg">Start a conversation</p>
              <p className="text-sm mt-2">Choose a mode and send a message</p>
            </div>
          </div>
        ) : (
          messages.map((msg) => (
            <ChatMessage key={msg.id} message={msg} />
          ))
        )}
      </div>

      {/* Input Area */}
      <div className="px-6 py-4 bg-gray-900 border-t border-gray-700">
        <ChatInput />
      </div>
    </main>
  );
}
