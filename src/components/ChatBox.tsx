import React, { useState, useRef, useEffect } from 'react';
import { ChatItemConfig } from './chat-items/TalkItemsConfig';
import AudioItem from './chat-items/AudioItem';
import ButtonItem from './chat-items/ButtonItem';
import InputItem from './chat-items/InputItem';
import StreamItem from './chat-items/StreamItem';
import useLoadUserChatHistory from '../hooks/useUserHistoryLoader';
import useFetchTalk from '../hooks/useFetchTalk';
import { ConversationContext } from './ConversationContext';
import ClearStorageButton from './utils/ClearStorageButton';
import OriginVisualizer from './utils/OriginVisualizer';

interface ChatBoxProps {
    initTalkURL: string;
    message?: ChatItemConfig;
    fontSize?: string;
    themeColor?: string;
}

const ChatBox: React.FC<ChatBoxProps> = ({ initTalkURL, message, fontSize, themeColor }) => {
    const [currentTalkURL, setCurrentTalkURL] = useState(initTalkURL);
    const {talkCurrentItem, isLastItem} = useFetchTalk(currentTalkURL);
    const chatHistory = useLoadUserChatHistory();
    const [renderedChatItems, setRenderedChatItems] = useState<ChatItemConfig[]>([]);
    const [showLoader, setShowLoader] = useState(false);
    const chatBoxRef = useRef<HTMLDivElement>(null);
    const [isStreamingStarted, setStreamingStarted] = useState<boolean>(false);
    const [isChatBoxInitialized, setChatBoxInitialized] = useState<boolean>(false);
    const [isTalkSwitched, setTalkSwitched] = useState<boolean>(false);
    const [origin, setOrigin] = useState<string>();

    const switchTalk = (newTalkURL: string) => {
        setCurrentTalkURL(newTalkURL);
        setTalkSwitched(true);
    }

    const loadStaticTalk = (talkCurrentItem: ChatItemConfig) => {
        if(isStreamingStarted){
            setRenderedChatItems(prev => [...prev.slice(0, -1)]);
        }
        setRenderedChatItems(prev => [...prev, talkCurrentItem]);
        if(talkCurrentItem.type == 'stream'){
            setStreamingStarted(() => true);
        }
        if(talkCurrentItem.type == 'stream' && talkCurrentItem.isCompleted){
            setStreamingStarted(() => false);
            if(isLastItem){
                setChatBoxInitialized(() => true);
                localStorage.setItem('components', JSON.stringify([...renderedChatItems.slice(0,-1), talkCurrentItem]));   
            }
        }
        if(talkCurrentItem.type != 'stream'){
            if(isLastItem){
                setChatBoxInitialized(() => true);
                localStorage.setItem('components', JSON.stringify([...renderedChatItems]));   
            }
        }
    };

    const handleAIMessage = () => {
        const item = message;
        if(item){ 
            if(item.type=='stream'){
                if(isStreamingStarted){
                    setOrigin(item.origin);
                    setRenderedChatItems(prev => [...prev.slice(0, -1)]);
                }
                setRenderedChatItems(prev => [...prev, item]);
                if(item.isCompleted){
                    setStreamingStarted(() => false);
                    setShowLoader(true);
                }
                else{
                    setStreamingStarted(() => true);
                }
            }
            else{
                setRenderedChatItems(prev => [...prev, item]);
                setStreamingStarted(() => false);
                setShowLoader(true);
            }
        }
        localStorage.setItem('components', JSON.stringify(renderedChatItems));
    };

    const loadFromHistoryOrInitTalk = () => {
        const previousChatPresent = !isChatBoxInitialized && chatHistory;
        if(previousChatPresent){
            console.log("Loading user chat history...");
            setRenderedChatItems(JSON.parse(chatHistory));
            setChatBoxInitialized(true);
            setOrigin('history');
        }
        else{
            if(talkCurrentItem && (!isChatBoxInitialized || isTalkSwitched)){
                console.log("Loading init talk...");
                loadStaticTalk(talkCurrentItem);
                setOrigin('static-talk');
            }
        }
    };

    const scrollDownChat = () => {
        if (chatBoxRef.current) {
            chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
        }
    };

    useEffect(() => {
        loadFromHistoryOrInitTalk();
    }, [talkCurrentItem]);

    useEffect(() => {
        setTimeout(scrollDownChat, 500);
    }, [renderedChatItems]);
    
    useEffect(() => {
        if(message){
            setShowLoader(false);
            handleAIMessage();
        }
    },[message]);

    useEffect(() => {
        setShowLoader(true);
    },[isChatBoxInitialized]);

    const renderComponent = (component: ChatItemConfig) => {
        switch (component.type) {
            case 'audio':
            return <AudioItem key={component.id} id={component.id} audioUrl={component.audioUrl} audioName={component.audioName} />;
            case 'stream':
            return <StreamItem key={component.id} id={component.id} words={component.text} />;
            case 'input':
            return <InputItem key={component.id} id={component.id} words={component.text} themeColor={themeColor} />;
            case 'button':
            return <ButtonItem key={component.id} id={component.id}  conversationUrl={component.conversationUrl} buttonLabel={component.buttonLabel} themeColor={themeColor}/>;
            default:
            return null;
        }
    };

    return (
        <ConversationContext.Provider value={{
            switchConversation: switchTalk,
        }}>
            <div ref={chatBoxRef} data-testid="tac-ui-root" style={{
                height: "100%",
                overflowY: 'auto',
                textAlign: 'left',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                fontSize: fontSize,
            }}>
                <div style={{ maxHeight: '100%' }}>
                    {renderedChatItems.map((component) => renderComponent(component))}
                    {showLoader && <div><div style={{backgroundColor: themeColor}} className='pulsing-cursor' /><br/></div>}
                </div>
            </div>
            <div style={{height:'30px', display: 'flex', justifyContent: 'flex-end', marginTop:'5px' }}>
                <span style={{ width: '150px', textAlign: 'left' }}><OriginVisualizer origin={origin || 'N/A'}/></span>
                <span style={{ width: '100px', textAlign: 'left' }}><ClearStorageButton color={themeColor || ''}/></span>
            </div>
        </ConversationContext.Provider>
    );
};

export default ChatBox;