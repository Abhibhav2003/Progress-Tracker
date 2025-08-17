import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DoughnutChart from '../components/DoughnutChart';
import '../static/css/dashboard.css';
const Dashboard = () => {
  const [progress, setProgress] = useState({
    counters: { easy: 0, medium: 0, hard: 0, leetcodeContests: 0, codeforcesContests: 0 },
    checkboxes: {},
  });

  useEffect(() => {
    axios.get('http://localhost:5000/api/progress')
      .then(response => setProgress(response.data))
      .catch(error => console.error('Error fetching progress:', error));
  }, []); // Empty dependency array to run only once


  const totalLeetCode = progress.counters.easy + progress.counters.medium + progress.counters.hard;
  const totalContests = progress.counters.leetcodeContests + progress.counters.codeforcesContests;
  const completedSubjects = Object.keys(progress.checkboxes).slice(0, 4).filter(k => progress.checkboxes[k]).length;
  const completedLibs = Object.keys(progress.checkboxes).slice(4, 11).filter(k => progress.checkboxes[k]).length;
  const completedDSA = Object.keys(progress.checkboxes).slice(17).filter(k => progress.checkboxes[k]).length +
                       Object.keys(progress.checkboxes).slice(-2).filter(k => progress.checkboxes[k]).length;

  return (
    <div className="container">
      <h1>Progress Dashboard</h1>
      <div className="section">
        <h2>Summary</h2>
        <div className="dashboard-grid">
          <div className="dashboard-item">
            <DoughnutChart
              chartId="leetcodeSummaryChart"
              data={{
                labels: ['Easy', 'Medium', 'Hard'],
                datasets: [{ data: [progress.counters.easy, progress.counters.medium, progress.counters.hard], backgroundColor: ['#34d399', '#facc15', '#ef4444'] }],
              }}
            />
            <div className="card"><span>Total LeetCode Solved</span><span>{totalLeetCode}</span></div>
          </div>
          <div className="dashboard-item">
            <DoughnutChart
              chartId="contestsSummaryChart"
              data={{
                labels: ['LeetCode', 'Codeforces'],
                datasets: [{ data: [progress.counters.leetcodeContests, progress.counters.codeforcesContests], backgroundColor: ['#10b981', '#f43f5e'] }],
              }}
            />
            <div className="card"><span>Total Contests</span><span>{totalContests}</span></div>
          </div>
          <div className="dashboard-item">
            <DoughnutChart
              chartId="subjectsSummaryChart"
              data={{
                labels: ['Completed', 'Remaining'],
                datasets: [{ data: [completedSubjects, 4 - completedSubjects], backgroundColor: ['#22c55e', '#9ca3af'] }],
              }}
            />
            <div className="card"><span>Subjects Completed</span><span>{completedSubjects}/4</span></div>
          </div>
          <div className="dashboard-item">
            <DoughnutChart
              chartId="librariesSummaryChart"
              data={{
                labels: ['Completed', 'Remaining'],
                datasets: [{ data: [completedLibs, 7 - completedLibs], backgroundColor: ['#f59e0b', '#9ca3af'] }],
              }}
            />
            <div className="card"><span>Libraries Completed</span><span>{completedLibs}/7</span></div>
          </div>
          <div className="dashboard-item">
            <DoughnutChart
              chartId="dsaSummaryChart"
              data={{
                labels: ['Completed', 'Remaining'],
                datasets: [{ data: [completedDSA, 14 - completedDSA], backgroundColor: ['#3b82f6', '#9ca3af'] }],
              }}
            />
            <div className="card"><span>DSA Topics Completed</span><span>{completedDSA}/14</span></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;