"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import ChatArea from "@/components/ChatArea";
import ImageGenerator from "@/components/ImageGenerator";

type ViewMode = "chat" | "image";

export default function Home() {
  const [viewMode, setViewMode] = useState<ViewMode>("chat");

  return (
    <div className="flex h-screen bg-gray-950">
      <Sidebar />
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Top Navigation */}
        <header className="px-6 py-4 bg-gray-900 border-b border-gray-700">
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode("chat")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                viewMode === "chat"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              Chat
            </button>
            <button
              onClick={() => setViewMode("image")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                viewMode === "image"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              Generate Image
            </button>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-hidden">
          {viewMode === "chat" ? <ChatArea /> : <ImageGenerator />}
        </div>
      </main>
    </div>
  );
}
