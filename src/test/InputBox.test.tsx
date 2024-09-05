import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import InputBox from "../../lib/components/InputBox";
import "@testing-library/jest-dom";
import { createCircularStack } from "../../lib/components/utils/CircularStack";

vi.mock("../../lib/components/inputbox-submits/MessageSubmit", () => ({
  default: ({ inputRetriever }: any) => (
    <button onClick={() => inputRetriever({ id: "123", text: "message" })}>
      MessageSubmit
    </button>
  ),
}));

vi.mock("../../lib/components/inputbox-submits/AudioSubmit", () => ({
  default: ({ setChatMessage }: any) => (
    <button onClick={() => setChatMessage({ id: "456", text: "audio" })}>
      AudioSubmit
    </button>
  ),
}));

vi.mock("../../lib/components/inputbox-submits/DocumentSubmit", () => ({
  default: ({ setChatMessage }: any) => (
    <button onClick={() => setChatMessage({ id: "789", text: "document" })}>
      DocumentSubmit
    </button>
  ),
}));

describe("InputBox Component", () => {
  const mockSetChatMessage = vi.fn();
  const mockSetBotStatusUpdate = vi.fn();
  const mockInputBoxHistory = createCircularStack<string>(10);

  const defaultProps = {
    setChatMessage: mockSetChatMessage,
    setBotStatusUpdate: mockSetBotStatusUpdate,
    conversationRouteKeyword: "conversation",
    qaRouteKeyword: "qa",
    fontSize: "16px",
    themeColor: "#ff0000",
    inputBoxHistory: mockInputBoxHistory,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders InputBox with MessageSubmit, AudioSubmit, and DocumentSubmit buttons", () => {
    render(<InputBox {...defaultProps} />);

    expect(screen.getByText("MessageSubmit")).toBeInTheDocument();
    expect(screen.getByText("AudioSubmit")).toBeInTheDocument();
    expect(screen.getByText("DocumentSubmit")).toBeInTheDocument();
  });

  it("calls setChatMessage with the correct message when MessageSubmit is clicked", () => {
    render(<InputBox {...defaultProps} />);

    fireEvent.click(screen.getByText("MessageSubmit"));

    expect(mockSetChatMessage).toHaveBeenCalledWith({ id: "123", text: "message" });
  });

  it("calls setChatMessage with the correct message when AudioSubmit is clicked", () => {
    render(<InputBox {...defaultProps} />);

    fireEvent.click(screen.getByText("AudioSubmit"));

    expect(mockSetChatMessage).toHaveBeenCalledWith({ id: "456", text: "audio" });
  });

  it("calls setChatMessage with the correct message when DocumentSubmit is clicked", () => {
    render(<InputBox {...defaultProps} />);

    fireEvent.click(screen.getByText("DocumentSubmit"));

    expect(mockSetChatMessage).toHaveBeenCalledWith({ id: "789", text: "document" });
  });

  it("toggles showBinarySubmitButtons state and conditionally renders AudioSubmit and DocumentSubmit", () => {
    render(<InputBox {...defaultProps} />);

    expect(screen.getByText("AudioSubmit")).toBeInTheDocument();
    expect(screen.getByText("DocumentSubmit")).toBeInTheDocument();

    fireEvent.click(screen.getByText("MessageSubmit"));

    expect(screen.getByText("AudioSubmit")).toBeInTheDocument();
    expect(screen.getByText("DocumentSubmit")).toBeInTheDocument();
  });
});
