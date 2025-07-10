import React, { useEffect, useState } from 'react';
import axios from 'axios';
import $ from 'jquery';

const History = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/progress/history')
      .then(response => setHistory(response.data))
      .catch(error => console.error('Error fetching history:', error));

    $(document).ready(() => {
      $('.history-card').hover(
        function () { $(this).css('transform', 'scale(1.02)'); },
        function () { $(this).css('transform', 'scale(1)'); }
      );
    });
  }, []);

  return (
    <div className="container">
      <h1>Progress History</h1>
      <div className="section">
        <h2>Recent Updates</h2>
        {history.map((entry, index) => (
          <div key={index} className="history-card">
            <span>Action: {entry.action}</span>
            <span>Key: {entry.key}</span>
            <span>Value: {entry.value.toString()}</span>
            <span>Time: {new Date(entry.timestamp).toLocaleString()}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default History;