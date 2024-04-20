import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar, Line, Doughnut } from 'react-chartjs-2';
import AdminLayout from "../../components/adminLayout"

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Tooltip,
  Legend
);

const lineData = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June'],
  datasets: [
    {
      label: 'Total Visits',
      data: [65, 59, 80, 81, 56, 55],
      borderColor: 'rgb(75, 192, 192)',
      backgroundColor: 'rgba(75, 192, 192, 0.5)',
    }
  ]
};

const barData = {
  labels: ['Products', 'Orders', 'Doctors', 'Approvals'],
  datasets: [
    {
      label: 'Count',
      data: [150, 45, 23, 23],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)'
      ],
      borderWidth: 1
    }
  ]
};

const doughnutData = {
  labels: ['Products', 'Orders', 'Doctors', 'Approvals'],
  datasets: [
    {
      label: '# of Votes',
      data: [150, 45, 23, 23],
      backgroundColor: [
        'rgba(255, 99, 132, 0.5)',
        'rgba(54, 162, 235, 0.5)',
        'rgba(255, 206, 86, 0.5)',
        'rgba(75, 192, 192, 0.5)'
      ],
      hoverOffset: 4
    }
  ]
};

const AdminDashboard = () => {
  return (
    <>
      <AdminLayout>
        <div className="p-4">
          <h1 className="text-3xl font-bold text-gray-700">Admin Dashboard</h1>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Card 1 */}
            <div className="card w-64 h-44 bg-base-100">
              <div className="card-body">
                <h2 className="card-title">Products</h2>
                <p>150</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary">View</button>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="card w-64 h-44 bg-base-100">
              <div className="card-body">
                <h2 className="card-title">Orders</h2>
                <p>45 orders</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary">View</button>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="card w-64 h-44 bg-base-100">
              <div className="card-body">
                <h2 className="card-title">Approved Doctors</h2>
                <p>23</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary">View</button>
                </div>
              </div>
            </div>

            {/* Card 4 */}
            <div className="card w-64 h-44 bg-base-100">
              <div className="card-body">
                <h2 className="card-title">Pending Approvals</h2>
                <p>23</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary">View</button>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 bg-white rounded shadow">
              <h2 className="text-lg font-medium text-gray-700">Visits Over Time</h2>
              <Line data={lineData} />
            </div>
            <div className="p-4 bg-white rounded shadow">
              <h2 className="text-lg font-medium text-gray-700">Summary Counts</h2>
              <Bar data={barData} options={{ indexAxis: 'y' }} />
            </div>
            <div className="p-4 bg-white rounded shadow">
              <h2 className="text-lg font-medium text-gray-700">Distribution</h2>
              <Doughnut data={doughnutData} />
            </div>
          </div>
        </div>
      </AdminLayout>
    </>
  )
}

export default AdminDashboard