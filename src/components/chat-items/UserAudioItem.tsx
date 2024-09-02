import ElaboratingIcon from "../icons/ElaboratingIcon";
import ElaborationSuccessIcon from "../icons/ElaborationSuccessIcon";
import { UploadStatus } from "./ChatItemConfig";

interface UserAudioItemProps {
  id: string;
  audioUrl: string;
  audioName: string;
  themeColor: string;
  status: UploadStatus;
}

const UserAudioItem: React.FC<UserAudioItemProps> = ({ id, audioUrl, audioName, themeColor, status }) => {

  return (
    <div key={id}  style={{
      textAlign: 'right'
    }}>
      <audio style={{ border: `3px solid ${themeColor}`, borderRadius: '30px' }} src={audioUrl} controls />
      <input type="hidden" src={audioName} />
      <div>
        {status == UploadStatus.PROCESSING && <ElaboratingIcon color='red'/>}
        {status == UploadStatus.SUCCESS && <ElaborationSuccessIcon color='red'/>}
      </div>
    </div>
  );
};

export default UserAudioItem;