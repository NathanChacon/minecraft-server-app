import React from 'react';

const PlayersList: React.FC = () => {
  // This will be the list of players (static for now)
  const players = ['Player 1', 'Player 2', 'Player 3'];

  return (
    <div>
      <h1>Players List</h1>
      <ul>
        {players.map((player, index) => (
          <li key={index}>{player}</li>
        ))}
      </ul>
    </div>
  );
};

export default PlayersList;