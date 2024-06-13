import { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

function Reports() {
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const [month, setMonth] = useState((new Date().getMonth() + 1).toString());
  const [topItemsReport, setTopItemsReport] = useState([]);
  const [expiringMedicines, setExpiringMedicines] = useState([]);
  const barChartRef = useRef(null);
  const tableRef = useRef(null);

  useEffect(() => {
    generateReports();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [year, month]);

  const generateReports = async () => {
    try {
      const topItemsResponse = await axios.get(`http://localhost:8800/server/reports/top3-items`, {
        params: { year, month: parseInt(month) }
      });
      const expiringMedicinesResponse = await axios.get(`http://localhost:8800/server/reports/expiring-medicines`);

      setTopItemsReport(topItemsResponse.data);
      setExpiringMedicines(expiringMedicinesResponse.data);
    } catch (error) {
      console.error('Error fetching reports:', error);
    }
  };

  const generatePDF = useCallback((reportType) => {
    const doc = new jsPDF();

    // Center the report details
    const pageWidth = doc.internal.pageSize.getWidth();
    const title = 'Nirogya Pharmacy';
    const address = 'Address: No 83, MEENNANA, GETAHETTA';
    const reportPeriod = `Report for: ${year}-${monthToName(month)}`;
    const issueDate = `Report issued date: ${new Date().toLocaleDateString()}`;
    const reportTitle = reportType === 'topItems' ? 'Top 3 Sold Items Report' :
                        'Expiring Medicines Report';

    doc.setFontSize(16);
    doc.text(title, pageWidth / 2, 20, { align: 'center' });
    doc.setFontSize(12);
    doc.text(address, pageWidth / 2, 30, { align: 'center' });
    doc.text(reportPeriod, pageWidth / 2, 40, { align: 'center' });
    doc.text(issueDate, pageWidth / 2, 50, { align: 'center' });
    doc.setFontSize(14);
    doc.text(reportTitle, pageWidth / 2, 60, { align: 'center' });

    const barChartInstance = barChartRef.current;
    const tableElement = tableRef.current;

    if (reportType === 'topItems' && barChartInstance && barChartInstance.toBase64Image) {
      doc.addImage(barChartInstance.toBase64Image(), 'JPEG', 10, 70, 180, 80);
    } else if (reportType === 'expiringMedicines' && tableElement) {
      // Convert the table to an image and add it to the PDF
      doc.autoTable({
        html: tableElement,
        startY: 70,  // Adjusted to start the table right after the header
        margin: { top: 70 },
        headStyles: { fillColor: [0, 0, 0] },
        bodyStyles: { fillColor: [255, 255, 255] },
        alternateRowStyles: { fillColor: [245, 245, 245] }
      });
    }

    doc.save(`report_${reportType}.pdf`);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [year, month, barChartRef, expiringMedicines]);

  const monthToName = (month) => {
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    return monthNames[parseInt(month) - 1];
  };

  const handleMonthChange = (e) => {
    const value = parseInt(e.target.value);
    if (value >= 1 && value <= 12) {
      setMonth(e.target.value);
    } else {
      alert("Please enter a month between 1 and 12.");
    }
  };

  return (
    <div className="container mx-auto mt-10 px-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Reports</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-gray-700">Year:</label>
          <input 
            type="text" 
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={year} 
            onChange={(e) => setYear(e.target.value)} 
          />
        </div>
        <div>
          <label className="block text-gray-700">Month (1-12):</label>
          <input 
            type="number" 
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={month} 
            onChange={handleMonthChange} 
            min="1"
            max="12"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        {topItemsReport.length > 0 && (
          <div>
            <h3 className="text-xl font-medium mb-4">Top 3 Sold Items Chart</h3>
            <Bar 
              ref={barChartRef} 
              data={{
                labels: topItemsReport.map(item => item.product_name),
                datasets: [{
                  label: 'Total Quantity Sold',
                  data: topItemsReport.map(item => item.total_quantity),
                  backgroundColor: 'rgba(153,102,255,0.6)',
                }]
              }} 
            />
            <button 
              className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition duration-300 mt-4"
              onClick={() => generatePDF('topItems')}
            >
              Download Top 3 Sold Items PDF
            </button>
          </div>
        )}

        {expiringMedicines.length > 0 && (
          <div>
            <h3 className="text-xl font-medium mb-4">Medicines Expiring in 3 Months</h3>
            <table ref={tableRef} className="min-w-full bg-white border border-gray-200">
            <thead>
                <tr>
                  <th className="py-2 px-4 border-b">Product Name</th>
                  <th className="py-2 px-4 border-b">Expiration Date</th>
                </tr>
              </thead>
              <tbody>
                {expiringMedicines.map((item, index) => (
                  <tr key={index}>
                    <td className="py-2 px-4 border-b">{item.product_name}</td>
                    <td className="py-2 px-4 border-b">{new Date(item.exp_date).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button 
              className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition duration-300 mt-4"
              onClick={() => generatePDF('expiringMedicines')}
            >
              Download Expiring Medicines PDF
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Reports;

                
