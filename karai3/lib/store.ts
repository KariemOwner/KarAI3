import { create } from "zustand";
import { ChatMode, Message, GeneratedImage } from "./types";

interface ChatStore {
  // State
  activeMode: ChatMode;
  messages: Message[];
  generatedImages: GeneratedImage[];
  
  // Actions
  setActiveMode: (mode: ChatMode) => void;
  addMessage: (message: Omit<Message, "id" | "timestamp">) => void;
  clearMessages: () => void;
  addGeneratedImage: (image: Omit<GeneratedImage, "timestamp">) => void;
}

export const useChatStore = create<ChatStore>((set) => ({
  // Initial state
  activeMode: "Basic",
  messages: [],
  generatedImages: [],
  
  // Actions
  setActiveMode: (mode: ChatMode) => set({ activeMode: mode }),
  
  addMessage: (message: Omit<Message, "id" | "timestamp">) =>
    set((state) => ({
      messages: [
        ...state.messages,
        {
          ...message,
          id: crypto.randomUUID(),
          timestamp: new Date(),
        },
      ],
    })),
  
  clearMessages: () => set({ messages: [] }),
  
  addGeneratedImage: (image: Omit<GeneratedImage, "timestamp">) =>
    set((state) => ({
      generatedImages: [
        ...state.generatedImages,
        {
          ...image,
          timestamp: new Date(),
        },
      ],
    })),
}));
