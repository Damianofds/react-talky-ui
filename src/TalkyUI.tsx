import { useState } from "react";
import InputBox from "./components/InputBox";
import ChatBox from "./components/ChatBox";


interface TalkUIProps {
    initTalkURL: string;
}

const TalkyUI: React.FC<TalkUIProps> = ({ initTalkURL }) => {

    const [inputBoxText, setInputBoxText] = useState<string>("");
    const [inputBoxType, setInputBoxType] = useState<'question' | 'answer' | 'conversationAnswer'>('answer');
    
    const setInputBoxContent = (msg: string, msgType: 'question' | 'answer' | 'conversationAnswer') => {
        setInputBoxText(msg);
        setInputBoxType(msgType);
    };

    return (
        <>
            <ChatBox initTalkURL={initTalkURL} chatHeight='200px' chatWidth='90vw' qaMessage={inputBoxText} qaMessageType={inputBoxType}/>
            <br/>
            <InputBox inputRetriever={setInputBoxContent} conversationRouteKeyword="conversation" qaRouteKeyword="qa"/>
        </>
    );
};

export default TalkyUI;