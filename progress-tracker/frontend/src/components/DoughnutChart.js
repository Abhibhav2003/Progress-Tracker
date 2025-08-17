import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const DoughnutChart = ({ chartId, data }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    // Destroy existing chart if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy();
      chartInstance.current = null;
    }

    // Ensure canvas context exists
    if (!chartRef.current) return;

    // Validate data before creating chart
    if (!data || !data.datasets || data.datasets.length === 0) {
      console.warn('Invalid chart data provided');
      return;
    }

    // Check if all data values are zero
    const hasData = data.datasets[0].data.some(value => value > 0);
    if (!hasData) {
      // Show a placeholder or empty state
      const ctx = chartRef.current.getContext('2d');
      ctx.clearRect(0, 0, chartRef.current.width, chartRef.current.height);
      ctx.fillStyle = '#e5e7eb';
      ctx.font = '14px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('No data available', chartRef.current.width / 2, chartRef.current.height / 2);
      return;
    }

    // Create new chart with improved configuration
    chartInstance.current = new Chart(chartRef.current, {
      type: 'doughnut',
      data: data,
      options: {
        responsive: true,
        maintainAspectRatio: true,
        aspectRatio: 1.5,
        plugins: {
          tooltip: { 
            enabled: true,
            backgroundColor: 'rgba(0,0,0,0.8)',
            titleColor: 'white',
            bodyColor: 'white',
            borderColor: 'rgba(255,255,255,0.1)',
            borderWidth: 1
          },
          legend: { 
            position: 'bottom',
            labels: {
              padding: 15,
              usePointStyle: true,
              font: {
                size: 12
              }
            }
          },
        },
        elements: {
          arc: {
            borderWidth: 2,
            borderColor: '#ffffff'
          }
        },
        layout: {
          padding: {
            top: 10,
            bottom: 10
          }
        }
      },
    });

    // Cleanup function
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
        chartInstance.current = null;
      }
    };
  }, [data]);

  return (
    <div style={{ width: '100%', height: '300px', position: 'relative' }}>
      <canvas 
        id={chartId} 
        ref={chartRef}
        style={{ maxWidth: '100%', maxHeight: '100%' }}
      ></canvas>
    </div>
  );
};

export default DoughnutChart;