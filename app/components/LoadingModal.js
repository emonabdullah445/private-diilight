// components/LoadingModal.jsx
"use client";

import { useEffect, useState } from 'react';

export default function LoadingModal({ isOpen, onClose }) {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setProgress(0);
      setIsComplete(false);
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            return 0;
          }
          return prev + 2;
        });
      }, 30);

      return () => clearInterval(interval);
    }
  }, [isOpen]);

  // Separate effect for handling completion
  useEffect(() => {
    if (progress >= 100 && !isComplete) {
      setIsComplete(true);
      setTimeout(() => {
        if (onClose) onClose();
      }, 500);
    }
  }, [progress, isComplete, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-blue-600 p-6 rounded-lg shadow-lg w-[90%] max-w-sm">
        <h2 className="text-lg font-semibold mb-4 text-white">Loading...</h2>
        <p className="mb-4 text-white">Logging in</p>
        
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
          <div 
            className="h-2 bg-gray-100 transition-all duration-300 ease-in-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}