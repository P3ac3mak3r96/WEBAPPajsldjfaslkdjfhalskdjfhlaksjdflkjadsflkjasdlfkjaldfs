import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './app/state/redux/store';
import App from './App';
import './index.css';

// Globale Fehlerbehandlung
if (process.env.NODE_ENV === 'production') {
  window.onerror = (message, source, lineno, colno, error) => {
    // Hier könnte ein Logging-Service eingebunden werden
    console.error('Global error:', { message, source, lineno, colno, error });
    return false;
  };

  window.onunhandledrejection = (event) => {
    console.error('Unhandled promise rejection:', event.reason);
  };
}

// Tailwind CSS base styles
const tailwindStyles = `
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
`;

// Root Komponente mit Provider
const Root = () => (
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// App rendern
ReactDOM.render(
  <Root />,
  document.getElementById('root')
);

// Hot Module Replacement für Entwicklung
if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default;
    ReactDOM.render(
      <Root>
        <NextApp />
      </Root>,
      document.getElementById('root')
    );
  });
}
