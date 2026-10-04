import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import CallbackRequestModal from '../components/CallbackRequestModal';

const CallbackModalContext = createContext(null);

export function CallbackModalProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  const openCallbackModal = useCallback(() => setIsOpen(true), []);
  const closeCallbackModal = useCallback(() => setIsOpen(false), []);

  const value = useMemo(() => ({
    openCallbackModal,
    closeCallbackModal
  }), [openCallbackModal, closeCallbackModal]);

  return (
    <CallbackModalContext.Provider value={value}>
      {children}
      <CallbackRequestModal isOpen={isOpen} onClose={closeCallbackModal} />
    </CallbackModalContext.Provider>
  );
}

export function useCallbackModal() {
  const context = useContext(CallbackModalContext);
  if (!context) {
    throw new Error('useCallbackModal must be used within a CallbackModalProvider');
  }
  return context;
}
