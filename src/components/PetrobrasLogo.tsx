import React from 'react';

export default function PetrobrasLogo({ className = "w-32 h-auto" }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 200 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            aria-label="Petrobras Logo"
        >
            {/* Simulação do Logo BR (estilizado para evitar copyright direto complexo, mas reconhecível) */}
            <path
                d="M20 10 L40 10 L50 30 L40 50 L20 50 L10 30 Z"
                fill="#008542"
                className="text-green-600"
            />
            <path
                d="M25 15 L35 15 L40 30 L35 45 L25 45 L20 30 Z"
                fill="#FFCC29"
                className="text-yellow-400"
            />
            <text x="60" y="40" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="32" fill="white">
                BR
            </text>
            <text x="110" y="40" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="24" fill="white">
                PETROBRAS
            </text>
        </svg>
    );
}
