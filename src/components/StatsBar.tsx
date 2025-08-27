import React from 'react';
import type { Visit } from '../App';

interface StatsBarProps {
  visits: Visit[];
}

const StatsBar: React.FC<StatsBarProps> = ({ visits }) => {
  const totalVisits = visits.length;
  const thisMonth = visits.filter((visit) => {
    const visitDate = new Date(visit.date);
    const now = new Date();
    return (
      visitDate.getMonth() === now.getMonth() &&
      visitDate.getFullYear() === now.getFullYear()
    );
  }).length;

  let avgPerMonth = 0;
  if (visits.length > 0) {
    const oldestVisit = new Date(visits[visits.length - 1].date);
    const now = new Date();
    const monthsDiff = Math.max(
      1,
      (now.getFullYear() - oldestVisit.getFullYear()) * 12 +
        (now.getMonth() - oldestVisit.getMonth()) + 1,
    );
    avgPerMonth = Math.round(totalVisits / monthsDiff);
  }

  return (
    <div className="stats-bar">
      <div className="stat">
        <div className="stat-number" id="totalVisits">
          {totalVisits}
        </div>
        <div className="stat-label">Total Visits</div>
      </div>
      <div className="stat">
        <div className="stat-number" id="thisMonth">
          {thisMonth}
        </div>
        <div className="stat-label">This Month</div>
      </div>
      <div className="stat">
        <div className="stat-number" id="avgPerMonth">
          {avgPerMonth}
        </div>
        <div className="stat-label">Avg/Month</div>
      </div>
    </div>
  );
};

export default StatsBar;