import React, { useState, useRef, useEffect } from 'react';
import useFetchConversations from '../hooks/useFetchConversation2';
import { ConversationContext } from "./ConversationContext";
import { ConversationItemConfig } from './conversation-items/ConversationalItemsConfig';
import AudioItem from './conversation-items/AudioItem';
import TextItem, { WORD_DELAY } from './conversation-items/TextItem';

interface ConversationBoxProps {
    jsonUrl: string;
    chatHeight: `${number}px`;
    chatWidth: `${number}px` | `${number}vw`;
    aiMessage?: string;
    aiMessageType?: 'question' | 'answer' | 'notype';
}

const ConversationBox: React.FC<ConversationBoxProps> = ({ jsonUrl, chatHeight, chatWidth, aiMessage, aiMessageType }) => {
    const [currentJsonUrl, setCurrentJsonUrl] = useState(jsonUrl);
    const [renderedComponents, setRenderedComponents] = useState<ConversationItemConfig[]>([]);
    const conversation = useFetchConversations(currentJsonUrl);
    const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
    const [isWaiting, setWaiting] = useState(false);
    const [showLoader, setShowLoader] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const [components, setComponents] = useState<ConversationItemConfig[]>([]);

    const nextSentence = () => {
        setCurrentSentenceIndex(prev => prev + 1);
    }

    const switchConversation = (newUrl: string) => {
        setCurrentSentenceIndex(0);
        setCurrentJsonUrl(newUrl);
    }

    useEffect(() => {
        const scrollDown = () => {
            if (containerRef.current) {
                containerRef.current.scrollTop = containerRef.current.scrollHeight;
            }
        }
        scrollDown();
        setTimeout(scrollDown, 500);
    }, [renderedComponents, currentSentenceIndex, showLoader]);

    useEffect(() => {
        const savedComponents = localStorage.getItem('components');
        if (savedComponents) {
            setRenderedComponents(JSON.parse(savedComponents));
            setShowLoader(prev => !prev);
            console.log("pre-loading conversation from browser local storage");
        }
        else{
            setComponents(conversation);
            console.log("conversation from static chat flow");
        }
    }, [conversation]);

    useEffect(() => {
        console.log("in use effect - components - " + components.length)
        if(components.length > 0){
            localStorage.setItem('components', JSON.stringify(renderedComponents));
        }

        const renderNextComponent = () => {
            let wordsCount : number = 1;
            if(components[currentSentenceIndex] && components[currentSentenceIndex].type == 'text'){
                wordsCount = components[currentSentenceIndex].text.split(" ").length;
            }
            if (currentSentenceIndex < components.length) {
                setRenderedComponents((prev) => [...prev, components[currentSentenceIndex]]);
                setCurrentSentenceIndex(prev => prev + 1);
            }
        };

        let wordsCount : number = 10;
        console.log(components[currentSentenceIndex]);
        if(components[currentSentenceIndex] && components[currentSentenceIndex].type == 'text'){
            wordsCount = components[currentSentenceIndex].text.split(" ").length;   
        }
        console.log("wordsCount - " + wordsCount);
        setTimeout(renderNextComponent, wordsCount * WORD_DELAY);
        if((components.length > 0) && (currentSentenceIndex >= components.length) && !isWaiting){
            setWaiting(prev => !prev);
            setTimeout(() => setShowLoader(prev => !prev), wordsCount * WORD_DELAY);
        }
    }, [components, currentSentenceIndex]);
        
    const renderComponent = (component: ConversationItemConfig) => {
        switch (component.type) {
            case 'audio':
            return <AudioItem key={component.id} id={component.id} audioUrl={component.audioUrl} audioName={component.audioName} />;
            case 'text':
            return <TextItem key={component.id} id={component.id} words={component.text} />;
            default:
            return null;
        }
    };
    
    return (
        <ConversationContext.Provider value={{
            nextSentence: nextSentence,
            switchConversation: switchConversation,
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
                    {renderedComponents.map((component) => renderComponent(component))}
                    {showLoader && <div className='pulsing-cursor' />}
                </div>
            </div>
        </ConversationContext.Provider>
    );
};

export default ConversationBox;