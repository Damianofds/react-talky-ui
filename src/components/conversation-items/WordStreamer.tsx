import React, { useContext, useEffect, useId, useState } from 'react';
import { ConversationContext } from '../ConversationContext';

const WORD_DELAY = 100;

interface WordStreamerProps {
    words: string;
    loopStyle? : 'cycle' | 'stay' | 'disappear';
    textAlign? : 'left' | 'right'
    setStreamingFinished?: (isFinished: boolean) => void;
}

const WordStreamer: React.FC<WordStreamerProps> = ({ words, loopStyle='disappear', setStreamingFinished, textAlign }) => {

    const [currentWords, setCurrentWords] = useState<string[]>([]);
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const {nextSentence} = useContext(ConversationContext);
    const id = useId();

    const displaySentence = (sentence: string) => {
        const words = sentence.split(' ');
        if (currentWordIndex < words.length) {
            setTimeout(() => {
                setCurrentWords([...currentWords, words[currentWordIndex]]);
                setCurrentWordIndex(currentWordIndex + 1);
            }, WORD_DELAY);
        }
        else {
            if (setStreamingFinished) {
                setStreamingFinished(true);
            }
            else{
                nextSentence();
            }
            if(loopStyle === 'cycle'){
                setCurrentWords([""]);
                setCurrentWordIndex(0);
            }
            if(loopStyle === 'disappear'){
                setCurrentWords([]);
            }
        }
    }

    useEffect(() => {
        displaySentence(words);
    }, [currentWordIndex]);

    useEffect(() => {
        setCurrentWords([]);
        setCurrentWordIndex(0);
    }, [words]);

    return (<div style={{display: 'inline-block'}} data-testid="talk-ui-word-streamer">{currentWords.join(' ')}</div>);
}

export default WordStreamer;