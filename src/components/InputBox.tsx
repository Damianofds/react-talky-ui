import React, { useEffect, useState } from 'react';
import useRouteInputBoxValue from '../hooks/useRouteInputBoxValue';
import { ChatItemConfig} from './chat-items/TalkItemsConfig';
import { CirclularStack, get } from './utils/CircularStack';
import VoiceRecorder from './VoiceRecorder';

interface InputBoxProps {
    inputRetriever: (answer: ChatItemConfig) => void;
    conversationRouteKeyword: string;
    qaRouteKeyword: string;
    fontSize?: string;
    themeColor?: string;
    inputBoxHistory: CirclularStack<string>;
}

const InputBox: React.FC<InputBoxProps> = ({inputRetriever, conversationRouteKeyword, qaRouteKeyword, fontSize, themeColor='', inputBoxHistory}) => {
    const [inputValue, setInputValue] = useState('');
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const {answer, keywordRouting} = useRouteInputBoxValue(input);
    const [inputBoxHistoryCurrentIndex, setInputBoxHistoryCurrentIndex] = useState(0);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const handleKeyPressed = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && inputValue != '') {
            setInput(inputValue);
            inputRetriever({id: "init-" + Date.now(), text: inputValue, type: 'input'});
            setIsLoading(true);
        }
        if (event.key === 'ArrowUp') {
            const newValue =  get(inputBoxHistory, inputBoxHistoryCurrentIndex);
            setInputValue(newValue || '');
            if(inputBoxHistoryCurrentIndex < inputBoxHistory.items.length){
                setInputBoxHistoryCurrentIndex(inputBoxHistoryCurrentIndex+1);
            }
            else{
                setInputBoxHistoryCurrentIndex(0);
            }
        }
        if (event.key === 'ArrowDown') {
            const newValue =  get(inputBoxHistory, inputBoxHistoryCurrentIndex);
            setInputValue(newValue || '');
            if(inputBoxHistoryCurrentIndex >= 0){
                setInputBoxHistoryCurrentIndex(inputBoxHistoryCurrentIndex-1);
            }
            else{
                setInputBoxHistoryCurrentIndex(inputBoxHistory.items.length-1);
            }
        }
    };

    const handleOnFocus = (event: React.FocusEvent<HTMLInputElement>) => {
        event.target.style.borderColor = themeColor;
        // event.target.style.borderWidth = '1px';
        console.log(event.type)
    };

    const handleOnBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        event.target.style.borderColor = 'gray';
        // event.target.style.borderWidth = '0.1px';
    };
    
    const handleOnMouseEnter = (event: React.MouseEvent<HTMLButtonElement>) => {
        (event.target as HTMLButtonElement).style.borderColor = themeColor;
    };
    
    const handleOnMouseLeave = (event: React.MouseEvent<HTMLButtonElement>) => {
        (event.target as HTMLButtonElement).style.borderColor = 'gray';
        // (event.target as HTMLButtonElement).style.borderWidth = '0.1px';
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
                    placeholder="&nbsp;Type your question here..."
                    onKeyDown={handleKeyPressed}
                    style={{
                        border: '3px solid #ccc',
                        padding: '10px',
                        textAlign: 'left',
                        flex: '9',
                        fontSize: fontSize,
                        height: '45px',
                        width: '100%',
                        maxWidth: '300px',
                        boxSizing: 'border-box',
                        marginRight: '1vw',
                        outline: 'green',
                        borderRadius: '20px'
                    }}
                />
                {inputValue && <button 
                    onClick={processInput}
                    onMouseEnter={handleOnMouseEnter}
                    onMouseLeave={handleOnMouseLeave}
                    style={{
                        border: `3px solid ${themeColor}`,
                        padding: '10px',
                        color: 'red',
                        borderRadius: '25px',
                        outline: 'none',
                        marginRight: '1vw',
                    }}
                    title='or press enter'
                >
                    {isLoading ? '⌛' : '➡️'}
                </button>}
                {isLoading || !inputValue && <VoiceRecorder inputRetriever={inputRetriever} themeColor={themeColor}/>}
                <button
                    style={{
                        border: `3px solid ${themeColor}`,
                        padding: '10px',
                        color: themeColor,
                        borderRadius: '25px',
                        outline: 'none',
                        marginRight: '1vw',
                    }}
                    onMouseDown={()=>true}
                    onMouseUp={()=>true}
                    >
                    ➕
                </button>
            </div>
        </div>
    );
    
};

export default InputBox;
