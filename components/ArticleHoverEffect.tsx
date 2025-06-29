"use client";
import { useEffect } from 'react';

export default function ArticleHoverEffect() {
    useEffect(() => {
        const handleHover = (e: MouseEvent) => {
            const el = (e.target as HTMLElement).closest('[data-word]');
            const word = el?.getAttribute('data-word');
            if (!word) return;
            document.querySelectorAll(`[data-word="${word}"]`).forEach((el) => {
                el.classList.add('ring', 'ring-yellow-400');
            });
        };

        const handleLeave = (e: MouseEvent) => {
            const el = (e.target as HTMLElement).closest('[data-word]');
            const word = el?.getAttribute('data-word');
            if (!word) return;
            document.querySelectorAll(`[data-word="${word}"]`).forEach((el) => {
                el.classList.remove('ring', 'ring-yellow-400');
            });
        };

        const observer = new MutationObserver(() => {
            document.querySelectorAll('[data-word]').forEach((el) => {
                const element = el as HTMLElement;
                element.removeEventListener('mouseenter', handleHover);
                element.removeEventListener('mouseleave', handleLeave);
                element.addEventListener('mouseenter', handleHover);
                element.addEventListener('mouseleave', handleLeave);
            });
        });

        observer.observe(document.body, { childList: true, subtree: true });

        return () => observer.disconnect();
    }, []);
    return null;
} 