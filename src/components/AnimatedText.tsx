import React, { useRef } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';

interface AnimatedTextProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}

// Single character with scroll-driven opacity
const Char: React.FC<{
  char: string;
  index: number;
  total: number;
  progress: ReturnType<typeof useScroll>['scrollYProgress'];
}> = ({ char, index, total, progress }) => {
  const start = index / total;
  const end = Math.min(start + 2 / total, 1);
  const opacity = useTransform(progress, [start, end], [0.15, 1]);

  return (
    <span style={{ position: 'relative', display: 'inline' }}>
      <span style={{ opacity: 0, userSelect: 'none' }}>{char}</span>
      <motion.span style={{ opacity, position: 'absolute', left: 0, top: 0 }}>
        {char}
      </motion.span>
    </span>
  );
};

const AnimatedText: React.FC<AnimatedTextProps> = ({ text, className, style }) => {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'end 0.2'],
  });

  return (
    <p ref={ref} className={className} style={{ position: 'relative', ...style }}>
      {text.split('').map((char, i) => (
        <Char key={i} char={char} index={i} total={text.length} progress={scrollYProgress} />
      ))}
    </p>
  );
};

export default AnimatedText;
