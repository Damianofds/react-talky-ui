import React, { useEffect, useState } from 'react';
import useFetchAnswer from '../hooks/useFetchAIAnswer';

const API_URL = 'http://localhost:5678/webhook/9fb54256-f38b-4992-94e5-432cde55075d';

// const TEST_API_URL = 'http://localhost:5678/webhook-test/9fb54256-f38b-4992-94e5-432cde55075d';

interface InputBoxProps {
    messageHandler: (newMessage: string, newMessageType: 'question' | 'answer') => void;
}

const InputBox: React.FC<InputBoxProps> = ({messageHandler}) => {
    const [inputValue, setInputValue] = useState('');
    const [question, setQuestion] = useState('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [, setResponses] = useState<string[]>([]);
    const {answer, fetchData} = useFetchAnswer(question);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const handleKeyPressed = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && inputValue != '') {
            setQuestion(inputValue);
            messageHandler(inputValue, 'question');
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

    const handleButtonClick = async () => {
        if(isLoading){
            fetchData();
        }
        else{
            setQuestion(inputValue);
            messageHandler(question, 'question');
            setIsLoading(true);
        }
    };

    useEffect(() => {
        setResponses(prevResponses => [...prevResponses, answer]);
        messageHandler(answer, 'answer');
        setIsLoading(false);
        setInputValue('');
    }, [answer]);

    useEffect(() => {
        if(isLoading){
            handleButtonClick();
        }
    }, [isLoading]);

    return (
        <div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
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
                    onClick={handleButtonClick} 
                    disabled={isLoading || !inputValue}
                    style={{ flex: '1', height: '40px' }}
                >
                    {isLoading ? 'Loading...' : 'Send'}
                </button>
            </div>
        </div>
    );
    
};

export default InputBox;
