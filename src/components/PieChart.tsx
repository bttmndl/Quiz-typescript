import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

type PieChartProps = {
  totalQuestions: number;
  correctlyAnswered: number;
  wronglyAnswered: number;
};

const PieChart: React.FC<PieChartProps> = ({ totalQuestions, correctlyAnswered, wronglyAnswered }) => {
  const chartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (chartRef.current) {
      const chart = new Chart(chartRef.current, {
        type: 'pie',
        data: {
          labels: ['Correct', 'Wrong'],
          datasets: [
            {
              data: [correctlyAnswered, wronglyAnswered],
              backgroundColor: ['green', 'red'],
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
        },
      });
      return () => {
        chart.destroy();
      };
    }
  }, [correctlyAnswered, wronglyAnswered]);

  return (
    <div style={{ width: '400px', height: '400px' }}>
      <canvas ref={chartRef} />
    </div>
  );
};

export default PieChart;
