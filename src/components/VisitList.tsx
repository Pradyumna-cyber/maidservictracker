import React from 'react';
import VisitCard from './VisitCard';
import type { Visit } from '../App';

interface VisitListProps {
  visits: Visit[];
  deleteVisit: (visitId: number) => void;
}

const VisitList: React.FC<VisitListProps> = ({ visits, deleteVisit }) => {
  return (
    <div className="visits-list">
      <div className="section-title">📈 Visit History</div>
      <div id="visitsList">
        {visits.length === 0 ? (
          <div className="empty-state">
            <div style={{ fontSize: '48px', marginBottom: '15px' }}>📋</div>
            <p>
              No visits logged yet.
              <br />
              Add your first maid visit above!
            </p>
          </div>
        ) : (
          visits.map((visit) => (
            <VisitCard key={visit.id} visit={visit} deleteVisit={deleteVisit} />
          ))
        )}
      </div>
    </div>
  );
};

export default VisitList;