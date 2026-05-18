'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const IMAGES = [
    {
        id: 1,
        src: '/images/carousel-1.png',
        alt: 'Petrobras Offshore Platform 1',
        type: 'image'
    },
    {
        id: 2,
        src: '/images/carousel-2.png',
        alt: 'Petrobras Workers',
        type: 'image'
    },
    {
        id: 3,
        src: '/images/carousel-3.png',
        alt: 'Petrobras Operations',
        type: 'image'
    },
    {
        id: 4,
        src: '/images/carousel-4.png',
        alt: 'Refinaria Abreu e Lima - Panorâmica',
        type: 'image'
    },
    {
        id: 5,
        src: '/images/carousel-5.png',
        alt: 'Refinaria Abreu e Lima - Detalhe',
        type: 'image'
    },
    // Adding a gradient as fallback/variety if needed, or just sticking to images
    {
        id: 6,
        type: 'gradient',
        colorFrom: '#002A18', // Dark Green
        colorTo: '#000000',   // Black
        alt: 'Fundo Escuro Petrobras'
    }
];

export default function HeroCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % IMAGES.length);
        }, 6000); // Slower transition for background
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="absolute inset-0 w-full h-full overflow-hidden -z-10 bg-black">
            <AnimatePresence initial={false}>
                <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    className="absolute inset-0 w-full h-full"
                >
                    {IMAGES[currentIndex].type === 'image' ? (
                        <>
                            <motion.img
                                src={IMAGES[currentIndex].src}
                                alt={IMAGES[currentIndex].alt}
                                className="w-full h-full object-cover object-center opacity-60"
                            />
                            {/* Extra Overlay for better text readability */}
                            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
                        </>
                    ) : (
                        <div
                            className="w-full h-full opacity-80"
                            style={{
                                background: `linear-gradient(135deg, ${IMAGES[currentIndex].colorFrom}, ${IMAGES[currentIndex].colorTo})`
                            }}
                        />
                    )}
                </motion.div>
            </AnimatePresence>

            {/* Subtle Progress Bar */}
            <div className="absolute bottom-0 left-0 h-1 bg-white/10 w-full z-10">
                <motion.div
                    key={currentIndex}
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 6, ease: "linear" }}
                    className="h-full bg-primary/50"
                />
            </div>
        </div>
    );
}
