import React from 'react';
import CounterCard from './CounterCard';
import CheckboxGroup from './CheckboxGroup';
import DoughnutChart from './DoughnutChart';

const ProgressSection = ({ title, chartId, chartData, items, progress, updateCounter, updateCheckbox }) => {
  return (
    <div className="section">
      <h2>{title}</h2>
      {chartId && <DoughnutChart chartId={chartId} data={chartData} />}
      {items.map((item, index) => (
        item.type === 'counter' ? (
          <CounterCard
            key={index}
            label={item.label}
            count={progress.counters[item.key] || 0}
            onChange={(value) => updateCounter(item.key, value)}
          />
        ) : item.type === 'display' ? (
          <div key={index} className="card">
            <span>{item.label}</span>
            <span>{item.value}</span>
          </div>
        ) : (
          <CheckboxGroup
            key={index}
            items={[item]}
            progress={progress}
            updateCheckbox={updateCheckbox}
          />
        )
      ))}
    </div>
  );
};

export default ProgressSection;