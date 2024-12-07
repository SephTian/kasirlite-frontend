'use client';

import { useCallback, useEffect, useState } from 'react';

function useModal() {
  const [isOpen, setisOpen] = useState<boolean>(false);

  // Removing scroll abilities outside modal
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

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
