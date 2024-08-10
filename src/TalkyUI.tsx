import { useState } from "react";
import InputBox from "./components/InputBox";
import ChatBox from "./components/ChatBox";

interface TalkUIProps {
    initTalkURL: string;
}

type MessageType = 'question' | 'answer' | 'conversationAnswer';

const TalkyUI: React.FC<TalkUIProps> = ({ initTalkURL }) => {

    const [inputBoxText, setInputBoxText] = useState<string>("");
    const [inputBoxType, setInputBoxType] = useState<MessageType>('answer');
    
    const setInputBoxContent = (msg: string, msgType: MessageType) => {
        setInputBoxText(msg);
        setInputBoxType(msgType);
    };

    return (
        <>
            <ChatBox initTalkURL={initTalkURL} qaMessage={inputBoxText} qaMessageType={inputBoxType}/>
            <br/>
            <InputBox inputRetriever={setInputBoxContent} conversationRouteKeyword="conversation" qaRouteKeyword="qa"/>
        </>
    );
};

export default TalkyUI;