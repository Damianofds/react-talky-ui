import { render, screen, fireEvent } from "@testing-library/react";
import ButtonItem from "../../lib/components/chatbox-entries/BotButtonEntry";
import { BotTalkContext } from "../../lib/components/BotTalkContext";
import "@testing-library/jest-dom";
import { afterEach, describe, expect, test, vi } from "vitest";

describe("ButtonItem Component", () => {
    const mockSwitchConversation = vi.fn();

    const defaultProps = {
        id: "test-button",
        conversationUrl: "http://example.com",
        buttonLabel: "Click me",
        themeColor: "#4ea699",
    };

    const renderWithContext = (props = defaultProps) => {
        return render(
            <BotTalkContext.Provider
                value={{ switchBotTalk: mockSwitchConversation }}>
                <ButtonItem {...props} />
            </BotTalkContext.Provider>
        );
    };

    afterEach(() => {
        vi.clearAllMocks();
    });

    test("renders the button with correct label", () => {
        renderWithContext();
        const button = screen.getByRole("button", {
            name: defaultProps.buttonLabel,
        });
        expect(button).toBeInTheDocument();
    });

    test("calls switchConversation when clicked", () => {
        renderWithContext();
        const button = screen.getByRole("button");

        fireEvent.click(button);

        expect(mockSwitchConversation).toHaveBeenCalledWith(
            defaultProps.conversationUrl
        );
    });

    test("changes border color on hover and mouse leave", () => {
        renderWithContext();
        const button = screen.getByRole("button");

        fireEvent.mouseEnter(button);
        expect(button).toHaveStyle(`border-color: ${defaultProps.themeColor}`);

        fireEvent.mouseLeave(button);
        expect(button).toHaveStyle("border-color: gray");
    });

});
