import React from 'react';
import StatsBar from './StatsBar';
import type { Visit } from '../App';
interface HeaderProps {
  visits: Visit[];
}

const Header: React.FC<HeaderProps> = ({ visits }) => {
  return (
    <div className="header">
      <h1>📝 Maid Visit Tracker</h1>
      <p>Keep track of all cleaning visits</p>
      <StatsBar visits={visits} />
    </div>
  );
};

export default Header;