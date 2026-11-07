export type SourceRun =
  | { type: "text"; value: string }
  | { type: "title"; value: string }
  | { type: "url"; value: string; href: string };

export const sources: SourceRun[][] = [
  [
    {
      type: "text",
      value:
        "Andoh, Efua. “AI Chatbots and Digital Companions Are Reshaping Emotional Connection.” ",
    },
    { type: "title", value: "Monitor on Psychology" },
    { type: "text", value: ", vol. 57, no. 1, 1 Jan. 2026, " },
    {
      type: "url",
      value:
        "www.apa.org/monitor/2026/01-02/trends-digital-ai-relationships-emotional-connection",
      href: "https://www.apa.org/monitor/2026/01-02/trends-digital-ai-relationships-emotional-connection",
    },
    { type: "text", value: "." },
  ],
  [
    {
      type: "text",
      value: "Boles, Sy. “How AI Chatbots Try to Keep You from Walking Away.” ",
    },
    { type: "title", value: "Working Knowledge" },
    { type: "text", value: ", Harvard Business School, 6 Oct. 2025, " },
    {
      type: "url",
      value: "www.library.hbs.edu/working-knowledge/how-ai-chatbots-try-to-keep-you-from-walking-away",
      href: "https://www.library.hbs.edu/working-knowledge/how-ai-chatbots-try-to-keep-you-from-walking-away",
    },
    { type: "text", value: "." },
  ],
  [
    { type: "text", value: "ChatGPT. OpenAI, " },
    { type: "url", value: "chatgpt.com", href: "https://chatgpt.com" },
    { type: "text", value: "." },
  ],
  [
    { type: "text", value: "Claude. Anthropic, " },
    { type: "url", value: "claude.ai", href: "https://claude.ai" },
    { type: "text", value: "." },
  ],
  [
    { type: "text", value: "Cursor. Anysphere, " },
    { type: "url", value: "cursor.com", href: "https://cursor.com" },
    { type: "text", value: "." },
  ],
  [
    { type: "text", value: "Muldoon, James. " },
    {
      type: "title",
      value: "Love Machines: How Artificial Intelligence Is Transforming Our Relationships",
    },
    { type: "text", value: ". Kindle ed., Faber & Faber, 2026." },
  ],
  [
    { type: "text", value: "Nomi. Glimpse AI, " },
    { type: "url", value: "nomi.ai", href: "https://nomi.ai" },
    { type: "text", value: "." },
  ],
  [
    { type: "text", value: "RhetAI Coalition. " },
    { type: "url", value: "rhetai.com", href: "https://rhetai.com" },
    { type: "text", value: "." },
  ],
  [{ type: "text", value: "Thompson, Roger. Personal interview. 5 Nov. 2026." }],
  [
    {
      type: "text",
      value:
        "“When Saying Goodbye Isn’t Enough: The Manipulative Tactics of AI Chatbots and the Risks for Companies.” ",
    },
    { type: "title", value: "msg global solutions" },
    { type: "text", value: ", 2 Sept. 2025, " },
    {
      type: "url",
      value: "www.msg-global.com/en/blog/manipulative-tactics-of-ai-chatbots/",
      href: "https://www.msg-global.com/en/blog/manipulative-tactics-of-ai-chatbots/",
    },
    { type: "text", value: "." },
  ],
];
