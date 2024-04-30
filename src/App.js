import React, { useEffect, useState } from "react";
import "./App.css";
// import FacebookLogin from 'react-facebook-login';

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

  useEffect(() => {
    // Initialize Facebook SDK
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: "1069296774173255",
        cookie: true,
        xfbml: true,
        version: "v19.0",
      });
    };

    // Load the SDK asynchronously
    (function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s);
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
  }, []);

  const loginWithFacebook = () => {
    window.FB.login(
      function (response) {
        if (response.authResponse) {
          console.log("User logged in successfully");
          // Handle the login response
          // You can fetch additional user data using response.authResponse.accessToken
        } else {
          console.log("User cancelled login or did not fully authorize.");
        }
      },
      { scope: "pages_manage_ads" } // Specify the permissions you need
    );
  };

  return (
    <div>
      <LeadDataTable leadData={leadData} />
      <button onClick={loginWithFacebook}>Login with Facebook</button>
    </div>
  );
};

export default App;
