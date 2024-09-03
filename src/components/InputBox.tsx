import React, { useEffect, useState } from "react";
import useRouteInputBoxValue from "../hooks/useUserMessageSubmit";
import { ChatItemConfig } from "./chat-items/ChatItemConfig";
import { CirclularStack, get } from "./utils/CircularStack";
import VoiceRecorder from "./VoiceRecorder";
import Send from "./icons/Send";
import SandClock from "./icons/SandClock";
import DocumentUploader from "./DocumentUploader";

interface InputBoxProps {
    inputRetriever: (answer: ChatItemConfig) => void;
    successSetter: (id: string) => void;
    conversationRouteKeyword: string;
    qaRouteKeyword: string;
    fontSize?: string;
    themeColor?: string;
    inputBoxHistory: CirclularStack<string>;
}

const InputBox: React.FC<InputBoxProps> = ({
    inputRetriever,
    successSetter,
    conversationRouteKeyword,
    qaRouteKeyword,
    fontSize,
    themeColor = "",
    inputBoxHistory,
}) => {
    const [inputValue, setInputValue] = useState("");
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { answer, keywordRouting } = useRouteInputBoxValue(input);
    const [inputBoxHistoryCurrentIndex, setInputBoxHistoryCurrentIndex] =
        useState(0);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const handleKeyPressed = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter" && inputValue != "") {
            setInput(inputValue);
            inputRetriever({
                id: "init-" + Date.now(),
                text: inputValue,
                type: "text-input",
            });
            setIsLoading(true);
        }
        if (event.key === "ArrowUp") {
            const newValue = get(inputBoxHistory, inputBoxHistoryCurrentIndex);
            setInputValue(newValue || "");
            if (inputBoxHistoryCurrentIndex < inputBoxHistory.items.length) {
                setInputBoxHistoryCurrentIndex(inputBoxHistoryCurrentIndex + 1);
            } else {
                setInputBoxHistoryCurrentIndex(0);
            }
        }
        if (event.key === "ArrowDown") {
            const newValue = get(inputBoxHistory, inputBoxHistoryCurrentIndex);
            setInputValue(newValue || "");
            if (inputBoxHistoryCurrentIndex >= 0) {
                setInputBoxHistoryCurrentIndex(inputBoxHistoryCurrentIndex - 1);
            } else {
                setInputBoxHistoryCurrentIndex(
                    inputBoxHistory.items.length - 1
                );
            }
        }
    };

    const handleOnFocus = (event: React.FocusEvent<HTMLInputElement>) => {
        event.target.style.borderColor = themeColor;
    };

    const handleOnMouseEnter = (event: React.MouseEvent<HTMLButtonElement>) => {
        (event.target as HTMLButtonElement).style.borderColor = themeColor;
    };

    const processInput = async () => {
        if (isLoading) {
            keywordRouting(input, conversationRouteKeyword, qaRouteKeyword);
        } else {
            setInput(inputValue);
            inputRetriever({
                id: "init-" + Date.now(),
                text: inputValue,
                type: "text-input",
            });
            setIsLoading(true);
        }
    };

    useEffect(() => {
        if (answer) {
            inputRetriever(answer);
        }
        setIsLoading(false);
        setInputValue("");
    }, [answer]);

    useEffect(() => {
        if (isLoading) {
            processInput();
        }
    }, [isLoading]);

    return (
        <div>
            <div style={{ display: "flex", position: "relative" }}>
                <input
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    onFocus={handleOnFocus}
                    disabled={isLoading}
                    placeholder="Type your question!"
                    onKeyDown={handleKeyPressed}
                    style={{
                        border: "3px solid #ccc",
                        padding: "10px",
                        textAlign: "left",
                        flex: "9",
                        fontSize: fontSize,
                        height: "45px",
                        width: "100%",
                        boxSizing: "border-box",
                        marginRight: "1vw",
                        outline: "green",
                        borderRadius: "20px",
                        paddingLeft: "20px",
                    }}
                />
                {inputValue && (
                    <div style={{ position: "relative", width: "50px" }}>
                        <button
                            onClick={processInput}
                            onMouseEnter={handleOnMouseEnter}
                            style={{
                                position: "absolute",
                                left: "0%",
                                padding: "6px",
                                paddingLeft: "9px",
                                paddingRight: "9px",
                                marginRight: "1vw",
                                border: `3px solid ${themeColor}`,
                                borderRadius: "25px",
                                outline: "none",
                            }}
                            title="or press enter">
                            {isLoading ? (
                                <SandClock color={themeColor} />
                            ) : (
                                <Send color={themeColor} />
                            )}
                        </button>
                    </div>
                )}
                {isLoading ||
                    (!inputValue && (
                        <VoiceRecorder
                            inputRetriever={inputRetriever}
                            successSetter={successSetter}
                            themeColor={themeColor}
                        />
                    ))}
                <DocumentUploader
                    inputRetriever={inputRetriever}
                    successSetter={successSetter}
                    themeColor={themeColor}
                />
            </div>
        </div>
    );
};

export default InputBox;
