export interface BaseChatItemConfig {
    id: string;
    type: 'audio' | 'button' | 'stream' | 'audio-input' | 'text-input' | 'document-input';
}

export interface AudioItemConfig extends BaseChatItemConfig {
    type: 'audio';
    audioUrl: string;
    audioName: string;
}

export interface ButtonItemConfig extends BaseChatItemConfig {
    type: 'button';
    conversationUrl: string;
    buttonLabel: string;
}

export interface StreamItemConfig extends BaseChatItemConfig {
    type: 'stream';
    text: string;
    isCompleted: boolean;
    origin: string;
}

export interface TextInputItemConfig extends BaseChatItemConfig {
    type: 'text-input';
    text: string;
}

export interface AudioInputItemConfig extends BaseChatItemConfig {
    type: 'audio-input';
    audioUrl: string;
    audioName: string;
}

export interface DocumentInputItemConfig extends BaseChatItemConfig {
    type: 'document-input';
    isPdf: boolean;
    documentUrl: string;
    documentName: string;
}

export type ChatItemConfig = AudioItemConfig | ButtonItemConfig | StreamItemConfig | TextInputItemConfig | AudioInputItemConfig | DocumentInputItemConfig;