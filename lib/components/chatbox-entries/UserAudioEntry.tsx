import ElaboratingIcon from "../icons/ElaboratingIcon";
import ElaborationSuccessIcon from "../icons/ElaborationSuccessIcon";
import { UploadStatus } from "./ChatEntryState";

interface UserAudioEntryProps {
    id: string;
    audioUrl: string;
    audioName: string;
    themeColor: string;
    status: UploadStatus;
}

const UserAudioEntry: React.FC<UserAudioEntryProps> = ({
    id,
    audioUrl,
    audioName,
    themeColor,
    status,
}) => {
    return (
        <div
            key={id}
            style={{
                textAlign: "right",
            }}>
            <audio
                data-testid="user-audio"
                style={{
                    border: `3px solid ${themeColor}`,
                    borderRadius: "30px",
                }}
                src={audioUrl}
                controls
            />
            <input
                type="hidden"
                data-testid="user-audio-input"
                src={audioName}
            />
            <div>
                {status == UploadStatus.PROCESSING && (
                    <ElaboratingIcon color="red" />
                )}
                {status == UploadStatus.SUCCESS && (
                    <ElaborationSuccessIcon color="red" />
                )}
            </div>
        </div>
    );
};

export default UserAudioEntry;
