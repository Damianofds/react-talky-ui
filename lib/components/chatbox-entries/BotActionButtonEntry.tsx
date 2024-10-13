import useUserSession from "../../hooks/useLoadUserSession";

interface BotActionButtonEntryProps {
    id: string;
    actionUrl: string;
    actionMethod: "POST" | "DELETE"
    buttonLabel: string;
    themeColor?: string;
}

const BotActionButtonEntry: React.FC<BotActionButtonEntryProps> = ({
    actionUrl,
    buttonLabel,
    themeColor = "#4ea699",
}) => {

    const { deleteUserSession } = useUserSession();

    const handleClick: React.MouseEventHandler<HTMLButtonElement> = () => {
        deleteUserSession(actionUrl).then(() =>
            window.location.reload()
        );
    };

    return (
            <button
                style={{
                    fontFamily: "inherit",
                    cursor: "pointer",
                    textAlign: "center",
                    borderRadius: "25px",
                    padding: "0.6em 1.2em",
                    fontSize: "1em",
                    fontWeight: "500",
                    marginTop: "1vh",
                    marginBottom: "1vh",
                    marginRight: "1vw",
                    border: `2px solid gray`,
                    transition: "border-color 0.3s ease-in-out",
                    backgroundColor: "red"
                }}
                onClick={handleClick}
                onMouseEnter={e =>
                    (e.currentTarget.style.borderColor = themeColor)
                }
                onMouseLeave={e =>
                    (e.currentTarget.style.borderColor = "gray")
                }>
                {buttonLabel}
            </button>
    );
};

export default BotActionButtonEntry;
