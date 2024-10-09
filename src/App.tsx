import "./App.css";
import TalkyUI from "../lib/TalkyUI";
import ClearStorageButton from "../lib/components/utils/ClearStorageButton";

const backendConfig = {
    openaiKey: import.meta.env.TALKY_OPENAI_API_KEY,
    qaUrl: import.meta.env.TALKY_QA_API_URL,
    audioUploadUrl: import.meta.env.TALKY_AUDIO_UPLOAD_API_URL,
    documentUploadurl: import.meta.env.TALKY_DOCUMENT_UPLOAD_API_URL,
}

function App() {
    return (
        <>
            <div className="App">
                <div style={{textAlign:"center"}}>
                    <h1>react-talky-ui </h1>
                    <div>A react/typescript conversational user interface</div>
                    <div>The frontend for your AI buddy 🦜</div>
                    <br />
                    <span style={{ width: "100px", textAlign: "left" }}>
                        <ClearStorageButton color={"#000000"} />
                    </span>
                </div>
                <div
                    style={{
                        width: "80vw",
                        minWidth: "355px",
                        maxWidth: "800px",
                        height: "60vh",
                    }}>
                    <TalkyUI
                        initTalkURL="/talk-showcase.json"
                        backendConfiguration={backendConfig}
                    />
                </div>
            </div>
        </>
    );
}

export default App;
