import { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const [totals, setTotals] = useState({});
  const [topSelling, setTopSelling] = useState([]);
  const [monthlySales, setMonthlySales] = useState([]);

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

    const fetchMonthlySales = async () => {
      try {
        const { data } = await axios.get('http://localhost:8800/server/dashboard/monthly-sales');
        setMonthlySales(data);
      } catch (error) {
        console.error("Error fetching monthly sales:", error);
      }
    };

    fetchTotals();
    fetchTopSelling();
    fetchMonthlySales();
  }, []);

  const monthlySalesData = {
    labels: monthlySales.map(sale => `Month ${sale.month}`),
    datasets: [
      {
        label: 'Monthly Sales',
        data: monthlySales.map(sale => sale.totalSales),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

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

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Monthly Sales',
      },
    },
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
      <h1 className="text-3xl font-extrabold mb-8 text-gray-800">Dashboard</h1>
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-gray-700">Total Products</h2>
          <p className="text-xl text-gray-600 mt-2">{totals.totalProducts}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-gray-700">Total Categories</h2>
          <p className="text-xl text-gray-600 mt-2">{totals.totalCategories}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-gray-700">Total Brands</h2>
          <p className="text-xl text-gray-600 mt-2">{totals.totalBrands}</p>
        </div>
      </div>
      <h2 className="text-2xl font-bold mt-10 mb-4 text-gray-800">Top Selling Products</h2>
      <ul className="list-disc pl-5 text-lg text-gray-600">
        {Array.isArray(topSelling) && topSelling.length > 0 ? (
          topSelling.map((product, index) => (
            <li key={index}>{product.product_name} - {product.totalQuantity}</li>
          ))
        ) : (
          <li>No data available</li>
        )}
      </ul>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">Top Selling Products Chart</h2>
          <Bar data={topSellingData} options={topSellingOptions} />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">Monthly Sales</h2>
          <Bar data={monthlySalesData} options={options} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
