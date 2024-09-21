import React, { useState, useRef, useEffect } from "react";
import {
    BotTextEntryState,
    ChatEntryState,
    UploadEntryState,
    UploadStatus,
} from "./chatbox-entries/ChatEntryState";
import UserAudioItem from "./chatbox-entries/UserAudioEntry";
import ButtonItem from "./chatbox-entries/BotButtonEntry";
import UserTextItem from "./chatbox-entries/UserTextEntry";
import BotTextEntry from "./chatbox-entries/BotTextEntry";
import useLoadChatHistory from "../hooks/useLoadChatHistory";
import useBotTalk from "../hooks/useBotTalk";
import { BotTalkContext } from "./BotTalkContext";
import OriginVisualizer from "./utils/OriginVisualizer";
import AudioItem from "./chatbox-entries/BotAudioEntry";
import UserDocumentItem from "./chatbox-entries/UserDocumentEntry";
import Spacer from "./utils/Spacer";
import BotTextStreamingEntry from "./chatbox-entries/BotTextStreamingEntry";

interface ChatBoxProps {
    initTalkURL: string;
    chatMessage?: ChatEntryState;
    updateStatus?: {entryId: string, outcome: UploadStatus};
    fontSize?: string;
    themeColor?: string;
}

const ChatBox: React.FC<ChatBoxProps> = ({
    initTalkURL,
    chatMessage,
    updateStatus,
    fontSize,
    themeColor,
}) => {
    const [currentTalkURL, setCurrentTalkURL] = useState(initTalkURL);
    const { talkCurrentItem, isLastItem } = useBotTalk(currentTalkURL);
    const localChat = useLoadChatHistory();
    const [renderedChatItems, setRenderedChatItems] = useState<
        ChatEntryState[]
    >([]);
    const [showLoader, setShowLoader] = useState(false);
    const chatBoxRef = useRef<HTMLDivElement>(null);
    const [isStreamingStarted, setStreamingStarted] = useState<boolean>(false);
    const [isChatBoxInitialized, setChatBoxInitialized] =
        useState<boolean>(false);
    const [isTalkSwitched, setTalkSwitched] = useState<boolean>(false);
    const [origin, setOrigin] = useState<string>();
    const { loadLocalChat, saveLocalChatHistory } = useLoadChatHistory();

    const switchTalk = (newTalkURL: string) => {
        setCurrentTalkURL(newTalkURL);
        setTalkSwitched(true);
    };

    const loadStaticTalk = (talkCurrentItem: ChatEntryState) => {
        if (isStreamingStarted) {
            setRenderedChatItems(prev => [...prev.slice(0, -1)]);
        }
        setRenderedChatItems(prev => [...prev, talkCurrentItem]);
        if (talkCurrentItem.type == "bot-text") {
            setStreamingStarted(true);
        }
        if (talkCurrentItem.type == "bot-text" && talkCurrentItem.isCompleted) {
            setStreamingStarted(false);
            if (isLastItem) {
                setChatBoxInitialized(true);
                saveLocalChatHistory([
                    ...renderedChatItems.slice(0, -1),
                    talkCurrentItem,
                ]);
            }
        }
        if (talkCurrentItem.type != "bot-text") {
            if (isLastItem) {
                setChatBoxInitialized(true);
                saveLocalChatHistory([...renderedChatItems]);
            }
        }
    };

    const handleAIMessage = () => {
        // TODO This condition really sucks
        if (
            chatMessage &&
            !((chatMessage as BotTextEntryState).text == "  undefined")
        ) {
            if (chatMessage.type == "bot-text") {
                if (isStreamingStarted) {
                    setOrigin(chatMessage.origin);
                    setRenderedChatItems(prev => [...prev.slice(0, -1)]);
                }
                setRenderedChatItems(prev => [...prev, chatMessage]);
                saveLocalChatHistory(renderedChatItems);
                if (chatMessage.isCompleted) {
                    setStreamingStarted(false);
                    setShowLoader(true);
                } else {
                    setStreamingStarted(true);
                }
            } else {
                setRenderedChatItems(prev => [...prev, chatMessage]);
                saveLocalChatHistory(renderedChatItems);
                setStreamingStarted(false);
                setShowLoader(true);
            }
        }
    };

    const updateEntryStatus = (id: string, outcome: UploadStatus) => {
        setRenderedChatItems(prev => {
            const updatedChatItems = prev.map(item => {
                if (item.id === id) {
                    return {
                        ...item,
                        status: outcome,
                    };
                }
                return item;
            });
            saveLocalChatHistory(updatedChatItems);
            return updatedChatItems;
        });
    };

    const loadFromHistoryOrInitTalk = () => {
        const previousChatPresent =
            !isChatBoxInitialized && localChat && loadLocalChat().length > 0;
        if (previousChatPresent) {
            console.log("Loading user chat history...");
            setRenderedChatItems(JSON.parse(loadLocalChat()));
            setChatBoxInitialized(true);
            setOrigin("history");
        } else {
            if (talkCurrentItem && (!isChatBoxInitialized || isTalkSwitched)) {
                console.log("Loading init talk...");
                loadStaticTalk(talkCurrentItem);
                setOrigin("static-talk");
            }
        }
    };

    const scrollDownChat = () => {
        if (chatBoxRef.current) {
            chatBoxRef.current.scrollTop =
                chatBoxRef.current.scrollHeight - 200;
        }
    };

    useEffect(() => {
        loadFromHistoryOrInitTalk();
    }, [talkCurrentItem]);

    useEffect(() => {
        setTimeout(scrollDownChat, 0);
    }, [renderedChatItems, chatMessage]);

    useEffect(() => {
        const messageIsNotEmpty =
            chatMessage &&
            ((chatMessage as BotTextEntryState).text != "" ||
                (chatMessage as UploadEntryState).status == "processing");
        if (messageIsNotEmpty) {
            setShowLoader(false);
            handleAIMessage();
        }
    }, [chatMessage]);

    useEffect(() => {
        if (updateStatus) {
            updateEntryStatus(updateStatus.entryId, updateStatus.outcome);
        }
    }, [updateStatus]);

    useEffect(() => {
        setShowLoader(true);
    }, [isChatBoxInitialized]);

    const renderComponent = (component: ChatEntryState) => {
        switch (component.type) {
            case "user-audio":
                return (
                    <div key={component.id}>
                        <Spacer />
                        <UserAudioItem
                            key={component.id}
                            id={component.id}
                            audioUrl={component.audioUrl}
                            audioName={component.audioName}
                            themeColor={themeColor || ""}
                            status={component.status}
                        />
                        <Spacer />
                    </div>
                );
            case "bot-audio":
                return (
                    <div key={component.id}>
                        <Spacer />
                        <AudioItem
                            id={component.id}
                            audioUrl={component.audioUrl}
                            audioName={component.audioName}
                        />
                        <Spacer />
                    </div>
                );
            case "bot-text":
                return (
                    <div key={component.id}>
                        <BotTextEntry
                            id={component.id}
                            words={component.text}
                        />
                        <Spacer />
                    </div>
                );
            case "bot-text-streaming":
                return (
                    <div key={component.id}>
                        <BotTextStreamingEntry
                            id={component.id}
                            words={component.text}
                        />
                        <Spacer />
                    </div>
                );
            case "user-text":
                return (
                    <div key={component.id}>
                        <UserTextItem
                            id={component.id}
                            words={component.text}
                            themeColor={themeColor}
                        />
                        <Spacer />
                    </div>
                );
            case "user-document":
                return (
                    <div key={component.id}>
                        <UserDocumentItem
                            id={component.id}
                            isPdf={component.isPdf}
                            documentUrl={component.documentUrl}
                            documentName={component.documentName}
                            themeColor={themeColor}
                            status={component.status}
                        />
                        <Spacer />
                    </div>
                );
            case "bot-button":
                return (
                    <div key={component.id}>
                        <ButtonItem
                            id={component.id}
                            conversationUrl={component.conversationUrl}
                            buttonLabel={component.buttonLabel}
                            themeColor={themeColor}
                        />
                        <Spacer />
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <BotTalkContext.Provider
            value={{
                switchBotTalk: switchTalk,
            }}>
            <div
                ref={chatBoxRef}
                style={{
                    height: "80%",
                    overflowY: "auto",
                    display: "flex",
                    flexDirection: "column",
                    fontSize: fontSize,
                }}>
                <div style={{ maxHeight: "100%" }}>
                    {renderedChatItems.map(component =>
                        renderComponent(component)
                    )}
                    {showLoader && (
                        <div style={{ textAlign: "left" }}>
                            <div
                                style={{ backgroundColor: themeColor }}
                                className="pulsing-cursor"
                            />
                            <br />
                        </div>
                    )}
                </div>
            </div>
            <div
                style={{
                    height: "30px",
                    display: "flex",
                    justifyContent: "flex-start",
                    marginTop: "5px",
                }}>
                <span
                    style={{
                        width: "150px",
                        textAlign: "left",
                        marginLeft: "5%",
                    }}>
                    <OriginVisualizer origin={origin || "N/A"} />
                </span>
            </div>
        </BotTalkContext.Provider>
    );
};

export default ChatBox;
