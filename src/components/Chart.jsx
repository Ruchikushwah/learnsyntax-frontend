import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' ,
    },
    title: {
      display: true,
      text: 'Overall All Data',
    },
  },
};

const labels = ['Courses', 'Chapters', 'Topics'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Courses',
      data: [10,20,30,50],
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Chapters',
      data: [40,70,90],
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
    {
      label: 'Topics',
      data: [40,70,100],
      backgroundColor: 'rgba(50, 170, 200, 0.9)',
    },
  ],
};
const Chart = () => {
  return (
    <Bar options={options} data={data} />
  )
}

export default Chart



