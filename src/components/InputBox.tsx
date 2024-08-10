import React, { useEffect, useState } from 'react';
import useRouteInputBoxValue from '../hooks/useRouteInputBoxValue';

interface InputBoxProps {
    inputRetriever: (newMessage: string, newMessageType: 'question' | 'answer' | 'conversationAnswer') => void;
    conversationRouteKeyword: string;
    qaRouteKeyword: string;
}

const InputBox: React.FC<InputBoxProps> = ({inputRetriever, conversationRouteKeyword, qaRouteKeyword}) => {
    const [inputValue, setInputValue] = useState('');
    const [question, setQuestion] = useState('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [, setResponses] = useState<string[]>([]);
    const {answer, keywordRouting} = useRouteInputBoxValue(question);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const handleKeyPressed = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && inputValue != '') {
            setQuestion(inputValue);
            inputRetriever(inputValue, 'question');
            setIsLoading(true);
        }
    };

    const handleOnFocus = (event: React.FocusEvent<HTMLInputElement>) => {
        event.target.style.borderColor = '#4ea699';
        event.target.style.borderWidth = '3px';
    };

    const handleOnBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        event.target.style.borderColor = 'gray';
        event.target.style.borderWidth = '0.1px';
    };

    const processQuestion = async () => {
        if(isLoading){
            keywordRouting(question, conversationRouteKeyword, qaRouteKeyword);
        }
        else{
            setQuestion(inputValue);
            inputRetriever(question, 'question');
            setIsLoading(true);
        }
    };

    useEffect(() => {
        setResponses(prevResponses => [...prevResponses, answer]);
        inputRetriever(answer, 'answer');
        setIsLoading(false);
        setInputValue('');
    }, [answer]);

    useEffect(() => {
        if(isLoading){
            processQuestion();
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
                    onClick={processQuestion} 
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
