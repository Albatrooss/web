import React from 'react';
import { Route, Routes } from 'react-router-dom';
import CreateLobby from './pages/Home';
import Game from './pages/Game';

const publicRoutes = {
  '/': CreateLobby,
  '/:gameId': Game,
};

const App: React.FC = () => {
  return (
    <Routes>
      {Object.entries(publicRoutes).map(([path, Page]) => (
        <Route path={path} key={path} element={<Page />} />
      ))}
    </Routes>
  );
};

export default App;
