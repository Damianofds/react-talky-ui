import React, { ChangeEvent, useContext, useEffect, useId, useState } from 'react';
import { ConversationContext } from '../ConversationContext';

const RADIO_DELAY = 200;

interface RadioStreamerProps {
    submitButtonLabel: string;
    options: [
        {
            label: string;
            conversationUrl: string;
        },
        {
            label: string;
            conversationUrl: string;
        },
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

const RadioStreamer: React.FC<RadioStreamerProps> = ({ options, submitButtonLabel }) => {
    const {nextSentence, saveSentence, switchConversation} = useContext(ConversationContext);
    const [currentOptions, setCurrentOptions] = useState<React.JSX.Element>();
    const [currentButtonIndex, setCurrentButtonIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(0);
    const selectedOptionRef = React.useRef(selectedOption);
    const id = useId();

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSelectedOption(+event.target.id);
        selectedOptionRef.current = +event.target.id;
    };

    const handleClick = () => {
            switchConversation(options[selectedOptionRef.current].conversationUrl);
    };

    const streamOptions = () => {
        if(currentButtonIndex <= options.length){
            setCurrentButtonIndex(currentButtonIndex+1);
            const newOptions: JSX.Element[] = [];
            for(let i=0; i<currentButtonIndex; i++){
                newOptions.push(
                    <div key={id+i}>
                        <input type="radio" id={""+i}
                            name={"optionbox"}
                            value={options[i].label} defaultChecked={i == 0}
                            onChange={handleInputChange} />
                        <label>{options[i].label}</label>
                    </div>
                    );
            }
            if(currentButtonIndex == options.length){
                newOptions.push(
                    <button onClick={handleClick} key="submitButtonLabel">
                        {submitButtonLabel}
                    </button>
                );
            }
            setTimeout(() => {
                setCurrentOptions(
                    <fieldset style={{border:'0'}}>
                        {newOptions}
                    </fieldset>
                );
            }, RADIO_DELAY);
        }
        else{
            if(currentOptions){
                saveSentence(<div key={id}>{currentOptions}</div>);
                nextSentence();
            }
        }
            
    };

    useEffect(() => {
        streamOptions();
    }, [currentOptions]);

    return(<>
        <div>{currentOptions}</div>
        {/* <div>{selectedOption}</div> */}
        </>
    );
}

export default RadioStreamer;