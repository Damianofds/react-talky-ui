import React, { useState, useRef, useEffect } from 'react';
import useFetchConversations from '../hooks/useFetchConversation';
import { ConversationContext } from "./ConversationContext";
import { ConversationItemConfig, TextItemConfig } from './conversation-items/ConversationalItemsConfig';
import AudioItem from './conversation-items/AudioItem';
import TextItem, { WORD_DELAY } from './conversation-items/TextItem';
import ButtonItem from './conversation-items/ButtonItem';
import InputItem from './conversation-items/InputItem';

interface ConversationBoxProps {
    jsonUrl: string;
    chatHeight: `${number}px`;
    chatWidth: `${number}px` | `${number}vw`;
    aiMessage?: string;
    aiMessageType?: 'question' | 'answer' | 'notype';
}

const ConversationBox: React.FC<ConversationBoxProps> = ({ jsonUrl, chatHeight, chatWidth, aiMessage, aiMessageType }) => {
    const [currentJsonUrl, setCurrentJsonUrl] = useState(jsonUrl);
    const [isInitialized, setInitialized] = useState(false);
    const [renderedComponents, setRenderedComponents] = useState<ConversationItemConfig[]>([]);
    const conversation = useFetchConversations(currentJsonUrl);
    const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
    const [isWaiting, setWaiting] = useState(false);
    const [showLoader, setShowLoader] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const [components, setComponents] = useState<ConversationItemConfig[]>([]);

    const switchConversation = (newUrl: string) => {
        setCurrentJsonUrl(newUrl + "?time=" + Date.now());
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
        if(!isInitialized && savedComponents){
            console.log("pre-loading conversation from browser local storage");
            setRenderedComponents(JSON.parse(savedComponents));
            setShowLoader(prev => !prev);
            setInitialized(prev => !prev);
        }
        else{
            console.log("conversation from static chat flow");
            setCurrentSentenceIndex(0);
            setComponents(conversation);
            setInitialized(prev => prev ? prev : !prev);
        }
    }, [conversation]);

    useEffect(() => {
        if(components.length > 0){
            localStorage.setItem('components', JSON.stringify(renderedComponents));
        }

        const renderNextComponent = () => {
            if (currentSentenceIndex < components.length) {
                setRenderedComponents((prev) => [...prev, components[currentSentenceIndex]]);
                setCurrentSentenceIndex(prev => prev + 1);
            }
        };

        let wordsCount : number = 10;
        if(components[currentSentenceIndex] && components[currentSentenceIndex].type == 'text'){
            const textComponent = components[currentSentenceIndex] as TextItemConfig;
            wordsCount = textComponent.text.split(" ").length;   
        }
        setTimeout(renderNextComponent, wordsCount * WORD_DELAY);
        if((components.length > 0) && (currentSentenceIndex >= components.length) && !isWaiting){
            setWaiting(prev => !prev);
            setTimeout(() => setShowLoader(prev => !prev), wordsCount * WORD_DELAY);
        }
    }, [components, currentSentenceIndex]);

    useEffect(() => {
        setCurrentSentenceIndex(0);
        const item = {id: "qa-" + Date.now(), text: aiMessage, type: aiMessageType=='question' ? 'input' :  'text'} as TextItemConfig
        setComponents([item])
        console.log(item);
        setShowLoader(prev => !prev);
    },[aiMessage]);
        
    const renderComponent = (component: ConversationItemConfig) => {
        switch (component.type) {
            case 'audio':
            return <AudioItem key={component.id} id={component.id} audioUrl={component.audioUrl} audioName={component.audioName} />;
            case 'text':
            return <TextItem key={component.id} id={component.id} words={component.text} />;
            case 'input':
            return <InputItem key={component.id} id={component.id} words={component.text} />;
            case 'button':
            return <ButtonItem key={component.id} id={component.id}  conversationUrl={component.conversationUrl} buttonLabel={component.buttonLabel}/>;
            default:
            return null;
        }
    };

    return (
        <ConversationContext.Provider value={{
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