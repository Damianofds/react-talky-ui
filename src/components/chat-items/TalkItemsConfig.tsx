export interface BaseChatItemConfig {
    id: string;
    type: 'audio' | 'button' | 'input' | 'stream';
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
}

export interface InputItemConfig extends BaseChatItemConfig {
    type: 'input';
    text: string;
}

export type ChatItemConfig = AudioItemConfig | ButtonItemConfig | StreamItemConfig | InputItemConfig;