import React, { useState, useRef, useEffect, useContext } from "react";
import { ChatEntryState, UploadStatus } from "../chatbox-entries/ChatEntryState";
import Record from "../icons/MicrophoneIcon";
import useUserAudioSubmit from "../../../lib/hooks/useUserAudioSubmit";
import styles from "../../index.module.css";
import { BotTalkContext } from "../../components/BotTalkContext";
import useUserSession from "../../hooks/useLoadUserSession";


interface VoiceRecorderProps {
    setChatMessage: (answer: ChatEntryState) => void;
    setBotStatusUpdate: (update: {
        entryId: string;
        outcome: UploadStatus;
    }) => void;

    themeColor: string;
}

const AudioSubmit: React.FC<VoiceRecorderProps> = ({
    setChatMessage,
    setBotStatusUpdate,
}) => {
    const [recording, setRecording] = useState<boolean>(false);
    const audioStreamRef = useRef<MediaStream | null>(null);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const audioChunksRef = useRef<Blob[]>([]);
    const recordingTimeoutRef = useRef<number | null>(null);
    const { /*uploadStatus,*/ uploadAudio } = useUserAudioSubmit();
    const { switchBotTalk: switchConversation } = useContext(BotTalkContext);
    const { loadUserSession } = useUserSession();
    const [isPermissionGranted, setIsPermissionGranted] = useState<"granted" | "denied" | "prompt">("prompt");

    const checkMicrophonePermission = async () => {
        try {
            const permissionStatus = await navigator.permissions.query({ name: "microphone" as PermissionName });
            setIsPermissionGranted(permissionStatus.state);

            // Listen for changes in permission status (optional)
            permissionStatus.onchange = () => {
                setIsPermissionGranted(permissionStatus.state);
            };
        } catch (error) {
            console.error("Error checking microphone permissions:", error);
        }
    };

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: true,
            });
            audioStreamRef.current = stream;
            const recorder = new MediaRecorder(stream, {
                mimeType: "audio/webm",
            });
            mediaRecorderRef.current = recorder;
            audioChunksRef.current = [];
            setRecording(true);

            recorder.ondataavailable = e => {
                if (e.data.size > 0) {
                    audioChunksRef.current.push(e.data);
                }
            };
            recorder.start();
            window.addEventListener("mouseup", stopRecording);
            window.addEventListener("touchend", stopRecording);
        } catch (err) {
            alert("The Microphone doesn't work :(");
            console.error("Error accessing microphone:", err);
        }
    };

    const handleMouseDown = () => {
        if(isPermissionGranted == "granted"){
            recordingTimeoutRef.current = window.setTimeout(() => {
                startRecording();
            }, 100);
        } else if (isPermissionGranted == "prompt") {
            navigator.mediaDevices.getUserMedia({
                audio: true,
            });
        } else{
            alert("You need to allow the browser to use the microphone");
        }
        
    };

    const stopRecording = () => {
        if (recordingTimeoutRef.current) {
            clearTimeout(recordingTimeoutRef.current);
        }
        const recorder = mediaRecorderRef.current;
        if (recorder && recorder.state !== "inactive") {
            recorder.stop();
            setRecording(false);

            audioStreamRef.current?.getTracks().forEach(track => track.stop());

            recorder.onstop = async () => {
                const audioBlob = new Blob(audioChunksRef.current, {
                    type: "audio/webm",
                });
                const newAudioURL = URL.createObjectURL(audioBlob);
                const audioFile = new File([audioBlob], "recording.webm", {
                    type: "audio/webm",
                });
                const documentId = "init-" + Date.now();
                setChatMessage({
                    id: documentId,
                    type: "user-audio",
                    audioUrl: newAudioURL,
                    audioName: "recording-" + Date.now(),
                    status: UploadStatus.PROCESSING,
                });
                window.removeEventListener("mouseup", stopRecording);
                window.removeEventListener("touchend", stopRecording);
                const userSession = loadUserSession();
                const uploadResult = await uploadAudio(audioFile, userSession?.userId);
                const outcome =
                    uploadResult.httpStatusCode &&
                    uploadResult.httpStatusCode >= 200 &&
                    uploadResult.httpStatusCode < 300
                        ? UploadStatus.SUCCESS
                        : UploadStatus.FAILURE;
                
                if(outcome == UploadStatus.SUCCESS){
                    switchConversation('https://n8n.orose.gold/webhook/4a0882d1-da22-402c-886e-729a01cf0ccd/users/' + userSession?.userId + '/audios/' + uploadResult.message + '/formats/talk1');
                }
                setBotStatusUpdate({entryId: documentId, outcome: UploadStatus.SUCCESS});
            };
        }
    };

    useEffect(() => {
        checkMicrophonePermission();
    }, []);

    return (
        <div style={{ position: "relative", width: "50px" }}>
            <button
                className={recording ? styles.pulsingRecordButton : ""}
                style={{
                    position: "absolute",
                    left: "0%",
                    padding: "6px",
                    paddingLeft: "9px",
                    paddingRight: "9px",
                    border: `3px solid red`,
                    borderColor: "red",
                    marginRight: "1vw",
                    color: "red",
                    borderRadius: "25px",
                    outline: "none",
                }}
                onMouseDown={handleMouseDown}
                onMouseUp={stopRecording}
                onTouchStart={handleMouseDown}
                onTouchEnd={stopRecording}>
                <Record color={recording ? "white" : "red"} height="23px" />
            </button>
        </div>
    );
};

export default AudioSubmit;
