import React, { useState, useEffect } from 'react';
import type { Visit } from '../App';

interface AddVisitFormProps {
  addVisit: (visit: Visit) => void;
}

const AddVisitForm: React.FC<AddVisitFormProps> = ({ addVisit }) => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [maidName, setMaidName] = useState('');
  const [notes, setNotes] = useState('');
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const services = [
    'General Cleaning',
    'Kitchen',
    'Bathroom',
    'Bedroom',
    'Living Room',
    'Windows',
    'Laundry',
    'Dishes',
    'Mopping',
    'Dusting',
  ];

  useEffect(() => {
    const now = new Date();
    setDate(now.toISOString().split('T')[0]);
    setTime(now.toTimeString().slice(0, 5));
  }, []);

  const handleServiceToggle = (service: string) => {
    setSelectedServices((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service],
    );
  };

  const handleSubmit = () => {
    if (!date || !time) {
      alert('⚠️ Please enter both date and time!');
      return;
    }

    if (selectedServices.length === 0) {
      alert('⚠️ Please select at least one service!');
      return;
    }

    const visit: Visit = {
      id: Date.now(),
      date,
      time,
      maidName,
      services: selectedServices,
      notes,
      timestamp: new Date().toISOString(),
    };

    addVisit(visit);
    clearForm();
    alert('✅ Visit logged successfully!');
  };

  const clearForm = () => {
    const now = new Date();
    setDate(now.toISOString().split('T')[0]);
    setTime(now.toTimeString().slice(0, 5));
    setNotes('');
    setMaidName('');
    setSelectedServices([]);
  };

  return (
    <div className="add-visit-section">
      <div className="section-title">➕ Log New Visit</div>
      <div className="form-group">
        <div className="form-row">
          <div>
            <label>📅 Visit Date</label>
            <input
              type="date"
              className="form-control"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div>
            <label>🕐 Time</label>
            <input
              type="time"
              className="form-control"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>
        </div>
        <div className="form-row">
          <div>
            <label>👩‍💼 Maid Name</label>
            <input
              type="text"
              className="form-control"
              value={maidName}
              onChange={(e) => setMaidName(e.target.value)}
              placeholder="Enter maid's name"
            />
          </div>
        </div>
      </div>
      <div className="form-group">
        <label>🧹 Services Performed</label>
        <div className="service-tags">
          {services.map((service) => (
            <div
              key={service}
              className={`service-tag ${
                selectedServices.includes(service) ? 'selected' : ''
              }`}
              onClick={() => handleServiceToggle(service)}
            >
              {service}
            </div>
          ))}
        </div>
      </div>
      <div className="form-group">
        <label>📝 Additional Notes</label>
        <textarea
          className="form-control"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={3}
          placeholder="Any special work done, areas focused on, or observations..."
        />
      </div>
      <button className="add-btn" onClick={handleSubmit}>
        ✅ Log This Visit
      </button>
    </div>
  );
};

export default AddVisitForm;
