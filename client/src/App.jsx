// src/App.jsx
// import './App.css';
import AdminDashboard from './Components/AdminFolder/Dashboard';
import Login from './Components/Login/Login';
import Register from './Components/UserFolder/Register/Register';
import UserPage from './Components/UserFolder/Register/User Section/UserPage'; // Adjust the path as necessary
import RegisterCompany from './Components/AdminFolder/Components/SideBar Pages/RegisterCompany';
import RegisteredCompanies from './Components/AdminFolder/Components/SideBar Pages/RegisteredCompanies';
import TransactionsPage from './Components/AdminFolder/Components/SideBar Pages/TransactionsPages'; // Adjust the import path
import CustomersPage from './Components/AdminFolder/Components/SideBar Pages/CustomersPage';
import GmailNotification from './Components/AdminFolder/Components/Body Section/Top Section/GmailNotifications';
import Activity from './Components/AdminFolder/Components/Body Section/Activity Section/Activity';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { FileProvider } from './Components/UserFolder/Register/User Section/Functions/FileContext'; // Adjust the path as necessary
import OtpForm from './Components/UserFolder/ForgotPassword/OtpForm';
import ResetPassword from './Components/UserFolder/ForgotPassword/ResetPassword';
import LandingPage from './Components/Main/LandingPage';
import About from './Components/UserFolder/Register/User Section/Pages/About';

// Create the router
const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/register',
    element: <Register />
  },
  {
    path: '/dashboard',
    element: <AdminDashboard />
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
  {
    path: '/About',
    element: <About />
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
