interface AudioItemProps {
    id: string;
    audioUrl: string;
    audioName: string;
  }

const AudioItem: React.FC<AudioItemProps> = ({ id, audioUrl, audioName }) => {
  
    return (
          <div key={id} className="loading">
            <audio src={audioUrl} controls />
            {/* <div>{audioName}</div> */}
          </div>      
    );
};

export default AudioItem;