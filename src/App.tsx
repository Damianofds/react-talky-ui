import './App.css';
import ClearStorageButton from './components/utils/ClearStorageButton';
import TalkyUI from './TalkyUI';

function App() {

  return (
    <>
      <div className="App">
        <h1>react-talky-ui </h1>
        <div>A react/typescript conversational user interface</div>
        <div>The frontend for your AI buddy 🦜</div>
        <h2>Demo</h2>
        <div style={{
          width: '80vw',
          minWidth: '355px',
          maxWidth: '800px',
          height: '55vh'
        }}>
          <TalkyUI initTalkURL='/talk-button.json' 
            //themeColor='red'
          />
        </div>
        {/* <br/> */}
        <div>
          <ClearStorageButton />
        </div>
      </div>
    </>
  );
}

export default App;
