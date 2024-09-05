interface BotTextEntryProps {
    id: string;
    words: string;
}

const BotTextEntry: React.FC<BotTextEntryProps> = ({ words }) => {
    return (
        <div
            style={{
                padding: "0.1vh 0.1vw 0.1vh 0.1vw",
                paddingLeft: "20px",
            }}
            key={"" + Date.now}>
            {words == "" ? "|" : words}
        </div>
    );
};

export default BotTextEntry;
