import React, { useCallback, useEffect, useId, useState } from 'react';

export const WORD_DELAY = 100;

interface TextItemProps {
    id: string;
    words: string;
}

const TextItem: React.FC<TextItemProps> = ({ words }) => {

    const [currentWords, setCurrentWords] = useState<string[]>([]);
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [isDataLoaded, setDataLoaded] = useState(false);
    const id = useId();

    const displaySentence = useCallback((sentence: string) => {
        const wordsArray = sentence.split(' ');
        if (currentWordIndex < wordsArray.length) {
            setTimeout(() => {
                setCurrentWords((prevWords) => [...prevWords, wordsArray[prevWords.length]]);
                setCurrentWordIndex((prevIndex) => prevIndex + 1);
            }, WORD_DELAY);
        }
    }, [currentWordIndex, isDataLoaded]);

    useEffect(() => {
        const savedCurrentWordIndex = localStorage.getItem(`text-item-currentWordIndex-${id}`);
        const savedCurrentWords = localStorage.getItem(`text-item-currentWords-${id}`);
        
        if (savedCurrentWordIndex) {
            setCurrentWordIndex(Number(savedCurrentWordIndex));
        }

        if (savedCurrentWords) {
            setCurrentWords(savedCurrentWords.split(" "));
        }

        setDataLoaded(true);
    }, [id]);

    useEffect(() => {
        if (isDataLoaded) {
            displaySentence(words);
        }
    }, [isDataLoaded, currentWordIndex, displaySentence, words]);

    useEffect(() => {
        if (isDataLoaded) {
            localStorage.setItem(`text-item-currentWordIndex-${id}`, JSON.stringify(currentWordIndex));
            localStorage.setItem(`text-item-currentWords-${id}`, currentWords.join(" "));
        }
    }, [currentWordIndex, currentWords, id, isDataLoaded]);

    const showCursor = currentWordIndex < words.split(" ").length;
    return (<div key={id}>{currentWords.join(' ')}{showCursor && <div className='pulsing-cursor' />}</div>);
}

export default TextItem;
