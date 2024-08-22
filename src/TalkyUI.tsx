import { useState } from "react";
import InputBox from "./components/InputBox";
import ChatBox from "./components/ChatBox";
import { ChatItemConfig } from "./components/chat-items/TalkItemsConfig";
import { CirclularStack, createCircularStack, push, get } from "./components/utils/CircularStack";

interface TalkUIProps {
    initTalkURL: string;
    fontSize?: string;
    themeColor?: string;
}

export type MessageType = 'input' | 'stream';

const TalkyUI: React.FC<TalkUIProps> = ({ initTalkURL, fontSize='20px', themeColor='#4ea699' }) => {

    const [inputBoxText, setInputBoxText] = useState<ChatItemConfig>();
    const [inputBoxHistory, setInputBoxHistory] = useState<CirclularStack<string>>(createCircularStack(5));

    const setInputBoxContent = (msg: ChatItemConfig, ) => {
        setInputBoxText(msg);
    };

    if(inputBoxText?.type == 'text-input'){
        console.log("inputBoxText: - " + inputBoxText.text)
        if(get(inputBoxHistory, 0) != inputBoxText.text){
            setInputBoxHistory(push(inputBoxHistory, inputBoxText.text));
        }
    }

    return (
        <>
            <ChatBox initTalkURL={initTalkURL} message={inputBoxText} themeColor={themeColor} fontSize={fontSize} />
            <InputBox inputRetriever={setInputBoxContent} inputBoxHistory={inputBoxHistory} conversationRouteKeyword="conversation" qaRouteKeyword="embeddings" themeColor={themeColor} fontSize={fontSize}/>
            <br />
        </>
    );
};

export default TalkyUI;