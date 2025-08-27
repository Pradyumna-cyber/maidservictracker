import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import AddVisitForm from './components/AddVisitForm';
import VisitList from './components/VisitList';


export interface Visit {
  id: number;
  date: string;
  time: string;
  services: string[];
  notes: string;
  maidName: string;
  timestamp: string;
}

const App: React.FC = () => {
  const [visits, setVisits] = useState<Visit[]>(() => {
    return JSON.parse(localStorage.getItem('maidVisits') || '[]');
  });

  useEffect(() => {
    localStorage.setItem('maidVisits', JSON.stringify(visits));
  }, [visits]);

  const addVisit = (visit: Visit) => {
    setVisits([visit, ...visits]);
  };

  const deleteVisit = (visitId: number) => {
    if (window.confirm('Are you sure you want to delete this visit record?')) {
      setVisits(visits.filter((visit) => visit.id !== visitId));
    }
  };

  return (
    <div className="container">
      <Header visits={visits} />
      <div className="main-content">
        <AddVisitForm addVisit={addVisit} />
        <VisitList visits={visits} deleteVisit={deleteVisit} />
      </div>
    </div>
  );
};

export default App;