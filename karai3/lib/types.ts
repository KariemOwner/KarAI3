export type ChatMode = "Basic" | "Expert" | "Coder" | "Vision";

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export interface AIProvider {
  name: string;
  sendMessage(message: string, mode: ChatMode): Promise<string>;
}

export interface GeneratedImage {
  url: string;
  prompt: string;
  timestamp: Date;
}
