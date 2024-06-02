import  { useState, useEffect } from 'react';


const Dashboard = () => {
  const [dailySales, setDailySales] = useState(0);
  const [monthlySales, setMonthlySales] = useState(0);
  const [stockLevels, setStockLevels] = useState([]);

  useEffect(() => {
    // Fetch data from backend API
    const fetchData = async () => {
      try {
        const response = await fetch('/api/dashboard-data'); // Replace with your actual API endpoint
        const data = await response.json();

        setDailySales(data.dailySales);
        setMonthlySales(data.monthlySales);
        setStockLevels(data.stockLevels);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold underline mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Daily Sales Card */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Daily Sales</h2>
          <p className="text-2xl font-bold text-blue-500">{dailySales}</p>
        </div>

        {/* Monthly Sales Card */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Monthly Sales</h2>
          <p className="text-2xl font-bold text-green-500">{monthlySales}</p>
        </div>

        {/* Stock Levels Card */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Stock Levels</h2>
          <ul>
            {stockLevels.map((item) => (
              <li key={item.product} className="flex justify-between mb-2">
                <span>{item.product}</span>
                <span className="font-semibold">{item.quantity}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;