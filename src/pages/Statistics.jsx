import React, { useState, useEffect } from 'react';
import { Bar, Pie, Doughnut, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  ChartDataLabels
);

function Statistics() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const saleItems = {
    'Amazon ONI': { total: 1240, perDay: 30 },
    'Amazon Comet': { total: 910, perDay: 25 },
    'Flipkart ONI': { total: 1060, perDay: 35 },
    'Flipkart Comet': { total: 810, perDay: 20 },
    Myntra: { total: 680, perDay: 17 },
    Shopify: { total: 280, perDay: 15 },
    Mics: { total: 440, perDay: 21 },
  };

  const inventoryData = {
    totalItems: 3500,
    totalSale: 4300,
    totalFirm: 1500,
    platformAvgSale: 32,
  };

  const barChartData = {
    labels: Object.keys(saleItems),
    datasets: [
      {
        label: 'Total Sales on each Platform',
        data: Object.values(saleItems).map((item) => item.total),
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(135, 212, 55, 0.6)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const getLastNDates = (n) => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < n; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      dates.unshift(date.toLocaleDateString('en-GB'));
    }
    return dates;
  };

  const recentDates = getLastNDates(10);
  const totalSalesPerDay = [300, 450, 400, 420, 390, 480, 500, 520, 460, 490];

  const lineChartData = {
    labels: recentDates,
    datasets: [
      {
        label: 'Total Sales Per Day',
        data: totalSalesPerDay,
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderWidth: 2,
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: 'rgba(54, 162, 235, 1)',
      },
    ],
  };

  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 2000,
      easing: 'easeInOutBounce',
    },
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: (context) => `Sales: ${context.raw}`,
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Sales',
        },
        beginAtZero: true,
      },
    },
  };

  const pieChartData = {
    labels: ['Total Items', 'Total Sale', 'Total Firm'],
    datasets: [
      {
        label: 'Inventory Distribution',
        data: [inventoryData.totalItems, inventoryData.totalSale, inventoryData.totalFirm],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
        ],
        hoverOffset: 4,
      },
    ],
  };

  const doughnutChartData = {
    labels: Object.keys(saleItems),
    datasets: [
      {
        label: 'Per Day Sales',
        data: Object.values(saleItems).map((item) => item.perDay),
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(175, 12, 192, 0.6)',
          'rgba(153, 152, 255, 0.6)',
          'rgba(135, 212, 55, 0.6)',

        ],
        hoverOffset: 4,
      },
    ],
  };

  return (
    <div className="p-6 bg-white space-y-6">
      {/* Bar and Line Charts */}
      <div className={`grid ${windowWidth > 768 ? 'grid-cols-2' : 'grid-cols-1'} gap-6`}>
        <fieldset className="border-2 border-gray-900 p-4 rounded-lg">
          <legend className="text-xl font-bold text-gray-800 mb-4">Total Sales Overview</legend>
          <div className="h-96">
            <Bar data={barChartData} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
        </fieldset>

        <fieldset className="border-2 border-gray-900 p-4 rounded-lg">
          <legend className="text-xl font-bold text-gray-800 mb-4">Total Sales Per Day</legend>
          <div className="h-96">
            <Line data={lineChartData} options={lineChartOptions} />
          </div>
        </fieldset>
      </div>

      {/* Pie and Doughnut Charts */}
      <div className={`grid ${windowWidth > 768 ? 'grid-cols-2' : 'grid-cols-1'} gap-6`}>
        <fieldset className="border-2 border-gray-900 p-4 rounded-lg">
          <legend className="text-xl font-bold text-gray-800 mb-4">Inventory Distribution</legend>
          <div className="h-80">
            <Pie data={pieChartData} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
        </fieldset>

        <fieldset className="border-2 border-gray-900 p-4 rounded-lg">
          <legend className="text-xl font-bold text-gray-800 mb-4">Platform Per Day Sales</legend>
          <div className="h-80">
            <Doughnut data={doughnutChartData} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
        </fieldset>
      </div>
    </div>
  );
}

export default Statistics;
