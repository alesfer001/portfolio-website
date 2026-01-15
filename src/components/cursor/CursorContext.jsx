import { createContext, useContext, useState, useCallback } from 'react';

const CursorContext = createContext({
  cursorVariant: 'default',
  cursorText: '',
  setCursorVariant: () => {},
  setCursorText: () => {},
});

export const CursorProvider = ({ children }) => {
  const [cursorVariant, setCursorVariant] = useState('default');
  const [cursorText, setCursorText] = useState('');

  const handleSetCursorVariant = useCallback((variant) => {
    setCursorVariant(variant);
  }, []);

  const handleSetCursorText = useCallback((text) => {
    setCursorText(text);
  }, []);

  return (
    <CursorContext.Provider
      value={{
        cursorVariant,
        cursorText,
        setCursorVariant: handleSetCursorVariant,
        setCursorText: handleSetCursorText,
      }}
    >
      {children}
    </CursorContext.Provider>
  );
};

export const useCursor = () => {
  const context = useContext(CursorContext);
  if (!context) {
    throw new Error('useCursor must be used within a CursorProvider');
  }
  return context;
};

export default CursorContext;
