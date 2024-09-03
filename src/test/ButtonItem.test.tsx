import { render, screen, fireEvent } from "@testing-library/react";
import ButtonItem from "../components/chat-items/ButtonItem";
import { ConversationContext } from "../components/ConversationContext";
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
            <ConversationContext.Provider
                value={{ switchConversation: mockSwitchConversation }}>
                <ButtonItem {...props} />
            </ConversationContext.Provider>
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

    test("changes border color on focus and blur", () => {
        renderWithContext();
        const button = screen.getByRole("button");

        fireEvent.focus(button);
        expect(button).toHaveStyle(`border-color: ${defaultProps.themeColor}`);

        fireEvent.blur(button);
        expect(button).toHaveStyle("border-color: transparent");
    });

    test("changes border color on hover and mouse leave", () => {
        renderWithContext();
        const button = screen.getByRole("button");

        fireEvent.mouseEnter(button);
        expect(button).toHaveStyle(`border-color: ${defaultProps.themeColor}`);

        fireEvent.mouseLeave(button);
        expect(button).toHaveStyle("border-color: transparent");
    });

    test("keeps border color when focused and mouse leaves", () => {
        renderWithContext();
        const button = screen.getByRole("button");

        fireEvent.focus(button);
        fireEvent.mouseLeave(button);
        expect(button).toHaveStyle(`border-color: ${defaultProps.themeColor}`);

        fireEvent.blur(button);
        expect(button).toHaveStyle("border-color: transparent");
    });
});
