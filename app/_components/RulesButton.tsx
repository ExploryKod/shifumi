"use client";
import React from 'react';

export const RulesButton = () => {
  return (
    <button
      onClick={() => {
        // TODO: Implement modal later
        console.log('Rules clicked - modal to be implemented');
      }}
      className="fixed bottom-8 right-8 px-6 py-3 border-2 border-white/30 text-white rounded-lg font-semibold tracking-wider hover:bg-white/10 transition-colors"
    >
      RULES
    </button>
  );
};