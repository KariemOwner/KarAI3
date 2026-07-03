"use client";

import { useChatStore } from "@/lib/store";
import { ChatMode } from "@/lib/types";

const modes: ChatMode[] = ["Basic", "Expert", "Coder", "Vision"];

export default function ModeSelector() {
  const { activeMode, setActiveMode } = useChatStore();

  return (
    <div className="flex items-center gap-2 border-b border-gray-700 pb-3">
      <span className="text-sm text-gray-400 mr-2">Mode:</span>
      <div className="flex gap-1">
        {modes.map((mode) => {
          const isVision = mode === "Vision";
          const isActive = activeMode === mode;
          
          return (
            <button
              key={mode}
              onClick={() => !isVision && setActiveMode(mode)}
              disabled={isVision}
              className={`
                px-4 py-2 rounded-lg text-sm font-medium transition-all
                ${isActive 
                  ? "bg-blue-600 text-white" 
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }
                ${isVision ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
              `}
              title={isVision ? "Vision mode will be activated automatically when uploading images" : ""}
            >
              {mode}
            </button>
          );
        })}
      </div>
    </div>
  );
}
