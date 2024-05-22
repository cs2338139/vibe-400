import { createContext, useContext } from 'react';
export const BaseUrlContext = createContext(null);

const baseUrl = () => {
  if (process.env.NODE_ENV === 'development') return '/public';
  return '';
};

export default function BaseUrlProvider({ children }) {
  return (
    <BaseUrlContext.Provider value={baseUrl()}>
      {children}
    </BaseUrlContext.Provider>
  );
}
