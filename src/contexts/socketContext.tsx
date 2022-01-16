import React, { Dispatch, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { io, Socket } from 'socket.io-client';
import { useChatContext, useGameContext } from '.';
import { ChatData, Player } from '../../types';

export type SocketContextType = {
  socket: Socket | undefined;

  pingRoom: (roomId: string) => void;
  createRoom: (roomId: string) => void;
  joinRoom: (roomId: string, username: string) => void;
  ready: () => void;
  sendChat: (text: string) => void;

  test: () => void;
};

const SocketContext = React.createContext<SocketContextType>({
  socket: undefined,

  pingRoom: () => null,
  createRoom: () => null,
  joinRoom: () => null,
  ready: () => null,
  sendChat: () => null,

  test: () => null,
});

export const useSocketContext = () => useContext(SocketContext);

export const SocketContextProvider: React.FC = ({ children }) => {
  const navigate = useNavigate();

  const [socket, setSocket] = useState<Socket>();

  const { username, setUsername, players, setPlayers } = useGameContext();
  const { setChat } = useChatContext();

  const pingRoom = (roomId: string) => {
    socket?.emit('pingRoom', { roomId });
    socket?.on('pongRoom', ({ roomExists }) => {
      console.log('room exists?', roomExists);
      if (!roomExists)
        navigate('/', { state: { error: `Game ${roomId} doesn\'t exist` } });
    });
  };

  const createRoom = (roomId: string) => {
    socket?.emit('initRoom', {
      roomId,
      username,
      action: 'create',
    });
    socket?.on('roomSuccess', () => {
      navigate(`/${roomId}`, { state: { creator: true } });
    });
    socket?.on('roomFail', () => alert('fail'));
  };

  const joinRoom = (roomId: string, name: string) => {
    socket?.emit('initRoom', {
      roomId,
      username: name,
      action: 'join',
    });
    socket?.on('roomSuccess', () => {
      setUsername(name);
    });
    socket?.on('roomFail', () => {
      navigate('/', { state: { error: `Game ${roomId} doesn\'t exist` } });
    });
  };

  const ready = () => {
    socket?.emit('ready');
  };

  const sendChat = (text: string) => {
    socket?.emit('sendChat', {username, text});
  };

  // INCOMING METHODS

  socket?.on('showPlayers', ({ players }: { players: Player[] }) => {
    setPlayers(players);
  });

  socket?.on('sendChat', ({ chatData }: { chatData: ChatData[] }) => {
    setChat(chatData);
  });

  const test = () => {
    socket?.emit('test');
  };

  useEffect(() => {
    const newSocket = io('ws://localhost:8081');
    setSocket(newSocket);
    () => {
      newSocket.close();
    };
  }, []);

  return (
    <SocketContext.Provider
      value={{
        socket,

        pingRoom,
        createRoom,
        joinRoom,
        ready,
        sendChat,

        test,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};
