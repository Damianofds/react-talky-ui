import React, { useState, useRef, useEffect } from 'react';
import useFetchTalk from '../hooks/useFetchTalk';
import { ConversationContext } from "./ConversationContext";
import { ChatItemConfig, TextItemConfig } from './chat-items/TalkItemsConfig';
import AudioItem from './chat-items/AudioItem';
import TextItem, { WORD_DELAY } from './chat-items/TextItem';
import ButtonItem from './chat-items/ButtonItem';
import InputItem from './chat-items/InputItem';
import useLoadUserChatHistory from '../hooks/useUserHistoryLoader';

interface ChatBoxProps {
    initTalkURL: string;
    chatHeight: `${number}px`;
    chatWidth: `${number}px` | `${number}vw`;
    qaMessage?: string;
    qaMessageType?: 'question' | 'answer' | 'notype' | 'conversationAnswer';
}

const ChatBox: React.FC<ChatBoxProps> = ({ initTalkURL, chatHeight, chatWidth, qaMessage, qaMessageType }) => {
    const [currentTalkURL, setCurrentTalkURL] = useState(initTalkURL);
    const [isChatInitialized, setChatInitialized] = useState(false);
    const [renderedChatItems, setRenderedChatItems] = useState<ChatItemConfig[]>([]);
    const currentTalk = useFetchTalk(currentTalkURL);
    const chatHistory = useLoadUserChatHistory();
    const [currentTalkIndex, setCurrentTalkIndex] = useState(0);
    const [isWaiting, setWaiting] = useState(false);
    const [showLoader, setShowLoader] = useState(false);
    const chatBoxRef = useRef<HTMLDivElement>(null);
    const [chatItems, setChatItems] = useState<ChatItemConfig[]>([]);

    const switchTalk = (newUrl: string) => {
        setCurrentTalkURL(newUrl + "?time=" + Date.now());
    }

    useEffect(() => {
        const scrollDown = () => {
            if (chatBoxRef.current) {
                chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
            }
        }
        scrollDown();
        setTimeout(scrollDown, 500);
    }, [renderedChatItems, currentTalkIndex, showLoader]);

    useEffect(() => {
        if(!isChatInitialized && chatHistory){
            console.log("Loading user chat history...");
            setRenderedChatItems(JSON.parse(chatHistory));
            setShowLoader(prev => !prev);
            setChatInitialized(prev => !prev);
        }
        else{
            console.log("Loading init talk...");
            setCurrentTalkIndex(0);
            setChatItems(currentTalk);
            setChatInitialized(prev => prev ? prev : !prev);
        }
    }, [currentTalk]);

    useEffect(() => {
        if(chatItems.length > 0){
            localStorage.setItem('components', JSON.stringify(renderedChatItems));
        }

        const renderNextComponent = () => {
            if (currentTalkIndex < chatItems.length) {
                setRenderedChatItems((prev) => [...prev, chatItems[currentTalkIndex]]);
                setCurrentTalkIndex(prev => prev + 1);
            }
        };

        let wordsCount : number = 10;
        if(chatItems[currentTalkIndex] && chatItems[currentTalkIndex].type == 'text'){
            const textComponent = chatItems[currentTalkIndex] as TextItemConfig;
            wordsCount = textComponent.text.split(" ").length;   
        }
        setTimeout(renderNextComponent, wordsCount * WORD_DELAY);
        if((chatItems.length > 0) && (currentTalkIndex >= chatItems.length) && !isWaiting){
            setWaiting(prev => !prev);
            setTimeout(() => setShowLoader(prev => !prev), wordsCount * WORD_DELAY);
        }
    }, [chatItems, currentTalkIndex]);

    useEffect(() => {
        setCurrentTalkIndex(0);
        const item = {id: "qa-" + Date.now(), text: qaMessage, type: qaMessageType=='question' ? 'input' :  'text'} as TextItemConfig
        setChatItems([item])
        console.log(item);
        setShowLoader(prev => !prev);
    },[qaMessage]);
        
    const renderComponent = (component: ChatItemConfig) => {
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
            switchConversation: switchTalk,
        }}>
            <div ref={chatBoxRef} data-testid="tac-ui-root" style={{
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
                    {renderedChatItems.map((component) => renderComponent(component))}
                    {showLoader && <div className='pulsing-cursor' />}
                </div>
            </div>
        </ConversationContext.Provider>
    );
};

export default ChatBox;