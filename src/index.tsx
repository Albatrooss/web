import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import App from './App';
import { ChatContextProvider, GameContextProvider, SocketContextProvider } from './contexts';
import { theme } from './util';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <GameContextProvider>
          <ChatContextProvider>
            <SocketContextProvider>
              <App />
            </SocketContextProvider>
          </ChatContextProvider>
        </GameContextProvider>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
