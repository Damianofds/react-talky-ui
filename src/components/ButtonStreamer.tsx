import React, { useContext, useEffect, useId, useState } from 'react';
import { ConversationContext } from '../ConversationContext';

const BUTTON_DELAY = 200;

interface ButtonStreamerProps {
    buttons: [
        {
            label: string;
            conversationUrl: string;
        },
        {
            label: string;
            conversationUrl: string;
        }
    ]
}

const ButtonStreamer: React.FC<ButtonStreamerProps> = ({ buttons }) => {
    const [currentButtons, setCurrentButtons] = useState<React.JSX.Element>();
    const [currentButtonIndex, setCurrentButtonIndex] = useState(0);
    const id = useId();
    const {nextSentence, saveSentence, switchConversation} = useContext(ConversationContext);

    const handleClick = (index: number): React.MouseEventHandler<HTMLButtonElement> => () => {
        switchConversation(buttons[index].conversationUrl);
    };
    
    const streamButtons = () => {
        if(currentButtonIndex <= buttons.length){
            setCurrentButtonIndex(currentButtonIndex+1);
            const newButtons: JSX.Element[] = [];
            for(let i=0; i<currentButtonIndex; i++){
                newButtons.push(
                    <span key={id+i}>
                        <button onClick={handleClick(i)}>
                            {buttons[i].label}
                        </button>&nbsp;
                    </span>
                    );
            }
            setTimeout(() => {
                setCurrentButtons(
                    <div>
                        {newButtons}
                    </div>
                );
            }, BUTTON_DELAY);
        }
        else{
            if(currentButtons){
                saveSentence(<div key={id}>{currentButtons}</div>);
                nextSentence();
            }
        }
            
    };

    useEffect(() => {
        streamButtons();
    }, [currentButtons]);

    return(
        <div>{currentButtons}</div>
    );
}

export default ButtonStreamer;