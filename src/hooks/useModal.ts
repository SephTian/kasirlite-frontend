'use client';

import { useCallback, useState } from 'react';

function useModal() {
  const [isOpen, setisOpen] = useState<boolean>(false);

  const toggleModal = useCallback(() => {
    setisOpen((prev) => !prev);
  }, []);

  const closeModal = useCallback(() => {
    setisOpen(false);
  }, []);

  const openModal = useCallback(() => {
    setisOpen(true);
  }, []);

  return [isOpen, toggleModal, closeModal, openModal];
}

export default useModal;
