"use client";

import { motion } from "framer-motion";

export default function TypingIndicator({ aiName }: { aiName: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="flex justify-start"
    >
      <div
        role="status"
        aria-label={`${aiName} is typing`}
        className="flex items-center gap-1.5 rounded-[18px] rounded-bl-md bg-bubble-ai px-4 py-4"
      >
        {[0, 1, 2].map((dot) => (
          <motion.span
            key={dot}
            className="size-2 rounded-full bg-ink/50"
            animate={{ y: [0, -4, 0], opacity: [0.35, 1, 0.35] }}
            transition={{ duration: 0.9, repeat: Infinity, delay: dot * 0.15, ease: "easeInOut" }}
          />
        ))}
      </div>
    </motion.div>
  );
}
