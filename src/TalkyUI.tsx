import { useState } from "react";
import InputBox from "./components/InputBox";
import ChatBox from "./components/ChatBox";
import { ChatItemConfig } from "./components/chat-items/ChatItemConfig";
import { CirclularStack, createCircularStack, push, get } from "./components/utils/CircularStack";

interface TalkUIProps {
    initTalkURL: string;
    fontSize?: string;
    themeColor?: string;
}

export type MessageType = 'input' | 'stream';

const TalkyUI: React.FC<TalkUIProps> = ({ initTalkURL, fontSize='20px', themeColor='#4ea699' }) => {

    const [inputBoxText, setInputBoxText] = useState<ChatItemConfig>();
    const [entrySuccess, setEntrySuccess] = useState<string>();
    const [inputBoxHistory, setInputBoxHistory] = useState<CirclularStack<string>>(createCircularStack(5));

    const setInputBoxContent = (msg: ChatItemConfig, ) => {
        setInputBoxText(msg);
    };

    const setSuccess = (id: string) => {
        setEntrySuccess(id);
    };

    if(inputBoxText?.type == 'text-input'){
        if(get(inputBoxHistory, 0) != inputBoxText.text){
            setInputBoxHistory(push(inputBoxHistory, inputBoxText.text));
        }
    }

    return (
        <>
            <ChatBox initTalkURL={initTalkURL} message={inputBoxText} themeColor={themeColor} fontSize={fontSize} updateStatus={entrySuccess}/>
            <InputBox inputRetriever={setInputBoxContent} successSetter={setSuccess} inputBoxHistory={inputBoxHistory} conversationRouteKeyword="conversation" qaRouteKeyword="embeddings" themeColor={themeColor} fontSize={fontSize}/>
            <br />
        </>
    );
};

export default TalkyUI;