import { AIProvider, ChatMode } from "../types";

/**
 * Placeholder AI Provider - to be implemented in future phases
 * This will abstract API calls to CloudCrafters/Groq/ElevenLabs
 */
export class PlaceholderAIProvider implements AIProvider {
  name = "Placeholder";

  async sendMessage(message: string, mode: ChatMode): Promise<string> {
    // TODO: Implement actual API integration in Phase 2
    console.log(`Sending message via ${mode} mode:`, message);
    return "Response not yet implemented";
  }
}
