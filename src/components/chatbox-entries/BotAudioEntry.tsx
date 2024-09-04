interface BotAudioEntryProps {
    id: string;
    audioUrl: string;
    audioName: string;
}

const BotAudioEntry: React.FC<BotAudioEntryProps> = ({ id, audioUrl, audioName }) => {
    return (
        <div key={id} style={{}}>
            <audio src={audioUrl} controls />
            <input type="hidden" src={audioName} />
        </div>
    );
};

export default BotAudioEntry;
