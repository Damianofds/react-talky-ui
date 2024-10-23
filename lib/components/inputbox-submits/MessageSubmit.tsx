import { useContext, useEffect, useState } from "react";
import useRouteInputBoxValue from "../../../lib/hooks/useUserMessageSubmit";
import { CirclularStack, get } from "../utils/CircularStack";
import { ChatEntryState } from "../chatbox-entries/ChatEntryState";
import SandClock from "../icons/SandClockIcon";
import Send from "../icons/SendIcon";
import { BotTalkContext } from "../BotTalkContext";
import { NEW_NOTE_PLACEHOLDER } from "../chatbox-entries/BotDropdownEntry";

interface MessageSubmitProps {
    inputRetriever: (answer: ChatEntryState) => void;
    showBinarySubmitButtons: (showBinarySubmitButtons: boolean) => void;
    conversationRouteKeyword: string;
    qaRouteKeyword: string;
    fontSize?: string;
    themeColor?: string;
    inputBoxHistory: CirclularStack<string>;
    questionFromUI: string;
}

const MessageSubmit: React.FC<MessageSubmitProps> = ({
    inputRetriever,
    showBinarySubmitButtons,
    conversationRouteKeyword,
    qaRouteKeyword,
    fontSize,
    themeColor = "#000000",
    inputBoxHistory,
    questionFromUI,
}) => {
    const { setInputBoxQuestion: setInputBoxQuestion } = useContext(BotTalkContext);
    const [inputValue, setInputValue] = useState("");
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { answer, keywordRouting } = useRouteInputBoxValue(input);
    const [inputBoxHistoryCurrentIndex, setInputBoxHistoryCurrentIndex] =
        useState(0);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputBoxQuestion("");
        setInputValue(event.target.value);
        showBinarySubmitButtons(!!!event.target.value);
    };

    const handleOnFocus = (event: React.FocusEvent<HTMLInputElement>) => {
        event.target.style.borderColor = themeColor;
    };

    const handleOnMouseEnter = (event: React.MouseEvent<HTMLButtonElement>) => {
        (event.target as HTMLButtonElement).style.borderColor = themeColor;
    };

    const handleKeyPressed = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter" && inputValue != "") {
            setInput(inputValue);
            setInputValue("");
            inputRetriever({
                id: "user-text-" + Date.now(),
                text: inputValue,
                type: "user-text",
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

    const processInput = async () => {
        if (isLoading) {
            keywordRouting(input, conversationRouteKeyword, qaRouteKeyword);
        } else {
            setInput(inputValue);
            setInputValue("");
            inputRetriever({
                id: "user-text-" + Date.now(),
                text: inputValue,
                type: "user-text",
            });
            setIsLoading(true);
        }
    };

    useEffect(() => {
        if (answer) {
            inputRetriever(answer);
        }
        setInputValue("");
        setIsLoading(false);
        showBinarySubmitButtons(true);
    }, [answer]);

    useEffect(() => {
        if (isLoading) {
            processInput();
        }
    }, [isLoading]);

    useEffect(() => {
        if(questionFromUI){
            showBinarySubmitButtons(false);
        }
    }, [questionFromUI]);

    let placeholderFromUI ='Type your question!';
    if(questionFromUI == NEW_NOTE_PLACEHOLDER){
        questionFromUI = '';
        placeholderFromUI = 'Write the new note name...';
    }
    placeholderFromUI = isLoading ? "waiting for response..." : placeholderFromUI;

    return (
        <>
            <input
                type="text"
                value={questionFromUI || inputValue}
                onChange={handleInputChange}
                onFocus={handleOnFocus}
                disabled={isLoading}
                placeholder={placeholderFromUI}
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
            {(inputValue || questionFromUI || isLoading) && (
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
                            border: isLoading ? `3px solid gray` : `3px solid ${themeColor}`,
                            borderRadius: "25px",
                            outline: "none",
                        }}
                        title="or press enter">
                        {isLoading ? (
                            <SandClock color='gray' />
                        ) : (
                            <Send color={themeColor} />
                        )}
                    </button>
                </div>
            )}
        </>
    );
};

export default MessageSubmit;
