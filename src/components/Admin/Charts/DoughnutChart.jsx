import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

// Register necessary Chart.js components
Chart.register(...registerables);

const DoughnutChart = ({ chartdata }) => {
  // بيانات حالة الطلبات (مثال)
  console.log(chartdata)
  const data = {
    labels: ['Pending', 'Shipped', 'Completed', 'Cancelled'],
    datasets: [
      {

        data: chartdata, // النسب لكل حالة
        backgroundColor: [
          'rgba(255, 205, 86, 0.7)',  // لون Pending
          'rgba(54, 162, 235, 0.7)',  // لون Shipped
          'rgba(75, 192, 192, 0.7)',  // لون Complete
          'rgba(255, 99, 132, 0.7)',  // لون Cancelled
        ],
        borderColor: [
          'rgba(255, 205, 86, 1)',    // لون حدود Pending
          'rgba(54, 162, 235, 1)',    // لون حدود Shipped
          'rgba(75, 192, 192, 1)',    // لون حدود Complete
          'rgba(255, 99, 132, 1)',    // لون حدود Cancelled
        ],
        borderWidth: 1,
      },
    ],
  };

  // الإعدادات الخاصة بالـ Chart
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom', // مكان ظهور الأساطير (legend)
        labels: {
          font: {
            size: 14, // حجم النص
            family: 'Arial', // نوع الخط
            weight: 'normal', // وزن الخط

          },
          boxWidth: 15, // عرض مربعات الألوان في الـ legend
          padding: 30, // المسافة بين الـ legend والمخطط
          usePointStyle: true, // تغيير شكل المربعات إلى دائرة
        },
      },
    },
  };

  return (
    <div>
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default DoughnutChart;
