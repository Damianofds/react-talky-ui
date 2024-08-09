import { useState } from "react";
import InputBox from "./components/InputBox";
import ChatBox from "./components/ChatBox";


interface TalkUIProps {
    initTalkURL: string;
}

const TalkyUI: React.FC<TalkUIProps> = ({ initTalkURL }) => {

    const [newMessage, setNewMessage] = useState<string>("");
    const [newMessageType, setNewMessageType] = useState<'question' | 'answer'>('answer');
    
    const handleNewMessage = (msg: string, msgType: 'question' | 'answer') => {
        setNewMessage(msg);
        setNewMessageType(msgType);
    };

    return (
        <>
            <ChatBox initTalkURL={initTalkURL} chatHeight='200px' chatWidth='90vw' qaMessage={newMessage} qaMessageType={newMessageType}/>
            <br/>
            <InputBox messageHandler={handleNewMessage} />
        </>
    );
};

export default TalkyUI;