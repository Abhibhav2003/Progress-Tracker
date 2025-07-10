import React from 'react';

const CounterCard = ({ label, count, onChange }) => {
  return (
    <div className="card">
      <span>{label}</span>
      <div className="counter-controls">
        <button onClick={() => onChange(count - 1)}>-</button>
        <span className="count">{count}</span>
        <button onClick={() => onChange(count + 1)}>+</button>
      </div>
    </div>
  );
};

export default CounterCard;