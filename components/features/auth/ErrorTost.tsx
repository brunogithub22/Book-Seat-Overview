"use client";

import { useEffect, useState } from "react";
import { AlertCircle, X } from "lucide-react";

interface ErrorPage{
    message: string;
    onClose: () => void;
    duration: number;
}

export default function ErrorToast({ message, onClose, duration }: ErrorPage) {
  const [visible, setVisible] = useState(false);

  // Mount/animate in whenever a new message arrives
  useEffect(() => {
    if (!message) return;
    setVisible(true);

    if (duration) {
      const timer = setTimeout(() => handleClose(), duration);
      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message, duration]);

  const handleClose = () => {
    setVisible(false);
    // wait for exit animation before telling parent to clear state
    setTimeout(() => onClose?.(), 200);
  };

  if (!message) return null;

  return (
    <div
      aria-live="assertive"
      className="fixed top-4 right-4 z-50 flex justify-end pointer-events-none"
    >
      <div
        role="alert"
        className={`pointer-events-auto flex items-start gap-3 rounded-lg border border-red-200
          bg-white px-4 py-3 shadow-lg shadow-red-900/5 ring-1 ring-black/5
          max-w-sm w-[22rem] transition-all duration-200 ease-out
          ${visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"}`}
      >
        <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-600" />

        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-red-900">Something went wrong</p>
          <p className="mt-0.5 text-sm text-red-600 break-words">{message}</p>
        </div>

        <button
          type="button"
          onClick={handleClose}
          aria-label="Dismiss error"
          className="flex-shrink-0 text-red-400 hover:text-red-600 transition-colors rounded
            focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-1"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}