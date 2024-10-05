import { useState } from "react";
import InputBox from "./components/InputBox";
import ChatBox from "./components/ChatBox";
import {
    ChatEntryState,
    UploadStatus,
} from "./components/chatbox-entries/ChatEntryState";
import {
    CirclularStack,
    createCircularStack,
    push,
    get,
} from "./components/utils/CircularStack";
import { ConfigurationContext } from "./components/ConfigurationContext";
import { BotTalkContext } from "./components/BotTalkContext";
import UserSession from "./components/UserSession";

interface TalkUIProps {
    initTalkURL: string;
    fontSize?: string;
    themeColor?: string;
    backendConfiguration: {
        openaiKey?: string;
        qaUrl?: string;
        audioUploadUrl?: string;
        documentUploadurl?: string;
    };
}

const TalkyUI: React.FC<TalkUIProps> = ({
    initTalkURL,
    fontSize = "20px",
    themeColor = "#4ea699",
    backendConfiguration,
}) => {
    const [chatMessage, setChatMessage] = useState<ChatEntryState>();
    const [botStatusUpdate, setBotStatusUpdate] = useState<{
        entryId: string;
        outcome: UploadStatus;
    }>();
    const [chatMessageUserHistory, setChatMessageUserHistory] = useState<
        CirclularStack<string>
    >(createCircularStack(10));
    const [currentTalkURL, setCurrentTalkURL] = useState(initTalkURL);
    const [isTalkSwitched, setTalkSwitched] = useState<boolean>(false);

    if (chatMessage?.type == "user-text") {
        if (get(chatMessageUserHistory, 0) != chatMessage.text) {
            setChatMessageUserHistory(
                push(chatMessageUserHistory, chatMessage.text)
            );
        }
    }

    const switchTalk = (newTalkURL: string) => {
        setCurrentTalkURL(newTalkURL);
        setTalkSwitched(true);
    };

    return (
        <>
            <BotTalkContext.Provider
                value={{
                    switchBotTalk: switchTalk,
                }}>
                <ConfigurationContext.Provider
                    value={{
                        openaiKey: backendConfiguration.openaiKey,
                        qaUrl: backendConfiguration.qaUrl,
                        audioUploadUrl: backendConfiguration.audioUploadUrl,
                        documentUploadurl: backendConfiguration.documentUploadurl,
                    }}>
                    <ChatBox
                        currentTalkURL={currentTalkURL}
                        isTalkSwitched={isTalkSwitched}
                        chatMessage={chatMessage}
                        themeColor={themeColor}
                        fontSize={fontSize}
                        updateStatus={botStatusUpdate}
                    />
                    <UserSession />
                    <InputBox
                        setChatMessage={setChatMessage}
                        setBotStatusUpdate={setBotStatusUpdate}
                        inputBoxHistory={chatMessageUserHistory}
                        conversationRouteKeyword="conversation"
                        qaRouteKeyword="embeddings"
                        themeColor={themeColor}
                        fontSize={fontSize}
                    />
                    <br />
                </ConfigurationContext.Provider>
            </BotTalkContext.Provider>
        </>
    );
};

export default TalkyUI;
