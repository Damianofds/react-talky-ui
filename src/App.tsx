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
        <h1>react-talk-ui </h1>
        <div>A react/typescript talkative user interface</div>
        <div>🌈 Create your talkflow 🗣️</div>
        <h2>Q&A Chatbot - talk with an AI in the backend</h2>
        <ConversationStreamer jsonUrl='/conversation-personal-ai.json' chatHeight='200px' chatWidth='90vw' aiMessage={newMessage} aiMessageType={newMessageType}/>
        <br/>
        <PersonalAIForm messageHandler={handleNewMessage} />
        <h2>ConversationStreamer - Static talkflows with form components</h2>
        <ConversationStreamer jsonUrl='/conversation-options.json' chatHeight='200px' chatWidth='90vw' aiMessage={newMessage} aiMessageType={newMessageType}/>
        <br />
        <h2>Form components</h2>
        <h3>WordStreamer</h3>
        <WordStreamer words='yo yo beba beba beba beba' loopStyle='cycle'/>
        <h3>RadioStreamer</h3>
        <div style={{height:'200px'}}>
          <RadioStreamer options={[
            {"label":"I do always follow my heart","conversationUrl":""},
            {"label":"Nah... beter listen your brain","conversationUrl":""},
            {"label":"Heart on my personal life, brain on professional side","conversationUrl":""},
            {"label":"Better not talk about that","conversationUrl":""}]}
            submitButtonLabel= "choose"/>
        </div>
      </div>
    </>
  );
}

export default App;
