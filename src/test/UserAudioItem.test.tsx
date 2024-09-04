import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import UserAudioItem from "../components/chatbox-entries/UserAudioEntry";
import { UploadStatus } from "../components/chatbox-entries/ChatEntryState";
import { describe, expect, test } from "vitest";

describe("UserAudioItem component", () => {
    const defaultProps = {
        id: "audio-1",
        audioUrl: "https://example.com/audio.mp3",
        audioName: "Test Audio",
        themeColor: "blue",
        status: UploadStatus.SUCCESS,
    };

    test("renders audio player with correct source and style", () => {
        render(<UserAudioItem {...defaultProps} />);

        const audioElement = screen.getByTestId("user-audio");
        expect(audioElement).toHaveAttribute("src", defaultProps.audioUrl);
        expect(audioElement).toHaveStyle({
            border: `3px solid ${defaultProps.themeColor}`,
            borderRadius: "30px",
        });
    });

    test("renders the hidden input with correct value", () => {
        render(<UserAudioItem {...defaultProps} />);

        const hiddenInput = screen.getByTestId("user-audio-input");
        expect(hiddenInput).toHaveAttribute("src", defaultProps.audioName);
    });

    test("displays elaborating icon when status is PROCESSING", () => {
        const processingProps = {
            ...defaultProps,
            status: UploadStatus.PROCESSING,
        };
        render(<UserAudioItem {...processingProps} />);

        expect(screen.getByTestId("elaborating-icon")).toBeInTheDocument();
    });

    test("displays success icon when status is SUCCESS", () => {
        render(<UserAudioItem {...defaultProps} />);

        expect(
            screen.getByTestId("elaboration-success-icon")
        ).toBeInTheDocument();
    });
});
