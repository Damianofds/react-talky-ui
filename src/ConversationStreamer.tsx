import React, { useState, useRef, useEffect } from 'react';
import useFetchConversations from './hooks/useFetchConversation';
import WordStreamer from './components/WordStreamer';
import QuestionForm from './components/QuestionForm';
import RadioForm from './components/RadioForm';
import { ConversationContext } from "./ConversationContext";
import Question from './components/Question';

interface ConversationStreamProps {
    jsonUrl: string;
    aiMessage: string;
    aiMessageType: 'question' | 'answer';
    chatHeight: `${number}px`;
    chatWidth: `${number}px` | `${number}vw`;
}

const ConversationStreamer: React.FC<ConversationStreamProps> = ({ jsonUrl, chatHeight, chatWidth, aiMessage, aiMessageType }) => {

    const [currentJsonUrl, setCurrentJsonUrl] = useState(jsonUrl);
    const conversation = useFetchConversations(currentJsonUrl);
    const [displayedSentences, setDisplayedSentences] = useState<JSX.Element[]>([]);
    const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    // const conversation = aiAnswer
    //     ? [...conversationStatic, { type: "statement", text: aiAnswer }]
    //     : [...conversationStatic];


    const getCurrentSentenceIndex = () => {
        return currentSentenceIndex;
    }

    const nextSentence = () => {
        setCurrentSentenceIndex(currentSentenceIndex + 1);
    }

    const saveSentence = (formTile: JSX.Element) => {
        setDisplayedSentences([...displayedSentences, formTile]);
    }

    const switchConversation = (newUrl: string) => {
        setCurrentSentenceIndex(0);
        setCurrentJsonUrl(newUrl);
    }

    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    }, [displayedSentences]);

    const newConversationPresent: boolean =
        conversation &&
        currentSentenceIndex < conversation.length &&
        conversation.length > 0

    const currentSentence = (newConversationPresent)
        ? conversation[currentSentenceIndex]
        : { type: "statement", text: aiMessage };
    return (
        <ConversationContext.Provider value={{
            nextSentence: nextSentence,
            saveSentence: saveSentence,
            switchConversation: switchConversation,
            getCurrentSentenceIndex: getCurrentSentenceIndex,
        }}>
            <div ref={containerRef} data-testid="tac-ui-root" style={{
                height: chatHeight,
                width: chatWidth,
                maxWidth: '600px',
                overflowY: 'auto',
                border: '1px solid #ccc',
                padding: '10px',
                textAlign: 'left',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                fontSize: '20px',
            }}>
                <div style={{ maxHeight: '100%' }}>
                    {displayedSentences}
                    {
                        currentSentence.type === 'statement' && aiMessageType === 'question' && (
                            <Question words={currentSentence.text} />
                        )
                    }
                    {
                        currentSentence.type === 'statement' && aiMessageType === 'answer' && (    
                            <WordStreamer words={currentSentence.text} textAlign='left'/>
                        )
                    }
                    {
                        currentSentence.type === 'question' && (
                            <QuestionForm currentSentence={currentSentence} />
                        )
                    }
                    {
                        currentSentence.type === 'radio' && (
                            <RadioForm currentSentence={currentSentence} />
                        )
                    }
                    {
                        currentSentence.type === 'personal-ai' && (
                            <p>Now you can talk with an AI !</p>
                        )
                    }
                    <span>✨</span>
                    {/* <span className='blinking-cursor'>✨</span> */}
                </div>
            </div>

        </ConversationContext.Provider>
    );
};

export default ConversationStreamer;