import React, { useState, useRef } from 'react';
import { ChatItemConfig } from './chat-items/TalkItemsConfig';

interface VoiceRecorderProps {
    inputRetriever: (answer: ChatItemConfig) => void;
    themeColor: string;
}

const VoiceRecorder: React.FC<VoiceRecorderProps> = ({inputRetriever}) => {
  const [recording, setRecording] = useState<boolean>(false);
  const audioStreamRef = useRef<MediaStream | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const recordingTimeoutRef = useRef<number | null>(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioStreamRef.current = stream;
      const recorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });
      mediaRecorderRef.current = recorder;
      audioChunksRef.current = [];  
      setRecording(true);
    
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
            audioChunksRef.current.push(e.data);
        }
      };
      recorder.start();
      window.addEventListener('mouseup', stopRecording);
      window.addEventListener('touchend', stopRecording);
    } catch (err) {
      alert('mic doesn\'t work :(');
      console.error('Error accessing microphone:', err);
    }
  };

  const handleMouseDown = () => {
    recordingTimeoutRef.current = window.setTimeout(() => {
      startRecording();
    }, 100);
  };

  const stopRecording = () => {
    if (recordingTimeoutRef.current) {
        clearTimeout(recordingTimeoutRef.current);
    }
    const recorder = mediaRecorderRef.current;
    if (recorder && recorder.state !== 'inactive') {
      recorder.stop();
      setRecording(false);

      audioStreamRef.current?.getTracks().forEach((track) => track.stop());

      recorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });

        const newAudioURL = URL.createObjectURL(audioBlob);
        inputRetriever({id: "init-" + Date.now(), type: 'audio', audioUrl: newAudioURL, audioName: 'recording-'+Date.now()});
        window.removeEventListener('mouseup', stopRecording);
        window.removeEventListener('touchend', stopRecording);
      };
    }
  };

  return (
    <div style={{position:'relative', width: '50px'}}>  
      <button
        className= {recording ? 'pulsing-record-button' : ''}
        style={{
          position: 'absolute',
          left: '0%',
          padding: '10px',
          border: `3px solid red`,
          borderColor: 'red',
          marginRight: '1vw',
          color: 'red',
          borderRadius: '25px',
          outline: 'none',
        }}
        onMouseDown={handleMouseDown}
        onMouseUp={stopRecording}
        onTouchStart={handleMouseDown}
        onTouchEnd={stopRecording}
      >
        🎙️
      </button>
    </div>
  );
};

export default VoiceRecorder;
