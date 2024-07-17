interface BaseConversationItemConfig {
    id: string;
    type: 'audio' | 'text';
}

export interface AudioItemConfig extends BaseConversationItemConfig {
    type: 'audio';
    audioUrl: string;
    audioName: string;
}

export interface TextItemConfig extends BaseConversationItemConfig {
    type: 'text';
    text: string;
}

export type ConversationItemConfig = AudioItemConfig | TextItemConfig;