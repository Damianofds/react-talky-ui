import './App.css';
import ClearStorageButton from './components/utils/ClearStorageButton';
import TalkyUI from './TalkyUI';

function App() {

  return (
    <>
      <div className="App">
        <h1>react-talky-ui </h1>
        <div>A react/typescript conversational user interface</div>
        <div>📢 Your talky AI buddy 🦜</div>
        <h2>Demo</h2>
        <TalkyUI />
        <div>
          <ClearStorageButton />
        </div>
      </div>
    </>
  );
}

export default App;
