import type { Message } from "@/data/scenarios";

export type AiMessage = Extract<Message, { speaker: "ai" }>;
export type UserMessage = Extract<Message, { speaker: "user" }>;

export function isAiMessage(message: Message): message is AiMessage {
  return message.speaker === "ai";
}

/** Index of the first user message at or after `from`, or `messages.length` if none. */
export function nextUserIndex(messages: Message[], from: number): number {
  for (let i = from; i < messages.length; i++) {
    if (messages[i].speaker === "user") return i;
  }
  return messages.length;
}

/** Last AI message among the first `end` messages. */
export function lastAiBefore(messages: Message[], end: number): AiMessage | undefined {
  for (let i = Math.min(end, messages.length) - 1; i >= 0; i--) {
    const message = messages[i];
    if (isAiMessage(message)) return message;
  }
  return undefined;
}

export function firstAiMessage(messages: Message[]): AiMessage | undefined {
  return messages.find(isAiMessage);
}
