// Dashboard.js
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const [totals, setTotals] = useState({});
  const [topSelling, setTopSelling] = useState([]);


  useEffect(() => {
    const fetchTotals = async () => {
      try {
        const { data } = await axios.get('http://localhost:8800/server/dashboard/totals');
        setTotals(data);
      } catch (error) {
        console.error("Error fetching totals:", error);
      }
    };

    const fetchTopSelling = async () => {
      try {
        const { data } = await axios.get('http://localhost:8800/server/dashboard/top-selling');
        setTopSelling(data);
      } catch (error) {
        console.error("Error fetching top selling:", error);
      }
    };


    fetchTotals();
    fetchTopSelling();

  }, []);



  const topSellingData = {
    labels: topSelling.map(product => product.product_name),
    datasets: [
      {
        label: 'Top Selling Products',
        data: topSelling.map(product => product.totalQuantity),
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };



  const topSellingOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Top Selling Products',
      },
    },
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Dashboard</h1>
      <div className="grid grid-cols-2 gap-6">
        <div className=" border border-blue-200 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-blue-800">Total Products</h2>
          <p className="text-xl text-blue-700 mt-2">{totals.totalProducts}</p>
        </div>
        <div className=" border border-blue-200 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-blue-800">Total Categories</h2>
          <p className="text-xl text-blue-700 mt-2">{totals.totalCategories}</p>
        </div>
        <div className=" border border-blue-200 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-blue-800">Total Brands</h2>
          <p className="text-xl text-blue-700 mt-2">{totals.totalBrands}</p>
        </div>
        <div className=" border border-blue-200 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-blue-800">Total Orders This Month</h2>
          <p className="text-xl text-blue-700 mt-2">{totals.totalOrdersThisMonth}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
        <div className="p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-black-800 mb-4">Top Selling Products Previous Month</h2>
          <Bar data={topSellingData} options={topSellingOptions} />
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
