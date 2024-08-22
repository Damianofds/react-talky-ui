interface UserAudioItemProps {
  id: string;
  audioUrl: string;
  audioName: string;
  themeColor: string;
}

const UserAudioItem: React.FC<UserAudioItemProps> = ({ id, audioUrl, audioName, themeColor }) => {

  return (
    <div key={id}  style={{
      textAlign: 'right'
    }}>
      <audio style={{ border: `3px solid ${themeColor}`, borderRadius: '20px' }} src={audioUrl} controls />
      <input type="hidden" src={audioName} />
    </div>
  );
};

export default UserAudioItem;