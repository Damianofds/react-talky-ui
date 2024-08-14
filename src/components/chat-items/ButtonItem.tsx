import { useContext } from 'react';
import { ConversationContext } from '../ConversationContext';

interface ButtonItemProps {
  id: string;
  conversationUrl: string;
  buttonLabel: string;
}

const ButtonItem: React.FC<ButtonItemProps> = ({ id, conversationUrl, buttonLabel }) => {

  const { switchConversation } = useContext(ConversationContext);

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = () => {
    switchConversation(conversationUrl);
  };

  return (
    <span key={id}>
      <button style={{
        marginTop: '1vh',
        marginBottom: '1vh',
        marginRight: '1vw'
      }}
        onClick={handleClick}>
        {buttonLabel}
      </button>
    </span>

  );
};

export default ButtonItem;