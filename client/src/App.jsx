// src/App.jsx

import './App.css';
import Dashboard from './Components/Dashboard/Dashboard';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import UserPage from './Components/Register/User Section/UserPage'; // Adjust the path as necessary
import RegisterCompany from './Components/Dashboard/Components/SideBar Pages/RegisterCompany';
import RegisteredCompanies from './Components/Dashboard/Components/SideBar Pages/RegisteredCompanies';
import TransactionsPage from './Components/Dashboard/Components/SideBar Pages/TransactionsPages'; // Adjust the import path
import ForgotPasswordProcess from './Components/ForgotPassword/ForgotPasswordProcess'; // Adjust the path as necessary

// Import React Router DOM
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { FileProvider } from './Components/Register/User Section/Functions/FileContext'; // Adjust the path as necessary

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
  }
  // {
  //   path: '/forgot-password',
  //   element: <ForgotPasswordProcess /> // Route for forgot password feature
  // }
]);

function App() {
  return (
    <FileProvider>
      <RouterProvider router={router} />
    </FileProvider>
  );
}

export default App;
