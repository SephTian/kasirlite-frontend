import { formatPrice } from '@/utils';
import { ChangeEvent, useState } from 'react';

const useInputPrice = (inputValue = '') => {
  const [input, setInput] = useState(inputValue);

  const resetInput = () => {
    setInput('');
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(formatPrice(e.target.value));
  };

  return [input, handleInputChange, resetInput] as const;
};

export { useInputPrice };
