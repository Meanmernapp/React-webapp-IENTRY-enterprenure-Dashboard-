import { useState } from 'react';
import useEncryption from './useEncryption';

function useSessionStorage(key) {
    const [text, setText] = useState('');
    const { encrypt, decrypt, encryptedText, decryptedText, setEncryptedText } = useEncryption();

    const saveData = () => {
        encrypt();
        sessionStorage.setItem(key, encryptedText);
    }

    const retrieveData = () => {
        const data = sessionStorage.getItem(key);
        setEncryptedText(data);
        decrypt();
    }

    return {
        text,
        setText,
        saveData,
        retrieveData,
        encryptedText,
        decryptedText
    }
}

export default useSessionStorage;
