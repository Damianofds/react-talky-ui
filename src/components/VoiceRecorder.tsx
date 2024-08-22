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
        console.log('1')
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      console.log('2')
      audioStreamRef.current = stream;
      console.log('3')
      const recorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });
      console.log('4')
      mediaRecorderRef.current = recorder;
      console.log('5')
      audioChunksRef.current = [];
      console.log('6')
      setRecording(true);
      console.log('7')

      recorder.ondataavailable = (e) => {
        console.log('if-1')
        if (e.data.size > 0) {
            console.log('if-2')
            audioChunksRef.current.push(e.data);
        }
      };
      console.log('8')
      recorder.start();
      console.log('9')
      window.addEventListener('mouseup', stopRecording);
      console.log('10')
    } catch (err) {
      alert('mic doesn\'t work :(');
      console.error('Error accessing microphone:', err);
    }
  };

  const handleMouseDown = () => {
    recordingTimeoutRef.current = window.setTimeout(() => {
      startRecording();
    }, 200);
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
      };
    }
  };

  return (
    <div>
      <button
        className= {recording ? 'pulsing-record-button' : ''}
        style={{
          padding: '10px',
          border: `3px solid red`,
          borderColor: 'red',
          marginRight: '1vw',
          color: 'red',
          borderRadius: '25px',
          outline: 'none'
        }}
        onMouseDown={handleMouseDown}
        onMouseUp={stopRecording}
      >
        🎙️
      </button>
    </div>
  );
};

export default VoiceRecorder;
