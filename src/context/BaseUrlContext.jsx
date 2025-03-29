import { createContext, useContext } from 'react';
import PropTypes from 'prop-types';

export const BaseUrlContext = createContext('');

const getBaseUrl = () => {
  // Check if running in development environment
  if (
    typeof window !== 'undefined' &&
    window.process?.env?.NODE_ENV === 'development'
  ) {
    return '/public';
  }
  return '';
};

export const useBaseUrl = () => {
  const baseUrl = useContext(BaseUrlContext);
  if (baseUrl === undefined) {
    throw new Error('useBaseUrl must be used within a BaseUrlProvider');
  }
  return baseUrl;
};

export default function BaseUrlProvider({ children }) {
  BaseUrlProvider.propTypes = {
    children: PropTypes.node.isRequired
  };

  return (
    <BaseUrlContext.Provider value={getBaseUrl()}>
      {children}
    </BaseUrlContext.Provider>
  );
}
