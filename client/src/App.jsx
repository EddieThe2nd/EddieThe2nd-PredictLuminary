// src/App.jsx
// import './App.css';
import Dashboard from './Components/Dashboard/Dashboard';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import UserPage from './Components/Register/User Section/UserPage'; // Adjust the path as necessary
import RegisterCompany from './Components/Dashboard/Components/SideBar Pages/RegisterCompany';
import RegisteredCompanies from './Components/Dashboard/Components/SideBar Pages/RegisteredCompanies';
import TransactionsPage from './Components/Dashboard/Components/SideBar Pages/TransactionsPages'; // Adjust the import path
import CustomersPage from './Components/Dashboard/Components/SideBar Pages/CustomersPage';
import GmailNotification from './Components/Dashboard/Components/Body Section/Top Section/GmailNotifications';
import Activity from './Components/Dashboard/Components/Body Section/Activity Section/Activity';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { FileProvider } from './Components/Register/User Section/Functions/FileContext'; // Adjust the path as necessary
import OtpForm from './Components/ForgotPassword/OtpForm';
import ResetPassword from './Components/ForgotPassword/ResetPassword';

// Create the router
const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />
  },
  {
    path: '/register',
    element: <Register />
  },
  {
    path: '/dashboard',
    element: <Dashboard />
  },
  {
    path: '/user-page/*', // Use a wildcard to handle nested routes
    element: <UserPage />
  },
  {
    path: '/register-company',
    element: <RegisterCompany />
  },
  {
    path: '/registered-companies',
    element: <RegisteredCompanies />
  },
  {
    path: '/transactions',
    element: <TransactionsPage />
  },
  {
    path: '/customer',
    element: <CustomersPage />
  },
  {
    path: '/gmail-notification',
    element: <GmailNotification />
  },
  {
    path: '/recent-login-activity',
    element: <Activity />
  },
  {
    path: '/OtpForm',
    element: <OtpForm />
  },
  {
    path: '/ResetPassword',
    element: <ResetPassword />
  },
  
 
]);

function App() {
  return (
    <FileProvider>
      <RouterProvider router={router} />
    </FileProvider>
  );
}

export default App;
