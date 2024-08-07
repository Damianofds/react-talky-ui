export interface BaseConversationItemConfig {
    id: string;
    type: 'audio' | 'text' | 'button';
}

export interface AudioItemConfig extends BaseConversationItemConfig {
    type: 'audio';
    audioUrl: string;
    audioName: string;
}

export interface ButtonItemConfig extends BaseConversationItemConfig {
    type: 'button';
    conversationUrl: string;
    buttonLabel: string;
}

export interface TextItemConfig extends BaseConversationItemConfig {
    type: 'text';
    text: string;
}

export type ConversationItemConfig = AudioItemConfig | ButtonItemConfig | TextItemConfig;