import React, { useEffect, useState } from 'react';
import useRouteInputBoxValue from '../hooks/useRouteInputBoxValue';
import { ChatItemConfig} from './chat-items/TalkItemsConfig';

interface InputBoxProps {
    inputRetriever: (answer: ChatItemConfig) => void;
    conversationRouteKeyword: string;
    qaRouteKeyword: string;
    themeColor?: string;
}

const InputBox: React.FC<InputBoxProps> = ({inputRetriever, conversationRouteKeyword, qaRouteKeyword, themeColor='#4ea699'}) => {
    const [inputValue, setInputValue] = useState('');
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const {answer, keywordRouting} = useRouteInputBoxValue(input);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const handleKeyPressed = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && inputValue != '') {
            setInput(inputValue);
            inputRetriever({id: "init-" + Date.now(), text: inputValue, type: 'input'});
            setIsLoading(true);
        }
    };

    const handleOnFocus = (event: React.FocusEvent<HTMLInputElement>) => {
        event.target.style.borderColor = themeColor;
        event.target.style.borderWidth = '3px';
    };

    const handleOnBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        event.target.style.borderColor = 'gray';
        event.target.style.borderWidth = '0.1px';
    };

    const processInput = async () => {
        if(isLoading){
            keywordRouting(input, conversationRouteKeyword, qaRouteKeyword);
        }
        else{
            setInput(inputValue);
            inputRetriever({id: "init-" + Date.now(), text: inputValue, type: 'input'});
            setIsLoading(true);
        }
    };

    useEffect(() => {
        if(answer){
            inputRetriever(answer);
        }
        setIsLoading(false);
        setInputValue('');
    }, [answer]);

    useEffect(() => {
        if(isLoading){
            processInput();
        }
    }, [isLoading]);

    return (
        <div>
            <div style={{ display: 'flex' }}>
                <input 
                    type="text" 
                    value={inputValue} 
                    onChange={handleInputChange}
                    onFocus={handleOnFocus}
                    onBlur={handleOnBlur} 
                    disabled={isLoading}
                    placeholder="Type your question here..."
                    onKeyDown={handleKeyPressed}
                    style={{
                        border: '1px solid #ccc',
                        padding: '10px',
                        textAlign: 'left',
                        flex: '9',
                        fontSize: '16px',
                        height: '40px',
                        boxSizing: 'border-box',
                        marginRight: '10px',
                        outline: 'green',
                    }}
                />
                <button 
                    onClick={processInput} 
                    disabled={isLoading || !inputValue}
                    style={{ flex: '1', height: '40px' }}
                    title='or press enter'
                >
                    {isLoading ? 'Loading...' : 'Send'}
                </button>
            </div>
        </div>
    );
    
};

export default InputBox;
