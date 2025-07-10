import React, { useEffect, useState } from 'react';
import axios from 'axios';
import $ from 'jquery';

const Goals = () => {
  const [progress, setProgress] = useState({ goals: [] });
  const [title, setTitle] = useState('');
  const [target, setTarget] = useState('');
  const [key, setKey] = useState('easy');
  const [deadline, setDeadline] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/progress')
      .then(response => setProgress(response.data))
      .catch(error => console.error('Error fetching progress:', error));

    $(document).ready(() => {
      $('.goal-card').hover(
        function () { $(this).css('transform', 'scale(1.02)'); },
        function () { $(this).css('transform', 'scale(1)'); }
      );
      $('.add-goal-btn').hover(
        function () { $(this).css('transform', 'scale(1.05)'); },
        function () { $(this).css('transform', 'scale(1)'); }
      );
      $('.delete-goal-btn').hover(
        function () { $(this).css('background', '#dc2626'); },
        function () { $(this).css('background', '#ef4444'); }
      );
    });
  }, []);

  const handleAddGoal = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/progress/goal', { title, target, key, deadline });
      setProgress(response.data);
      setTitle('');
      setTarget('');
      setKey('easy');
      setDeadline('');
    } catch (error) {
      console.error('Error adding goal:', error);
    }
  };

  const handleDeleteGoal = async (index) => {
    if (window.confirm('Are you sure you want to delete this goal?')) {
      try {
        const response = await axios.delete(`http://localhost:5000/api/progress/goal/${index}`);
        setProgress(response.data);
      } catch (error) {
        console.error('Error deleting goal:', error);
      }
    }
  };

  return (
    <div className="container">
      <h1>Goals</h1>
      <div className="section">
        <h2>Add New Goal</h2>
        <div className="goal-form">
          <input type="text" placeholder="Goal Title" value={title} onChange={(e) => setTitle(e.target.value)} />
          <input type="number" placeholder="Target Value" value={target} onChange={(e) => setTarget(e.target.value)} />
          <select value={key} onChange={(e) => setKey(e.target.value)}>
            <option value="easy">Easy Questions</option>
            <option value="medium">Medium Questions</option>
            <option value="hard">Hard Questions</option>
            <option value="leetcodeContests">LeetCode Contests</option>
            <option value="codeforcesContests">Codeforces Contests</option>
          </select>
          <input type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} />
          <button className="add-goal-btn" onClick={handleAddGoal}>+ Add Goal</button>
        </div>
      </div>
      <div className="section">
        <h2>Your Goals</h2>
        {progress.goals.map((goal, index) => (
          <div key={index} className="goal-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <span>{goal.title}</span>
              <span>Target: {goal.target} ({goal.key})</span>
              <span>Deadline: {new Date(goal.deadline).toLocaleDateString()}</span>
              <span>Status: {goal.achieved ? 'Achieved' : 'Pending'}</span>
            </div>
            <button
              className="delete-goal-btn"
              onClick={() => handleDeleteGoal(index)}
              style={{ marginLeft: '10px', padding: '5px 10px', background: '#ef4444', color: 'white', border: 'none', borderRadius: '4px' }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Goals;