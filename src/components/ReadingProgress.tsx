'use client';

import { useState, useEffect } from 'react';

interface ReadingProgressProps {
    onComplete?: () => void;
    threshold?: number; // Percentage to consider "complete" (default 80)
}

export default function ReadingProgress({ onComplete, threshold = 80 }: ReadingProgressProps) {
    const [progress, setProgress] = useState(0);
    const [hasCompleted, setHasCompleted] = useState(false);

    useEffect(() => {
        const calculateProgress = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;

            if (docHeight <= 0) {
                setProgress(100);
                return;
            }

            const scrollProgress = Math.min((scrollTop / docHeight) * 100, 100);
            setProgress(scrollProgress);

            // Trigger completion callback when threshold is reached
            if (scrollProgress >= threshold && !hasCompleted) {
                setHasCompleted(true);
                onComplete?.();
            }
        };

        // Initial calculation
        calculateProgress();

        // Add scroll listener
        window.addEventListener('scroll', calculateProgress, { passive: true });
        window.addEventListener('resize', calculateProgress, { passive: true });

        return () => {
            window.removeEventListener('scroll', calculateProgress);
            window.removeEventListener('resize', calculateProgress);
        };
    }, [threshold, hasCompleted, onComplete]);

    return (
        <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-slate-800/50 backdrop-blur-sm">
            <div
                className="h-full bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 transition-all duration-150 ease-out"
                style={{ width: `${progress}%` }}
            />
            {/* Progress percentage indicator */}
            <div className="absolute right-4 top-2 text-xs font-mono text-gray-400">
                {Math.round(progress)}%
            </div>
        </div>
    );
}
