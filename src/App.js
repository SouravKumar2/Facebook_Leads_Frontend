import React, { useEffect, useState } from "react";
import "./App.css";

const LeadDataTable = ({ leadData }) => {
  return (
    <div>
      <h2>Lead Data</h2>
      {leadData && leadData.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Sl no.</th>
              <th>Ad Group ID</th>
              <th>Ad ID</th>
              <th>Created At</th>
              <th>LeadGen ID</th>
              <th>Page ID</th>
              <th>Form ID</th>
              <th>User Data</th>
              {/* Add more headers as needed */}
            </tr>
          </thead>
          <tbody>
            {leadData.map((lead, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{lead.adgroupId}</td>
                <td>{lead.adId}</td>
                <td>{lead.createdTime}</td>
                <td>{lead.leadgenId}</td>
                <td>{lead.pageId}</td>
                <td>{lead.formId}</td>
                {/* Add more cells as needed */}
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

  const loginWithFacebook = () => {
    window.FB.login(
      function (response) {
        if (response.authResponse) {
          console.log("User logged in successfully");
          // Fetch lead data using response.authResponse.accessToken
          // Make sure to handle errors and fetch data accordingly
        } else {
          console.log("User cancelled login or did not fully authorize.");
        }
      },
      {
        scope: "email",
      }
    );
  };

  useEffect(() => {
    const initializeFacebookSDK = () => {
      window.fbAsyncInit = function () {
        window.FB.init({
          appId: "1042559036824480",
          cookie: true,
          xfbml: true,
          version: "v19.0",
        });

        window.dispatchEvent(new Event("fb-sdk-initialized"));
      };

      (function (d, s, id) {
        var js,
          fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s);
        js.id = id;
        js.src = "https://connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
      })(document, "script", "facebook-jssdk");

      window.addEventListener("fb-sdk-initialized", loginWithFacebook);

      return () => {
        window.removeEventListener("fb-sdk-initialized", loginWithFacebook);
      };
    };

    initializeFacebookSDK();
  }, []);

  return (
    <div>
      <LeadDataTable leadData={leadData} />
      <button onClick={loginWithFacebook}>Login with Facebook</button>
    </div>
  );
};

export default App;
