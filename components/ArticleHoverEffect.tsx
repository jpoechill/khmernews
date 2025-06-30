"use client";
import { useEffect, useState } from 'react';

interface ArticleHoverEffectProps {
    slug: string;
}

export default function ArticleHoverEffect({ slug }: ArticleHoverEffectProps) {
    const [viewCount, setViewCount] = useState<number>(0);

    useEffect(() => {
        // Increment view count when page loads (this will return the new count)
        const incrementViewCount = async () => {
            try {
                const response = await fetch(`/api/views/${slug}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    const newCount = data.viewCount || 0;
                    setViewCount(newCount);
                    // Update the display in the DOM with the new count
                    const viewCountElement = document.getElementById('article-view-count');
                    if (viewCountElement) {
                        viewCountElement.textContent = newCount.toLocaleString();
                    }
                }
            } catch (error) {
                console.error('Failed to increment view count:', error);
            }
        };

        // Small delay to ensure DOM is ready
        const timer = setTimeout(incrementViewCount, 100);

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

        // Khmer zoom functionality
        const linkedWords = document.querySelectorAll('.linked-word');

        linkedWords.forEach(word => {
            const handleMouseEnter = () => {
                const wordData = word.getAttribute('data-word');
                if (wordData) {
                    const allWords = document.querySelectorAll(`[data-word="${wordData}"]`);
                    allWords.forEach(w => w.classList.add('highlighted'));
                }
            };

            const handleMouseLeave = () => {
                const wordData = word.getAttribute('data-word');
                if (wordData) {
                    const allWords = document.querySelectorAll(`[data-word="${wordData}"]`);
                    allWords.forEach(w => w.classList.remove('highlighted'));
                }
            };

            word.addEventListener('mouseenter', handleMouseEnter);
            word.addEventListener('mouseleave', handleMouseLeave);
        });

        // Khmer zoom functionality
        const decreaseBtn = document.getElementById('decrease-text-size');
        const increaseBtn = document.getElementById('increase-text-size');
        const resetBtn = document.getElementById('reset-text-size');
        const sizeDisplay = document.getElementById('text-size-display');

        // English zoom functionality
        const decreaseEnglishBtn = document.getElementById('decrease-english-text-size');
        const increaseEnglishBtn = document.getElementById('increase-english-text-size');
        const resetEnglishBtn = document.getElementById('reset-english-text-size');
        const englishSizeDisplay = document.getElementById('english-text-size-display');

        // Transliteration zoom functionality
        const decreaseTranslitBtn = document.getElementById('decrease-translit-text-size');
        const increaseTranslitBtn = document.getElementById('increase-translit-text-size');
        const resetTranslitBtn = document.getElementById('reset-translit-text-size');
        const translitSizeDisplay = document.getElementById('translit-text-size-display');

        const updateSizeDisplay = () => {
            const khmerText = document.querySelector('.khmer-text') as HTMLElement;
            if (khmerText && sizeDisplay) {
                const currentSize = parseInt(getComputedStyle(khmerText).fontSize);
                sizeDisplay.textContent = currentSize + 'px';
            }
        };

        const updateEnglishSizeDisplay = () => {
            const englishText = document.querySelector('.english-text') as HTMLElement;
            if (englishText && englishSizeDisplay) {
                const currentSize = parseInt(getComputedStyle(englishText).fontSize);
                englishSizeDisplay.textContent = currentSize + 'px';
            }
        };

        const updateTranslitSizeDisplay = () => {
            const translitText = document.querySelector('.translit-text') as HTMLElement;
            if (translitText && translitSizeDisplay) {
                const currentSize = parseInt(getComputedStyle(translitText).fontSize);
                translitSizeDisplay.textContent = currentSize + 'px';
            }
        };

        const handleDecrease = () => {
            const khmerText = document.querySelector('.khmer-text') as HTMLElement;
            if (khmerText) {
                const currentSize = parseInt(getComputedStyle(khmerText).fontSize);
                if (currentSize > 12) {
                    khmerText.style.fontSize = (currentSize - 2) + 'px';
                    updateSizeDisplay();
                }
            }
        };

        const handleIncrease = () => {
            const khmerText = document.querySelector('.khmer-text') as HTMLElement;
            if (khmerText) {
                const currentSize = parseInt(getComputedStyle(khmerText).fontSize);
                if (currentSize < 48) {
                    khmerText.style.fontSize = (currentSize + 2) + 'px';
                    updateSizeDisplay();
                }
            }
        };

        const handleReset = () => {
            const khmerText = document.querySelector('.khmer-text') as HTMLElement;
            if (khmerText) {
                khmerText.style.fontSize = '20px';
                updateSizeDisplay();
            }
        };

        // English text size handlers
        const handleEnglishDecrease = () => {
            const englishText = document.querySelector('.english-text') as HTMLElement;
            if (englishText) {
                const currentSize = parseInt(getComputedStyle(englishText).fontSize);
                if (currentSize > 12) {
                    englishText.style.fontSize = (currentSize - 2) + 'px';
                    updateEnglishSizeDisplay();
                }
            }
        };

        const handleEnglishIncrease = () => {
            const englishText = document.querySelector('.english-text') as HTMLElement;
            if (englishText) {
                const currentSize = parseInt(getComputedStyle(englishText).fontSize);
                if (currentSize < 48) {
                    englishText.style.fontSize = (currentSize + 2) + 'px';
                    updateEnglishSizeDisplay();
                }
            }
        };

        const handleEnglishReset = () => {
            const englishText = document.querySelector('.english-text') as HTMLElement;
            if (englishText) {
                englishText.style.fontSize = '16px';
                updateEnglishSizeDisplay();
            }
        };

        // Transliteration text size handlers
        const handleTranslitDecrease = () => {
            const translitText = document.querySelector('.translit-text') as HTMLElement;
            if (translitText) {
                const currentSize = parseInt(getComputedStyle(translitText).fontSize);
                if (currentSize > 12) {
                    translitText.style.fontSize = (currentSize - 2) + 'px';
                    updateTranslitSizeDisplay();
                }
            }
        };

        const handleTranslitIncrease = () => {
            const translitText = document.querySelector('.translit-text') as HTMLElement;
            if (translitText) {
                const currentSize = parseInt(getComputedStyle(translitText).fontSize);
                if (currentSize < 48) {
                    translitText.style.fontSize = (currentSize + 2) + 'px';
                    updateTranslitSizeDisplay();
                }
            }
        };

        const handleTranslitReset = () => {
            const translitText = document.querySelector('.translit-text') as HTMLElement;
            if (translitText) {
                translitText.style.fontSize = '16px';
                updateTranslitSizeDisplay();
            }
        };

        decreaseBtn?.addEventListener('click', handleDecrease);
        increaseBtn?.addEventListener('click', handleIncrease);
        resetBtn?.addEventListener('click', handleReset);

        decreaseEnglishBtn?.addEventListener('click', handleEnglishDecrease);
        increaseEnglishBtn?.addEventListener('click', handleEnglishIncrease);
        resetEnglishBtn?.addEventListener('click', handleEnglishReset);

        decreaseTranslitBtn?.addEventListener('click', handleTranslitDecrease);
        increaseTranslitBtn?.addEventListener('click', handleTranslitIncrease);
        resetTranslitBtn?.addEventListener('click', handleTranslitReset);

        // Initialize size displays
        updateSizeDisplay();
        updateEnglishSizeDisplay();
        updateTranslitSizeDisplay();

        return () => {
            clearTimeout(timer);
            observer.disconnect();
            // Cleanup event listeners
            linkedWords.forEach(word => {
                word.removeEventListener('mouseenter', () => { });
                word.removeEventListener('mouseleave', () => { });
            });

            decreaseBtn?.removeEventListener('click', handleDecrease);
            increaseBtn?.removeEventListener('click', handleIncrease);
            resetBtn?.removeEventListener('click', handleReset);

            decreaseEnglishBtn?.removeEventListener('click', handleEnglishDecrease);
            increaseEnglishBtn?.removeEventListener('click', handleEnglishIncrease);
            resetEnglishBtn?.removeEventListener('click', handleEnglishReset);

            decreaseTranslitBtn?.removeEventListener('click', handleTranslitDecrease);
            increaseTranslitBtn?.removeEventListener('click', handleTranslitIncrease);
            resetTranslitBtn?.removeEventListener('click', handleTranslitReset);
        };
    }, [slug]);

    return (
        <div className="view-count-display" style={{ display: 'none' }}>
            {viewCount}
        </div>
    );
} 