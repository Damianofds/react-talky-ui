import React, { useState, useRef, useEffect } from "react";
import {
    BaseUploadItemConfig,
    ChatItemConfig,
    StreamItemConfig,
    UploadStatus,
} from "./chat-items/ChatItemConfig";
import UserAudioItem from "./chat-items/UserAudioItem";
import ButtonItem from "./chat-items/ButtonItem";
import UserTextItem from "./chat-items/UserTextItem";
import StreamItem from "./chat-items/StreamItem";
import useLoadChatHistoty from "../hooks/useLoadChatHistory";
import useBotTalk from "../hooks/useBotTalk";
import { ConversationContext } from "./ConversationContext";
import ClearStorageButton from "./utils/ClearStorageButton";
import OriginVisualizer from "./utils/OriginVisualizer";
import AudioItem from "./chat-items/AudioItem";
import UserDocumentItem from "./chat-items/UserDocumentItem";

interface ChatBoxProps {
    initTalkURL: string;
    message?: ChatItemConfig;
    updateStatus?: string | undefined;
    fontSize?: string;
    themeColor?: string;
}

const ChatBox: React.FC<ChatBoxProps> = ({
    initTalkURL,
    message,
    updateStatus,
    fontSize,
    themeColor,
}) => {
    const [currentTalkURL, setCurrentTalkURL] = useState(initTalkURL);
    const { talkCurrentItem, isLastItem } = useBotTalk(currentTalkURL);
    const localChat = useLoadChatHistoty();
    const [renderedChatItems, setRenderedChatItems] = useState<
        ChatItemConfig[]
    >([]);
    const [showLoader, setShowLoader] = useState(false);
    const chatBoxRef = useRef<HTMLDivElement>(null);
    const [isStreamingStarted, setStreamingStarted] = useState<boolean>(false);
    const [isChatBoxInitialized, setChatBoxInitialized] =
        useState<boolean>(false);
    const [isTalkSwitched, setTalkSwitched] = useState<boolean>(false);
    const [origin, setOrigin] = useState<string>();
    const { loadLocalChat, saveLocalChatHistory } = useLoadChatHistoty();

    const switchTalk = (newTalkURL: string) => {
        setCurrentTalkURL(newTalkURL);
        setTalkSwitched(true);
    };

    const loadStaticTalk = (talkCurrentItem: ChatItemConfig) => {
        if (isStreamingStarted) {
            setRenderedChatItems(prev => [...prev.slice(0, -1)]);
        }
        setRenderedChatItems(prev => [...prev, talkCurrentItem]);
        if (talkCurrentItem.type == "stream") {
            setStreamingStarted(() => true);
        }
        if (talkCurrentItem.type == "stream" && talkCurrentItem.isCompleted) {
            setStreamingStarted(() => false);
            if (isLastItem) {
                setChatBoxInitialized(true);
                saveLocalChatHistory([
                    ...renderedChatItems.slice(0, -1),
                    talkCurrentItem,
                ]);
            }
        }
        if (talkCurrentItem.type != "stream") {
            // TODO this branch was never tested cause we have only streams in static talks for now
            if (isLastItem) {
                setChatBoxInitialized(true);
                saveLocalChatHistory([...renderedChatItems]);
            }
        }
    };

    const handleAIMessage = () => {
        const item = message;
        if (item && !((item as StreamItemConfig).text == "  undefined")) {
            // TODO This really sucks
            if (item.type == "stream") {
                if (isStreamingStarted) {
                    setOrigin(item.origin);
                    setRenderedChatItems(prev => [...prev.slice(0, -1)]);
                }
                setRenderedChatItems(prev => [...prev, item]);
                saveLocalChatHistory(renderedChatItems);
                if (item.isCompleted) {
                    setStreamingStarted(false);
                    setShowLoader(true);
                } else {
                    setStreamingStarted(true);
                }
            } else {
                setRenderedChatItems(prev => [...prev, item]);
                saveLocalChatHistory(renderedChatItems);
                setStreamingStarted(false);
                setShowLoader(true);
            }
        }
    };

    const updateEntryStatus = (id: string) => {
        const updatedRenderedChatItems = renderedChatItems.map(item => {
            if (item.id === id) {
                return {
                    ...item,
                    status: UploadStatus.SUCCESS,
                };
            }
            return item;
        });
        setRenderedChatItems(updatedRenderedChatItems);
        saveLocalChatHistory(updatedRenderedChatItems);
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
    }, [renderedChatItems, message]);

    useEffect(() => {
        const messageIsNotEmpty =
            message &&
            ((message as StreamItemConfig).text != "" ||
                (message as BaseUploadItemConfig).status == "processing");
        if (messageIsNotEmpty) {
            setShowLoader(false);
            handleAIMessage();
        }
    }, [message]);

    useEffect(() => {
        if (updateStatus) {
            updateEntryStatus(updateStatus);
        }
    }, [updateStatus]);

    useEffect(() => {
        setShowLoader(true);
    }, [isChatBoxInitialized]);

    const renderComponent = (component: ChatItemConfig) => {
        switch (component.type) {
            case "audio-input":
                return (
                    <UserAudioItem
                        key={component.id}
                        id={component.id}
                        audioUrl={component.audioUrl}
                        audioName={component.audioName}
                        themeColor={themeColor || ""}
                        status={component.status}
                    />
                );
            case "audio":
                return (
                    <AudioItem
                        key={component.id}
                        id={component.id}
                        audioUrl={component.audioUrl}
                        audioName={component.audioName}
                    />
                );
            case "stream":
                return (
                    <StreamItem
                        key={component.id}
                        id={component.id}
                        words={component.text}
                    />
                );
            case "text-input":
                return (
                    <UserTextItem
                        key={component.id}
                        id={component.id}
                        words={component.text}
                        themeColor={themeColor}
                    />
                );
            case "document-input":
                return (
                    <UserDocumentItem
                        key={component.id}
                        id={component.id}
                        isPdf={component.isPdf}
                        documentUrl={component.documentUrl}
                        documentName={component.documentName}
                        themeColor={themeColor}
                        status={component.status}
                    />
                );
            case "button":
                return (
                    <ButtonItem
                        key={component.id}
                        id={component.id}
                        conversationUrl={component.conversationUrl}
                        buttonLabel={component.buttonLabel}
                        themeColor={themeColor}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <ConversationContext.Provider
            value={{
                switchConversation: switchTalk,
            }}>
            <div
                ref={chatBoxRef}
                style={{
                    height: "100%",
                    overflowY: "auto",
                    textAlign: "left",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                    fontSize: fontSize,
                }}>
                <div style={{ maxHeight: "100%" }}>
                    {renderedChatItems.map(component =>
                        renderComponent(component)
                    )}
                    {showLoader && (
                        <div>
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
                <span style={{ width: "100px", textAlign: "left" }}>
                    <ClearStorageButton color={themeColor || ""} />
                </span>
            </div>
        </ConversationContext.Provider>
    );
};

export default ChatBox;
