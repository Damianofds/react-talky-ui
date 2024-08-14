import './App.css';
import TalkyUI from './TalkyUI';

function App() {

  return (
    <>
      <div className="App">
        <h1>react-talky-ui </h1>
        <div>A react/typescript conversational user interface</div>
        <div>The frontend for your AI buddy 🦜</div>
        <br/>
        <div style={{
          width: '80vw',
          minWidth: '355px',
          maxWidth: '800px',
          height: '35vh',
          minHeight: '350px',
        }}>
          <TalkyUI initTalkURL='/talk-showcase.json' 
            //themeColor='red'
            // fontSize='15px'
          />
        </div>
      </div>
    </>
  );
}

export default App;
