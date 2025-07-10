import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProgressSection from '../components/ProgressSection';
import $ from 'jquery';

const Tracker = () => {
  const [progress, setProgress] = useState({
    counters: { easy: 0, medium: 0, hard: 0, leetcodeContests: 0, codeforcesContests: 0 },
    checkboxes: {},
  });

  useEffect(() => {
    axios.get('http://localhost:5000/api/progress')
      .then(response => setProgress(response.data))
      .catch(error => console.error('Error fetching progress:', error));

    $(document).ready(() => {
      $('.card').hover(
        function () { $(this).css('transform', 'scale(1.02)'); },
        function () { $(this).css('transform', 'scale(1)'); }
      );
      $('.checkbox-group label').hover(
        function () { $(this).css('background', 'rgba(59, 130, 246, 0.1)'); },
        function () { $(this).css('background', 'transparent'); }
      );
    });
  }, []);

  const updateCounter = (key, value) => {
    axios.put(`http://localhost:5000/api/progress/counter/${key}`, { value })
      .then(response => setProgress(response.data))
      .catch(error => console.error('Error updating counter:', error));
  };

  const updateCheckbox = (key, checked) => {
    axios.put(`http://localhost:5000/api/progress/checkbox/${key}`, { checked })
      .then(response => setProgress(response.data))
      .catch(error => console.error('Error updating checkbox:', error));
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(progress, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'progress.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const sections = [
    {
      title: 'LeetCode Questions',
      chartId: 'leetcodeChart',
      chartData: {
        labels: ['Easy', 'Medium', 'Hard'],
        datasets: [{ data: [progress.counters.easy, progress.counters.medium, progress.counters.hard], backgroundColor: ['#34d399', '#facc15', '#ef4444'] }],
      },
      items: [
        { label: 'Easy', key: 'easy', type: 'counter' },
        { label: 'Medium', key: 'medium', type: 'counter' },
        { label: 'Hard', key: 'hard', type: 'counter' },
        { label: 'Total Solved', key: 'totalLeetCode', type: 'display', value: progress.counters.easy + progress.counters.medium + progress.counters.hard },
      ],
    },
    {
      title: 'Contests Given',
      chartId: 'contestChart',
      chartData: {
        labels: ['LeetCode', 'Codeforces'],
        datasets: [{ data: [progress.counters.leetcodeContests, progress.counters.codeforcesContests], backgroundColor: ['#10b981', '#f43f5e'] }],
      },
      items: [
        { label: 'LeetCode Contests', key: 'leetcodeContests', type: 'counter' },
        { label: 'Codeforces Contests', key: 'codeforcesContests', type: 'counter' },
      ],
    },
    {
      title: 'Subjects Completed',
      chartId: 'subjectsChart',
      chartData: {
        labels: ['Completed', 'Remaining'],
        datasets: [{
          data: [
            Object.keys(progress.checkboxes).slice(0, 4).filter(k => progress.checkboxes[k]).length,
            4 - Object.keys(progress.checkboxes).slice(0, 4).filter(k => progress.checkboxes[k]).length,
          ],
          backgroundColor: ['#22c55e', '#9ca3af'],
        }],
      },
      items: [
        { label: 'DBMS', key: 'dbms', type: 'checkbox' },
        { label: 'OOPs', key: 'oops', type: 'checkbox' },
        { label: 'Computer Networks', key: 'cn', type: 'checkbox' },
        { label: 'Operating System', key: 'os', type: 'checkbox' },
      ],
    },
    {
      title: 'Python Libraries for Data Science',
      chartId: 'librariesChart',
      chartData: {
        labels: ['Completed', 'Remaining'],
        datasets: [{
          data: [
            Object.keys(progress.checkboxes).slice(4, 11).filter(k => progress.checkboxes[k]).length,
            7 - Object.keys(progress.checkboxes).slice(4, 11).filter(k => progress.checkboxes[k]).length,
          ],
          backgroundColor: ['#f59e0b', '#9ca3af'],
        }],
      },
      items: [
        { label: 'pandas', key: 'pandas', type: 'checkbox' },
        { label: 'numpy', key: 'numpy', type: 'checkbox' },
        { label: 'matplotlib', key: 'matplotlib', type: 'checkbox' },
        { label: 'seaborn', key: 'seaborn', type: 'checkbox' },
        { label: 'plotly', key: 'plotly', type: 'checkbox' },
        { label: 'sqlalchemy', key: 'sqlalchemy', type: 'checkbox' },
        { label: 'scikit-learn', key: 'scikitlearn', type: 'checkbox' },
      ],
    },
    {
      title: 'CDS',
      items: [
        {
          label: 'English',
          key: 'english',
          type: 'checkbox',
          nested: [
            { label: 'Vocabulary', key: 'english_vocabulary', type: 'checkbox' },
            { label: 'Spotting the Error', key: 'english_spotting_error', type: 'checkbox' },
            { label: 'Sentence Improvement', key: 'english_sentence_improvement', type: 'checkbox' },
            { label: 'Comprehension', key: 'english_comprehension', type: 'checkbox' },
            { label: 'One Word Substitution', key: 'english_one_word_substitution', type: 'checkbox' },
          ],
        },
        {
          label: 'Maths',
          key: 'maths',
          type: 'checkbox',
          nested: [
            { label: 'Time and Distance', key: 'maths_time_distance', type: 'checkbox' },
            { label: 'Number System', key: 'maths_number_system', type: 'checkbox' },
            { label: 'HCF LCM', key: 'maths_hcf_lcm', type: 'checkbox' },
            { label: 'Percentage', key: 'maths_percentage', type: 'checkbox' },
            { label: 'Circle', key: 'maths_circle', type: 'checkbox' },
            { label: 'Quadratic Equation', key: 'maths_quadratic_equation', type: 'checkbox' },
            { label: 'Lines and Angles', key: 'maths_lines_angles', type: 'checkbox' },
            { label: 'Trigonometry', key: 'maths_trigonometry', type: 'checkbox' },
            { label: 'Heights and Distance', key: 'maths_heights_distance', type: 'checkbox' },
            { label: 'Area and Perimeter', key: 'maths_area_perimeter', type: 'checkbox' },
            { label: 'Surface Area', key: 'maths_surface_area', type: 'checkbox' },
            { label: 'Statistics', key: 'maths_statistics', type: 'checkbox' },
          ],
        },
        {
          label: 'Science',
          key: 'science',
          type: 'checkbox',
          nested: [
            { label: 'Physics', key: 'science_physics', type: 'checkbox' },
            { label: 'Chemistry', key: 'science_chemistry', type: 'checkbox' },
          ],
        },
        { label: 'Current Affairs', key: 'current_affairs', type: 'checkbox' },
        { label: 'PYQs', key: 'pyqs', type: 'checkbox' },
      ],
    },
    {
      title: 'DSA Concepts',
      chartId: 'dsaChart',
      chartData: {
        labels: ['Completed', 'Remaining'],
        datasets: [{
          data: [
            Object.keys(progress.checkboxes).slice(17).filter(k => progress.checkboxes[k]).length +
            Object.keys(progress.checkboxes).slice(-2).filter(k => progress.checkboxes[k]).length,
            14 - (Object.keys(progress.checkboxes).slice(17).filter(k => progress.checkboxes[k]).length +
                  Object.keys(progress.checkboxes).slice(-2).filter(k => progress.checkboxes[k]).length),
          ],
          backgroundColor: ['#3b82f6', '#9ca3af'],
        }],
      },
      items: [
        { label: 'Bit Manipulation', key: 'dsa_bit_manipulation', type: 'checkbox' },
        { label: 'Sorting', key: 'dsa_sorting', type: 'checkbox' },
        {
          label: 'Binary Search',
          key: 'dsa_binary_search',
          type: 'checkbox',
          nested: [
            { label: '1D', key: 'dsa_binary_search_1d', type: 'checkbox' },
            { label: '2D', key: 'dsa_binary_search_2d', type: 'checkbox' },
          ],
        },
        { label: 'Linked List', key: 'dsa_linkedlist', type: 'checkbox' },
        { label: 'Array', key: 'dsa_array', type: 'checkbox' },
        { label: 'Stacks/Queues', key: 'dsa_stacks_queues', type: 'checkbox' },
        { label: 'Recursion', key: 'dsa_recursion', type: 'checkbox' },
        { label: 'Dynamic Programming', key: 'dsa_dynamic_programming', type: 'checkbox' },
        { label: 'Trees', key: 'dsa_trees', type: 'checkbox' },
        { label: 'Graphs', key: 'dsa_graphs', type: 'checkbox' },
        { label: 'Greedy', key: 'dsa_greedy', type: 'checkbox' },
        { label: 'Number Theory', key: 'dsa_number_theory', type: 'checkbox' },
        { label: 'Important Algorithms', key: 'dsa_important_algorithms', type: 'checkbox' },
      ],
    },
  ];

  return (
    <div className="container">
      <h1>Progress Tracker</h1>
      <button className="export-button" onClick={handleExport}>Export Progress</button>
      {sections.map((section, index) => (
        <ProgressSection
          key={index}
          title={section.title}
          chartId={section.chartId}
          chartData={section.chartData}
          items={section.items}
          progress={progress}
          updateCounter={updateCounter}
          updateCheckbox={updateCheckbox}
        />
      ))}
    </div>
  );
};

export default Tracker;