"use client";
import React, { useCallback, useState } from 'react';
import { RulesModal } from '@components/RulesModal';

export const RulesButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={openModal}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        className="cursor-pointer rounded-lg border-2 border-white/30 px-8 py-3 font-semibold tracking-[0.2em] text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        RULES
      </button>
      <RulesModal isOpen={isOpen} onClose={closeModal} />
    </>
  );
};