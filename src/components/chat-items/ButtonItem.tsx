import { useContext } from 'react';
import { ConversationContext } from '../ConversationContext';

interface ButtonItemProps {
    id: string;
    conversationUrl: string;
    buttonLabel: string;
  }

const ButtonItem: React.FC<ButtonItemProps> = ({ id, conversationUrl, buttonLabel }) => {
  
    const {switchConversation} = useContext(ConversationContext);

    const handleClick: React.MouseEventHandler<HTMLButtonElement> = () => {
        switchConversation(conversationUrl);
    };

    return (
          <div key={id} className="loading">
            <button onClick={handleClick}>
                {buttonLabel}
            </button>&nbsp;
          </div>      
    );
};

export default ButtonItem;