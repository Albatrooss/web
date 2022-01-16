import React, { Dispatch, useContext, useState } from 'react';
import { Player } from '../../types';

export type GameContextType = {
  username: string;
  setUsername: Dispatch<string>;
  players: Player[];
  setPlayers: Dispatch<Player[]>;
};

const GameContext = React.createContext<GameContextType>({
  username: '',
  setUsername: () => null,
  players: [],
  setPlayers: () => null,
});

export const useGameContext = () => useContext(GameContext);

export const GameContextProvider: React.FC = ({ children }) => {
  const [username, setUsername] = useState('');
  const [players, setPlayers] = useState<Player[]>([]);

  return (
    <GameContext.Provider
      value={{
        username,
        setUsername,
        players,
        setPlayers,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
