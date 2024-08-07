import './App.css';
import ClearStorageButton from './components/utils/ClearStorageButton';
import TalkUI from './TalkUI';

function App() {

  return (
    <>
      <div className="App">
        <h1>react-talk-ui </h1>
        <div>A react/typescript talkative user interface</div>
        <div>🌈 Create your talkflow 🗣️</div>
        <h2>Q&A Chatbot - talk with an AI in the backend</h2>
        <TalkUI />
        <div>
          <ClearStorageButton />
        </div>
      </div>
    </>
  );
}

export default App;
