import React, { useEffect, useState } from 'react';

const API_URL = 'http://localhost:5678/webhook/9fb54256-f38b-4992-94e5-432cde55075d';

interface PersonalAIForm {
    messageHandler: (newMessage: string, newMessageType: 'question' | 'answer') => void;
}

const PersonalAIForm: React.FC<PersonalAIForm> = ({messageHandler}) => {
    const [inputValue, setInputValue] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [, setResponses] = useState<string[]>([]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const handleButtonClick = async () => {
        if(isLoading){
            try {
                const response = await fetch(API_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ message: inputValue }),
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setResponses(prevResponses => [...prevResponses, data.text]);
                messageHandler(data.response.text, 'answer');

            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setIsLoading(false);
                setInputValue('');
            }
        }
        else{
            messageHandler(inputValue, 'question');
            setIsLoading(true);
        }
    };

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
                    disabled={isLoading}
                    placeholder="Type your question here..."
                    style={{
                        border: '1px solid #ccc',
                        padding: '10px',
                        textAlign: 'left',
                        flex: '9',
                        fontSize: '16px',
                        height: '40px',
                        boxSizing: 'border-box',
                        marginRight: '10px'
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

export default PersonalAIForm;
