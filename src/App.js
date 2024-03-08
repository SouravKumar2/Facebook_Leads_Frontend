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
              <th>Leadgen ID</th>
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
                {/* <td>{lead.userData}</td> */}
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
        console.log("Received data:", data); // Add this line
        setLeadData(data);
      } catch (error) {
        console.error("Error fetching lead data:", error.message);
      }
      // console.log(leadData.userData, "new Data");
    };

    fetchLeadData();
  }, []);

  useEffect(() => {
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: "1042559036824480",
        cookie: true,
        xfbml: true,
        version: "v19.0", // use the latest version available
      });

      // Trigger a custom event after SDK initialization
      window.dispatchEvent(new Event("fb-sdk-initialized"));
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
        // handle the response
        if (response.authResponse) {
          console.log("User logged in successfully");
          // Fetch user data or perform other actions after successful login
        } else {
          console.log("User cancelled login or did not fully authorize.");
        }
      },
      { scope: "email" }
    ); // Specify additional permissions if needed
  };

  return (
    <div>
      <LeadDataTable leadData={leadData} />
      <button onClick={loginWithFacebook}>Login with Facebook</button>
    </div>
  );
};

export default App;
