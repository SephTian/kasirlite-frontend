import { ChangeEvent, useState } from 'react';

const useInput = (inputValue = '') => {
  const [input, setInput] = useState(inputValue);

  const resetInput = () => {
    setInput('');
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
    setInput(e.target.value);
  };

  return [input, handleInputChange, resetInput] as const;
};

export { useInput };
