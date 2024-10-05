import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../SideBar Pages/SideBar-CSS/RegisteredCompanies.css'; // Import the CSS file for styling

const RegisteredCompanies = () => {
    const [companies, setCompanies] = useState([]);
    const [openDropdown, setOpenDropdown] = useState({}); // Track which dropdown is open

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

    const toggleDropdown = (index) => {
        setOpenDropdown(prevState => ({
            ...prevState,
            [index]: !prevState[index],
        }));
    };

    return (
        <div className="table-container">
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
                        companies.reduce((acc, company, index) => {
                            // Group companies into sets of 5
                            const groupIndex = Math.floor(index / 5);
                            if (!acc[groupIndex]) {
                                acc[groupIndex] = [];
                            }
                            acc[groupIndex].push(company);
                            return acc;
                        }, []).map((group, groupIndex) => (
                            <React.Fragment key={groupIndex}>
                                <tr onClick={() => toggleDropdown(groupIndex)} style={{ cursor: 'pointer' }}>
                                    <td colSpan="6" className='textColor'>Show Companies {groupIndex * 5 + 1} to {Math.min((groupIndex + 1) * 5, companies.length)}</td>
                                </tr>
                                {openDropdown[groupIndex] && group.map((company) => (
                                    <tr key={company.id} className='textColor'>
                                        <td  className='textColor'>{company.id}</td>
                                        <td className='textColor'>{company.companyName}</td>
                                        <td className='textColor'>{`${company.contactPersonName} ${company.contactPersonSurname}`}</td>
                                        <td className='textColor'>{company.contactPersonNumber}</td>
                                        <td className='textColor'>{company.email}</td>
                                        <td className='textColor'>{company.entityNumber}</td>
                                    </tr>
                                ))}
                            </React.Fragment>
                        ))
                    )}
                </tbody>
            </table>
        </div>
        </div>
    );
};

export default RegisteredCompanies;