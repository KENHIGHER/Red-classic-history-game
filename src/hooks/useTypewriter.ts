import { useEffect, useMemo, useState } from "react";

export default function useTypewriter(lines: string[], { speed = 16 }: { speed?: number } = {}) {
  const fullText = useMemo(() => lines.join("\n"), [lines]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(0);
  }, [fullText]);

  useEffect(() => {
    if (count >= fullText.length) return;
    const t = window.setTimeout(() => setCount((c) => c + 1), speed);
    return () => window.clearTimeout(t);
  }, [count, fullText.length, speed]);

  return {
    text: fullText.slice(0, count),
    done: count >= fullText.length,
    skip: () => setCount(fullText.length),
  };
}

