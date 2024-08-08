import { useState } from "react";
import TalkInput from "./components/InputBox";
import ChatBox from "./components/ChatBox";


interface TalkUIProps {
}

const TalkyUI: React.FC<TalkUIProps> = ({  }) => {

    const [newMessage, setNewMessage] = useState<string>("");
    const [newMessageType, setNewMessageType] = useState<'question' | 'answer'>('answer');
    
    const handleNewMessage = (msg: string, msgType: 'question' | 'answer') => {
        setNewMessage(msg);
        setNewMessageType(msgType);
    };

    return (
        <>
            <ChatBox initTalkURL='/conversation-audio.json' chatHeight='200px' chatWidth='90vw' qaMessage={newMessage} qaMessageType={newMessageType}/>
            <br/>
            <TalkInput messageHandler={handleNewMessage} />
        </>
    );
};

export default TalkyUI;