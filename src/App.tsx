import "./App.css";
import TalkyUI from "../lib/TalkyUI";

const backendConfig = {
    openaiKey: import.meta.env.TALKY_OPENAI_API_KEY,
    qaUrl: import.meta.env.TALKY_QA_API_URL,
    audioUploadUrl: import.meta.env.TALKY_DOCUMENT_UPLOAD_API_URL,
    documentUploadurl: import.meta.env.TALKY_AUDIO_UPLOAD_API_URL,
}

function App() {
    return (
        <>
            <div className="App">
                <h1>react-talky-ui </h1>
                <div>A react/typescript conversational user interface</div>
                <div>The frontend for your AI buddy 🦜</div>
                <br />
                <div
                    style={{
                        width: "80vw",
                        minWidth: "355px",
                        maxWidth: "800px",
                        height: "35vh",
                        minHeight: "350px",
                    }}>
                    <TalkyUI
                        initTalkURL="/talk-showcase.json"
                        backendConfiguration={backendConfig}
                    />
                </div>
                <br /><br /><br /><br /><br /><br />
                <hr />
                <div
                    style={{
                        width: "350px",
                        height: "400px",
                        margin: "0 auto"
                    }}>
                    <TalkyUI
                        initTalkURL="/talk-audio.json"
                        themeColor='orange'
                        fontSize='10px'
                        backendConfiguration={backendConfig}
                    />
                </div>
            </div>
        </>
    );
}

export default App;
