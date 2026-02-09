export const fadeIn = (direction: 'up' | 'down' | 'left' | 'right', delay: number) => {
    return {
        hidden: {
            y: direction === 'up' ? 40 : direction === 'down' ? -40 : 0,
            x: direction === 'left' ? 40 : direction === 'right' ? -40 : 0,
            opacity: 0,
        },
        show: {
            y: 0,
            x: 0,
            opacity: 1,
            transition: {
                type: 'tween' as const,
                duration: 0.8,
                delay: delay,
                ease: [0.25, 0.25, 0.25, 0.75] as const,
            },
        },
    };
};

export const staggerContainer = (staggerChildren: number, delayChildren: number) => {
    return {
        hidden: {},
        show: {
            transition: {
                staggerChildren: staggerChildren,
                delayChildren: delayChildren || 0,
            },
        },
    };
};

export const zoomIn = (delay: number, duration: number) => {
    return {
        hidden: {
            scale: 0,
            opacity: 0,
        },
        show: {
            scale: 1,
            opacity: 1,
            transition: {
                type: 'tween' as const,
                delay: delay,
                duration: duration,
                ease: 'easeOut' as const,
            },
        },
    };
};

export const slideIn = (direction: 'up' | 'down' | 'left' | 'right', type: 'tween' | 'spring', delay: number, duration: number) => {
    return {
        hidden: {
            x: direction === 'left' ? '-100%' : direction === 'right' ? '100%' : 0,
            y: direction === 'up' ? '100%' : direction === 'down' ? '100%' : 0,
        },
        show: {
            x: 0,
            y: 0,
            transition: {
                type: type,
                delay: delay,
                duration: duration,
                ease: 'easeOut' as const,
            },
        },
    };
};

export const navVariants = {
    hidden: {
        opacity: 0,
        y: -50,
        transition: {
            type: 'spring' as const,
            stiffness: 300,
            damping: 140,
        },
    },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            type: 'spring' as const,
            stiffness: 80,
            delay: 0.5,
        },
    },
};
