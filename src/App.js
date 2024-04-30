import React, { useEffect, useState } from "react";
import "./App.css";
import FacebookLogin from 'react-facebook-login';

const LeadDataTable = ({ leadData }) => {
  return (
    <div>
      <h2>Lead Data</h2>
      {leadData && leadData.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Sl no.</th>
              <th>Created At</th>
              <th>LeadGen ID</th>
              <th>Page ID</th>
            </tr>
          </thead>
          <tbody>
            {leadData.map((lead, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{lead.createdTime}</td>
                <td>{lead.leadgenId}</td>
                <td>{lead.pageId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No lead data available.</p>
      )}
    </div>
  );
};

const App = () => {
  const [leadData, setLeadData] = useState(null);

  useEffect(() => {
    const fetchLeadData = async () => {
      try {
        const response = await fetch(
          "https://facebook-leads-backend.onrender.com/getLeadData"
        );
        if (!response.ok) {
          throw new Error(`Failed to fetch data. Status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Received data:", data);
        setLeadData(data);
      } catch (error) {
        console.error("Error fetching lead data:", error.message);
      }
    };

    fetchLeadData();
  }, []);

  const responseFacebook = (response) => {
    if (response.accessToken) {
      console.log("User logged in successfully");
      // Fetch lead data using response.accessToken
      // Make sure to handle errors and fetch data accordingly
    } else {
      console.log("User cancelled login or did not fully authorize.");
    }
  };

  return (
    <div>
      <LeadDataTable leadData={leadData} />
      <FacebookLogin
        appId="1069296774173255"
        autoLoad={false}
        fields="name,email,picture"
        callback={responseFacebook}
        cssClass="facebook-login-button"
      />
    </div>
  );
};

export default App;
