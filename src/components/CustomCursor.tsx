import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor: React.FC = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const trailX = useMotionValue(-100);
  const trailY = useMotionValue(-100);

  const springX = useSpring(trailX, { stiffness: 120, damping: 18, mass: 0.6 });
  const springY = useSpring(trailY, { stiffness: 120, damping: 18, mass: 0.6 });

  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const rafRef = useRef<number>(0);
  const posRef = useRef({ x: -100, y: -100 });

  useEffect(() => {
    // Hide native cursor globally
    document.documentElement.style.cursor = 'none';

    const onMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const tick = () => {
      trailX.set(posRef.current.x);
      trailY.set(posRef.current.y);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    const onDown = () => setClicked(true);
    const onUp = () => setClicked(false);

    const onEnter = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest('a, button, [role="button"], input, textarea, select, label')) {
        setHovered(true);
      }
    };
    const onLeave = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest('a, button, [role="button"], input, textarea, select, label')) {
        setHovered(false);
      }
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    window.addEventListener('mouseover', onEnter);
    window.addEventListener('mouseout', onLeave);

    return () => {
      document.documentElement.style.cursor = '';
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('mouseover', onEnter);
      window.removeEventListener('mouseout', onLeave);
    };
  }, [cursorX, cursorY, trailX, trailY]);

  // Don't render on touch devices
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  const dotSize = clicked ? 6 : 8;
  const ringSize = hovered ? 52 : clicked ? 28 : 36;

  return (
    <>
      {/* Outer ring — spring lagged */}
      <motion.div
        style={{
          x: springX,
          y: springY,
          position: 'fixed',
          top: 0,
          left: 0,
          width: ringSize,
          height: ringSize,
          borderRadius: '50%',
          border: `1.5px solid ${hovered ? 'rgba(182,0,168,0.9)' : 'rgba(215,226,234,0.55)'}`,
          background: hovered ? 'rgba(182,0,168,0.08)' : 'transparent',
          transform: `translate(-50%, -50%)`,
          pointerEvents: 'none',
          zIndex: 99999,
          mixBlendMode: 'normal',
          boxShadow: hovered ? '0 0 16px rgba(182,0,168,0.4)' : 'none',
        }}
        animate={{
          width: ringSize,
          height: ringSize,
          borderColor: hovered ? 'rgba(182,0,168,0.9)' : 'rgba(215,226,234,0.55)',
        }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
      />

      {/* Inner dot — instant */}
      <motion.div
        style={{
          x: cursorX,
          y: cursorY,
          position: 'fixed',
          top: 0,
          left: 0,
          width: dotSize,
          height: dotSize,
          borderRadius: '50%',
          background: hovered
            ? 'linear-gradient(135deg, #B600A8, #7621B0)'
            : 'rgba(215,226,234,0.95)',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          zIndex: 100000,
          boxShadow: hovered
            ? '0 0 12px rgba(182,0,168,0.8)'
            : '0 0 6px rgba(215,226,234,0.4)',
        }}
        animate={{ width: dotSize, height: dotSize }}
        transition={{ duration: 0.15, ease: 'easeOut' }}
      />
    </>
  );
};

export default CustomCursor;
