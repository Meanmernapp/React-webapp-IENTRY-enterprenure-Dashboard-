import cryptoJs from 'crypto-js';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const useEncryption = () => {
  const [text, setText] = useState('');
  const [encryptedText, setEncryptedText] = useState('');
  const [decryptedText, setDecryptedText] = useState('');

  // generate a random key 
  const key = uuidv4();

  const ciphertext = cryptoJs.AES.encrypt(text, key);
  setEncryptedText(ciphertext.toString());

  const bytes = cryptoJs.AES.decrypt(encryptedText, key);
  const originalText = bytes.toString(cryptoJs.enc.Utf8);
  setDecryptedText(originalText);


  return {
    text,
    setText,
    encryptedText,
    decryptedText,
    setEncryptedText
  };
};

export default useEncryption