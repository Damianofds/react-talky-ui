import { useState } from "react";
import InputBox from "./components/InputBox";
import ChatBox from "./components/ChatBox";
import { ChatItemConfig } from "./components/chat-items/TalkItemsConfig";

interface TalkUIProps {
    initTalkURL: string;
    font?: string;
    fontSize?: string;
    themeColor?: string;
}

export type MessageType = 'input' | 'stream';

const TalkyUI: React.FC<TalkUIProps> = ({ initTalkURL, themeColor }) => {

    const [inputBoxText, setInputBoxText] = useState<ChatItemConfig>();
    
    const setInputBoxContent = (msg: ChatItemConfig, ) => {
        setInputBoxText(msg);
    };

    return (
        <>
            <ChatBox initTalkURL={initTalkURL} message={inputBoxText} themeColor={themeColor} />
            <br/>
            <InputBox inputRetriever={setInputBoxContent} conversationRouteKeyword="conversation" qaRouteKeyword="qa" themeColor={themeColor} />
        </>
    );
};

export default TalkyUI;