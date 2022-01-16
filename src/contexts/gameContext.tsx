import React, { Dispatch, useContext, useState } from 'react';
import { GameData, Player } from '../../types';

const initPlayer: Player = {
  id: 'temp',
  username: '',
  seat: -1,
  hand: [],
  isReady: false,
};
const initGameData: GameData = {
  host: '',
  red: 0,
  blue: 0,
  gameOn: false,
  dealer: '',
  turn: 1,
};

export type GameContextType = {
  username: string;
  setUsername: Dispatch<string>;
  gameData: GameData;
  setGameData: Dispatch<GameData>;
  me: Player;
  setMe: Dispatch<Player>;
  players: Record<string, Player>;
  setPlayers: Dispatch<Record<string, Player>>;
  message: {msg: string, visible: boolean};
  setMessage: (msg: string) => void;
};

const GameContext = React.createContext<GameContextType>({
  username: '',
  setUsername: () => null,
  gameData: initGameData,
  setGameData: () => null,
  setMe: () => null,
  me: initPlayer,
  players: {},
  setPlayers: () => null,
  message: {msg: '', visible: false},
  setMessage: () => null,
});

export const useGameContext = () => useContext(GameContext);

export const GameContextProvider: React.FC = ({ children }) => {
  const [username, setUsername] = useState('');
  const [gameData, setGameData] = useState<GameData>(initGameData);
  const [me, setMe] = useState<Player>(initPlayer);
  const [players, setPlayers] = useState<Record<string, Player>>({});

  const [message, setMessage] = useState({msg: '', visible: false});

  const updateMessage = async (msg: string) => {
    setMessage({msg, visible: true});
    await new Promise(res => setTimeout(res, 2000));
    setMessage({msg, visible: false});
  };

  return (
    <GameContext.Provider
      value={{
        gameData,
        setGameData,
        username,
        setUsername,
        me,
        setMe,
        players,
        setPlayers,
        message,
        setMessage: updateMessage,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
