import React, { useState, useEffect } from "react";

interface BotTextStreamingEntryProps {
    id: string;
    words: string;
}

const BotTextStreamingEntry: React.FC<BotTextStreamingEntryProps> = ({ words }) => {
    const [displayedWords, setDisplayedWords] = useState<string[]>([]);
    const [index, Incrementindex] = useState(0);
    const wordArray = words.split(" ");

    useEffect(() => {
        if (wordArray.length === 0) return;

        const interval = setInterval(() => {
            setDisplayedWords((prevWords) => [...prevWords, wordArray[index]]);
            Incrementindex(index+1);

            if (index >= wordArray.length) {
                clearInterval(interval);
            }
        }, 100);

        return () => clearInterval(interval);
    }, [index]);

    return (
        <div
            style={{
                padding: "0.1vh 0.1vw 0.1vh 0.1vw",
                paddingLeft: "20px",
                textAlign: "left"
            }}
            key={"" + Date.now()}
        >
            {displayedWords.join(" ") || "|"}
        </div>
    );
};

export default BotTextStreamingEntry;
