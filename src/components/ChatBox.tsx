import React, { useState, useRef, useEffect } from 'react';
import { ChatItemConfig } from './chat-items/TalkItemsConfig';
import AudioItem from './chat-items/AudioItem';
import ButtonItem from './chat-items/ButtonItem';
import InputItem from './chat-items/InputItem';
import StreamItem from './chat-items/StreamItem';
import useLoadUserChatHistory from '../hooks/useUserHistoryLoader';
import useFetchTalk from '../hooks/useFetchTalk';

interface ChatBoxProps {
    initTalkURL: string;
    message?: ChatItemConfig;
}

const ChatBox: React.FC<ChatBoxProps> = ({ initTalkURL, message }) => {
    const [currentTalkURL, setCurrentTalkURL] = useState(initTalkURL);
    const {talkCurrentItem, isLastItem} = useFetchTalk(currentTalkURL);
    const chatHistory = useLoadUserChatHistory();
    const [renderedChatItems, setRenderedChatItems] = useState<ChatItemConfig[]>([]);
    const [showLoader, setShowLoader] = useState(false);
    const chatBoxRef = useRef<HTMLDivElement>(null);
    const [isStreamingStarted, setStreamingStarted] = useState<boolean>(false);
    const [isChatBoxInitialized, setChatBoxInitialized] = useState<boolean>(false);

    useEffect(() => {
        // console.log(!isChatBoxInitialized && chatHistory);
        console.log(!isChatBoxInitialized);
        console.log(talkCurrentItem);
        if(!isChatBoxInitialized && chatHistory){
            console.log("Loading user chat history...");
            setRenderedChatItems(JSON.parse(chatHistory));
            setChatBoxInitialized(() => true);
        }
        else{
            console.log("Loading init talk...");
            if(!isChatBoxInitialized && talkCurrentItem){
                setRenderedChatItems(prev => [...prev, talkCurrentItem]);
                if(isLastItem){
                    setChatBoxInitialized(() => true);
                }
            }
        }
    }, [talkCurrentItem]);

    useEffect(() => {
        const scrollDown = () => {
            if (chatBoxRef.current) {
                chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
            }
        }
        scrollDown();
        setTimeout(scrollDown, 500);
    }, [renderedChatItems, showLoader]);
    
    useEffect(() => {
        const item = message;
        if(item){    
            if(item.type=='stream'){
                if(isStreamingStarted){
                    setRenderedChatItems(prev => [...prev.slice(0, -1)]);
                }
                setRenderedChatItems(prev => [...prev, item]);
                setStreamingStarted(() => true);
            }else{
                setRenderedChatItems(prev => [...prev, item]);
                setStreamingStarted(() => false);
            }
        }
        localStorage.setItem('components', JSON.stringify(renderedChatItems));
    },[message]);
        
    const renderComponent = (component: ChatItemConfig) => {
        switch (component.type) {
            case 'audio':
            return <AudioItem key={component.id} id={component.id} audioUrl={component.audioUrl} audioName={component.audioName} />;
            case 'stream':
            return <StreamItem key={component.id} id={component.id} words={component.text} />;
            case 'input':
            return <InputItem key={component.id} id={component.id} words={component.text} />;
            case 'button':
            return <ButtonItem key={component.id} id={component.id}  conversationUrl={component.conversationUrl} buttonLabel={component.buttonLabel}/>;
            default:
            return null;
        }
    };

    return (
        <div ref={chatBoxRef} data-testid="tac-ui-root" style={{
            height: "60%",
            width: "94%",
            overflowY: 'auto',
            // border: '1px solid #ccc',
            textAlign: 'left',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            fontSize: '20px',
            paddingLeft: '3%',
            paddingRight: '3%',
        }}>
            <div style={{ maxHeight: '100%' }}>
                {renderedChatItems.map((component) => renderComponent(component))}
                {showLoader && <div className='pulsing-cursor' />}
            </div>
        </div>
    );
};

export default ChatBox;