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
        <div>A react/typescript conversational user interface</div>
        <div>Build your own talkflow 🚀</div>
        <h2>ConversationStreamer - Q&A Chatbot</h2>
        <ConversationStreamer jsonUrl='/conversation-personal-ai.json' chatHeight='200px' chatWidth='90vw' aiMessage={newMessage} aiMessageType={newMessageType}/>
        <br/>
        <PersonalAIForm messageHandler={handleNewMessage} />
        <h2>ConversationStreamer - Static talkflow with forms</h2>
        <ConversationStreamer jsonUrl='/conversation-options.json' chatHeight='200px' chatWidth='90vw' aiMessage={newMessage} aiMessageType={newMessageType}/>
        <br />
        <h2>Components</h2>
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
