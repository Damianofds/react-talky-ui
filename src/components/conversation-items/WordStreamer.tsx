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
    const {nextSentence, saveSentence} = useContext(ConversationContext);
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
            if(textAlign == 'left'){
                saveSentence(<div style={{textAlign:"left"}} key={id+currentWordIndex}>
                    {sentence}
                </div>);
            }
            if(textAlign == 'right'){
                saveSentence(<div><br /><div style={{textAlign:'right', backgroundColor:'gray'}} key={id+currentWordIndex}>
                    {sentence}
                </div><br /></div>);
            }
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
    const textAlignStyle: React.CSSProperties = {
        textAlign: textAlign === 'left' ? 'left' : 'right',
        display: 'inline-block',
    };
    return (<div style={textAlignStyle} data-testid="tac-ui-word-streamer">{currentWords.join(' ')}</div>);
}

export default WordStreamer;