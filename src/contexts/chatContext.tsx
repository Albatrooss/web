import React, { Dispatch, useContext, useState } from 'react';
import { ChatData } from '../../types';

export type ChatContextType = {
  msg: string;
  setMsg: Dispatch<string>;
  chat: ChatData[];
  setChat: Dispatch<ChatData[]>;
};

const ChatContext = React.createContext<ChatContextType>({
  msg: '',
  setMsg: () => null,
  chat: [],
  setChat: () => null,
});

export const useChatContext = () => useContext(ChatContext);

export const ChatContextProvider: React.FC = ({ children }) => {
  const [msg, setMsg] = useState('');
  const [chat, setChat] = useState<ChatData[]>([]);

  return (
    <ChatContext.Provider
      value={{
        msg,
        setMsg,
        chat,
        setChat,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
