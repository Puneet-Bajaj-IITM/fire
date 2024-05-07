import React, { useEffect, useState } from "react";
import GeoLogo from "./assets/2024-logo-landscape-red-dark.png";
import "./ResultsHeader.css";

function ResultsHeader() {
  const [companyName, setCompanyName] = useState("");
  const [companyEmail, setCompanyEmail] = useState("");

  useEffect(() => {
    const cookieName = "DigitalNeedsAssessment";
    const cookieExists = checkCookie(cookieName);

    if (cookieExists) {
      console.log(`Cookie "${cookieName}" exists.`);
      // Retrieve and use the cookie data if needed
      const retrievedData = getCookie(cookieName);
      setCompanyName(retrievedData.businessName);
      setCompanyEmail(retrievedData.industry);
      console.log("Retrieved JSON data:", retrievedData);
    } else {
      console.log(`Cookie "${cookieName}" does not exist.`);
    }
  }, []);

  function getCookie(name) {
    const cookieString = document.cookie;
    const cookies = cookieString.split(";");

    for (let cookie of cookies) {
      const [cookieName, cookieValue] = cookie.split("=");
      if (cookieName.trim() === name) {
        const decodedValue = decodeURIComponent(cookieValue);
        return JSON.parse(decodedValue);
      }
    }

    return null; // Cookie not found
  }

  function checkCookie(cookieName) {
    const cookieString = document.cookie;
    const cookies = cookieString.split(";");

    for (let cookie of cookies) {
      const [name, value] = cookie.split("=");
      if (name.trim() === cookieName) {
        return true; // Found the cookie
      }
    }

    return false; // Cookie not found
  }

  return (
    <>
      <div style={{display:'flex', width:'100%', justifyContent:'space-between', alignItems:'baseline', marginTop:'25px', marginBottom:'5px'}}>
        <img className="header-logo" alt="logo" src={GeoLogo}></img>
        <div>
          <p>www.geodigitalpartners.com</p>
        </div>
      </div>
      <div className="header-divider"></div>
      <div className="assessment-overview">
        <div style={{marginTop:'5px', marginBottom:'5px'}}>
        <div style={{fontSize:'14px'}}>{companyName}</div>
        <div style={{fontSize:'14px'}}>{companyEmail}</div>
        </div>
        <h1 className="header">Digital Adoption Growth Assessment Results</h1>
        <p className="overview" >
          This report evaluates your digital performace in eight crucial areas,
          comparing it to industry benchmarks for success in today's digital
          age. It also highlights key priorities and areas to concentrate on as
          you begin your journey of digital evolution and competitiveness.
        </p>
      </div>
    </>
  );
}

export default ResultsHeader;
