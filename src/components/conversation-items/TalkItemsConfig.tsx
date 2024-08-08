export interface BaseChatItemConfig {
    id: string;
    type: 'audio' | 'text' | 'button' | 'input';
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

export interface TextItemConfig extends BaseChatItemConfig {
    type: 'text';
    text: string;
}

export interface InputItemConfig extends BaseChatItemConfig {
    type: 'input';
    text: string;
}

export type ChatItemConfig = AudioItemConfig | ButtonItemConfig | TextItemConfig | InputItemConfig;