interface AudioItemProps {
  id: string;
  audioUrl: string;
  audioName: string;
  themeColor: string;
}

const AudioItem: React.FC<AudioItemProps> = ({ id, audioUrl, audioName, themeColor }) => {

  return (
    <div key={id} className="loading" style={{
      // maxWidth: '50%',
      textAlign: 'right',
    }}>
      <audio style={{ border: `3px solid ${themeColor}`, borderRadius: '20px' }} src={audioUrl} controls />
      <input type="hidden" src={audioName} />
    </div>
  );
};

export default AudioItem;