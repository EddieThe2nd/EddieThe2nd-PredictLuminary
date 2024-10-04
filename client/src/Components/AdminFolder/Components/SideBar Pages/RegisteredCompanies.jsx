import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../SideBar Pages/SideBar-CSS/RegisteredCompanies.css'; // Import the CSS file for styling

const RegisteredCompanies = () => {
    const [companies, setCompanies] = useState([]);

    useEffect(() => {
        fetchCompanies();
    }, []);

    const fetchCompanies = async () => {
        try {
            const response = await axios.get('http://localhost:3002/registering-companies');
            console.log('Fetched companies:', response.data); // Log the fetched data
            setCompanies(response.data);
        } catch (error) {
            console.error('Error fetching registering companies:', error);
        }
    };

    return (
        <div className="registered-companies-container">
            <h2>Registered Companies</h2>
            <table className="registered-companies-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Company Name</th>
                        <th>Contact Person</th>
                        <th>Contact Number</th>
                        <th>Email</th>
                        <th>Entity Number</th>
                    </tr>
                </thead>
                <tbody>
                    {companies.length === 0 ? (
                        <tr>
                            <td colSpan="6">No registered companies found.</td>
                        </tr>
                    ) : (
                        companies.map((company) => (
                            <tr key={company.id}>
                                <td>{company.id}</td>
                                <td>{company.companyName}</td>
                                <td>{`${company.contactPersonName} ${company.contactPersonSurname}`}</td>
                                <td>{company.contactPersonNumber}</td>
                                <td>{company.email}</td>
                                <td>{company.entityNumber}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default RegisteredCompanies;