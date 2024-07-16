import React, { useState, useRef, useEffect } from 'react';
import useFetchConversations from '../hooks/useFetchConversation';
import WordStreamer from './conversation-items/WordStreamer';
import ButtonsForm from './conversation-items/ButtonsForm';
import RadioForm from './conversation-items/RadioForm';
import { ConversationContext } from "./ConversationContext";
import Question from './conversation-items/Question';

interface ConversationBoxProps {
    jsonUrl: string;
    chatHeight: `${number}px`;
    chatWidth: `${number}px` | `${number}vw`;
    aiMessage?: string;
    aiMessageType?: 'question' | 'answer' | 'notype';
}

const ConversationBox: React.FC<ConversationBoxProps> = ({ jsonUrl, chatHeight, chatWidth, aiMessage, aiMessageType }) => {

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
        : (aiMessage)
            ? { type: "statement", text: aiMessage }
            : { type: "notype", text: "notext" };
    console.log(newConversationPresent)
    console.log(currentSentence)
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
                minWidth: '340px',
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
                        currentSentence.type === 'statement' && aiMessageType != 'question' && (    
                            <WordStreamer words={currentSentence.text} textAlign='left'/>
                        )
                    }
                    {
                        currentSentence.type === 'question' && (
                            <ButtonsForm currentSentence={currentSentence} />
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
                    <span>
                        <div className='pulsing-cursor'>
                            {/* &nbsp;<img style={{height:'1em', top:'80px'}} src="/favicon.ico"/> */}
                        </div>
                    </span>
                </div>
            </div>

        </ConversationContext.Provider>
    );
};

export default ConversationBox;