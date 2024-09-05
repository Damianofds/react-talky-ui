export interface BaseChatEntryState {
    id: string;
    type:
        | "bot-text"
        | "bot-audio"
        | "bot-button"
        | "user-text"
        | "user-audio"
        | "user-document";
}

export interface UploadEntryState extends BaseChatEntryState {
    status: UploadStatus;
}

export interface BotAudioEntryState extends BaseChatEntryState {
    type: "bot-audio";
    audioUrl: string;
    audioName: string;
}

export interface BotButtonEntryState extends BaseChatEntryState {
    type: "bot-button";
    conversationUrl: string;
    buttonLabel: string;
}

export interface BotTextEntryState extends BaseChatEntryState {
    type: "bot-text";
    text: string;
    isCompleted: boolean;
    origin: string;
}

export interface UserTextEntryState extends BaseChatEntryState {
    type: "user-text";
    text: string;
}

export interface UserAudioEntryState extends UploadEntryState {
    type: "user-audio";
    audioUrl: string;
    audioName: string;
}

export interface UserDocumentEntryState extends UploadEntryState {
    type: "user-document";
    isPdf: boolean;
    documentUrl: string;
    documentName: string;
}

export enum UploadStatus {
    PROCESSING = "processing",
    SUCCESS = "success",
    FAILURE = "failure",
}

export type ChatEntryState =
    | BotAudioEntryState
    | BotButtonEntryState
    | BotTextEntryState
    | UserTextEntryState
    | UserAudioEntryState
    | UserDocumentEntryState;
