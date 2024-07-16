import { useState } from 'react';
import './App.css';
import ConversationStreamer from './ConversationStreamer';
import PersonalAIForm from './components/PersonalAIForm';
import RadioStreamer from './components/RadioStreamer';
import WordStreamer from './components/WordStreamer';

function App() {

  const [newMessage, setNewMessage] = useState<string>("");
  const [newMessageType, setNewMessageType] = useState<'question' | 'answer'>('answer');

  const handleNewMessage = (msg: string, msgType: 'question' | 'answer') => {
    setNewMessage(msg);
    setNewMessageType(msgType);
  };

  return (
    <>
      <div className="App">
        <h1>react-conversational-ui </h1>
        <h2>ConversationStreamer</h2>
        <ConversationStreamer jsonUrl='/conversation-personal-ai.json' chatHeight='200px' chatWidth='90vw' aiMessage={newMessage} aiMessageType={newMessageType}/>
        <br />
        <PersonalAIForm messageHandler={handleNewMessage} />
        <h2>Components</h2>
        <h3>WordStreamer</h3>
        <WordStreamer words='yo yo beba beba beba beba' loopStyle='cycle'/>
        <h3>RadioStreamer</h3>
        <RadioStreamer options={[{"label":"d","conversationUrl":"d"},{"label":"d","conversationUrl":"d"}]}
    			submitButtonLabel= "choose"/>
      </div>
    </>
  );
}

export default App;
