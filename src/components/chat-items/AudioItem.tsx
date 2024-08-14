interface AudioItemProps {
    id: string;
    audioUrl: string;
    audioName: string;
  }

const AudioItem: React.FC<AudioItemProps> = ({ id, audioUrl, audioName }) => {
  
    return (
          <div key={id} className="loading">
            <audio src={audioUrl} controls />
            <input type="hidden" src={audioName}/>
          </div>      
    );
};

export default AudioItem;