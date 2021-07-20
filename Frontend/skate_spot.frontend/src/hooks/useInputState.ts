import { useState } from 'react';
import React from 'react';

export const useInputState = (initialState: string): 
[string,  (event: React.ChangeEvent<HTMLInputElement>) => void, () => void] => {
    const [input, setInput] = useState(initialState)

    return [
        input,
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setInput(e.target.value);
        },
        () => setInput("")
    ]
}