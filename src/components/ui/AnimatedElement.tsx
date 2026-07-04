"use client";

import React, { ReactNode } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface AnimatedElementProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  delay?: number;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  distance?: number;
}

export default function AnimatedElement({ 
  children, 
  delay = 0, 
  className = "", 
  direction = 'up',
  distance = 30,
  ...props 
}: AnimatedElementProps) {
  
  // Calculate initial position based on direction
  const getInitialPosition = () => {
    switch(direction) {
      case 'up': return { y: distance };
      case 'down': return { y: -distance };
      case 'left': return { x: distance };
      case 'right': return { x: -distance };
      case 'none': return { x: 0, y: 0 };
      default: return { y: distance };
    }
  };

  // Calculate exit position based on direction
  const getExitPosition = () => {
    switch(direction) {
      case 'up': return { y: -distance };
      case 'down': return { y: distance };
      case 'left': return { x: -distance };
      case 'right': return { x: distance };
      case 'none': return { x: 0, y: 0 };
      default: return { y: -distance };
    }
  };

  const initialPos = getInitialPosition();
  const exitPos = getExitPosition();

  return (
    <motion.div
      initial={{ opacity: 0, ...initialPos }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      exit={{ opacity: 0, ...exitPos }}
      viewport={{ once: false, amount: 0.1 }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
