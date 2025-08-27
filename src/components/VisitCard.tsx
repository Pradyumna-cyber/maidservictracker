import React from 'react';
import type { Visit } from '../App';

interface VisitCardProps {
  visit: Visit;
  deleteVisit: (visitId: number) => void;
}

const formatDate = (dateStr: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };
  return new Date(dateStr).toLocaleDateString('en-US', options);
};

const formatTime = (timeStr: string): string => {
  const [hours, minutes] = timeStr.split(':');
  const hour12 = parseInt(hours) % 12 || 12;
  const ampm = parseInt(hours) >= 12 ? 'PM' : 'AM';
  return `${hour12}:${minutes} ${ampm}`;
};

const VisitCard: React.FC<VisitCardProps> = ({ visit, deleteVisit }) => {
  return (
    <div className="visit-card">
      <div className="visit-header">
        <div>
          <div className="visit-date">{formatDate(visit.date)}</div>
          <div className="visit-time">🕐 {formatTime(visit.time)}</div>
          {visit.maidName && <div className="maid-name">👩‍💼 {visit.maidName}</div>}
        </div>
        <button className="delete-btn" onClick={() => deleteVisit(visit.id)}>
          🗑️
        </button>
      </div>
      <div className="visit-services">
        {visit.services.map((service) => (
          <span key={service} className="service-badge">
            {service}
          </span>
        ))}
      </div>
      {visit.notes && <div className="visit-notes">"{visit.notes}"</div>}
    </div>
  );
};

export default VisitCard;