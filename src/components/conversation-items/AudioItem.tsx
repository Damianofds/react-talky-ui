import { useCallback, useEffect, useState } from "react";

interface AudioItemProps {
    id: string;
    audioUrl: string;
    audioName: string;
  }

const AudioItem: React.FC<AudioItemProps> = ({ id, audioUrl, audioName }) => {
  
    return (
          <div key={id}>
            <audio src={audioUrl} controls />
            <div>{audioName}</div>
          </div>      
    );
};

export default AudioItem;