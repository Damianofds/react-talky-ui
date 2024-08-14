import { useState } from "react";
import InputBox from "./components/InputBox";
import ChatBox from "./components/ChatBox";
import { ChatItemConfig } from "./components/chat-items/TalkItemsConfig";

interface TalkUIProps {
    initTalkURL: string;
    fontSize?: string;
    themeColor?: string;
}

export type MessageType = 'input' | 'stream';

const TalkyUI: React.FC<TalkUIProps> = ({ initTalkURL, fontSize='20px', themeColor='#4ea699' }) => {

    const [inputBoxText, setInputBoxText] = useState<ChatItemConfig>();
    
    const setInputBoxContent = (msg: ChatItemConfig, ) => {
        setInputBoxText(msg);
    };

    return (
        <>
            <ChatBox initTalkURL={initTalkURL} message={inputBoxText} themeColor={themeColor} fontSize={fontSize} />
            <br/>
            <InputBox inputRetriever={setInputBoxContent} conversationRouteKeyword="conversation" qaRouteKeyword="qa" themeColor={themeColor} fontSize={fontSize}/>
        </>
    );
};

export default TalkyUI;