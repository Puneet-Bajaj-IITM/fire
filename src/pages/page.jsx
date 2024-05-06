import React, { useState, useEffect } from "react";
import SurveyComponent from "../SurveyComponent";
import Footer from "../Footer";
import PrivacyPolicy from "../PrivacyPolicy";
import TermsOfUse from "../TermsOfUse";
import { useNavigate } from "react-router-dom";

function ReportPage() {
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const navigate = useNavigate()

  useEffect(() => {
    const cookieName = "DigitalNeedsAssessment";
    const cookieExists = checkCookie(cookieName);

    if (cookieExists) {
      console.log(`Cookie "${cookieName}" exists.`);
      // Retrieve and use the cookie data if needed
      const retrievedData = getCookie(cookieName);
      console.log("Retrieved JSON data:", retrievedData);
    } else {
      console.log(`Cookie "${cookieName}" does not exist.`);
      navigate('/')
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

//   useEffect(() => {
//     const cookieName = "DigitalNeedsAssessment";
//     document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;

//     console.log("done");
//   }, []);

  // useEffect(() => {

  //   const jQueryScript = document.createElement('script');
  //   jQueryScript.src = 'https://code.jquery.com/jquery-3.6.4.min.js';
  //   jQueryScript.async = true;
  //   document.body.appendChild(jQueryScript);

  //   // Load jQuery Validation
  //   const validationScript = document.createElement('script');
  //   validationScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.19.3/jquery.validate.min.js';
  //   validationScript.async = true;
  //   document.body.appendChild(validationScript);

  //   // Your jQuery-dependent scripts
  //   const customScript = document.createElement('script');
  //   customScript.innerHTML = `
  //     // Your jQuery-dependent scripts go here
  //     $(".field").on("focusin", function () {
  //       $(this).siblings(".field_label").removeClass("large");
  //     });
  //     $(".field").on("focusout", function () {
  //       if ($(this).val().length == 0) {
  //         $(this).siblings(".field_label").addClass("large");
  //       }
  //     });
  //     // Form validation using jQuery Validation
  //     $("#contact-form").validate({
  //       rules: {
  //         projectBudget: {
  //           required: true
  //         },
  //         Phone: {
  //           required: true,
  //           phoneUS: true
  //         }
  //       },
  //       errorPlacement: function (error, element) {
  //         error.appendTo(element.closest(".field_wrap"));
  //       }
  //     });
  //     // Form submission check
  //     $(document).ready(function () {
  //       $('form').submit(function (event) {
  //         var dropdownValue = $('#industry-select').val();
  //         // Check if the selected value is the default "Select one..."
  //         if (dropdownValue === 'Select one...') {
  //           alert('Please tell us which industry you are in before submitting the form.');
  //           event.preventDefault(); // Prevent form submission
  //         }
  //       });
  //     });
  //   `;
  //   document.body.appendChild(customScript);
  // }, []); // Empty dependency array ensures the effect runs only once after the initial render

  const openPrivacyModal = () => {
    setShowPrivacyModal(true);
  };

  const closePrivacyModal = () => {
    setShowPrivacyModal(false);
  };

  const [showTermsModal, setShowTermsModal] = useState(false);

  const openTermsModal = () => {
    setShowTermsModal(true);
  };

  const closeTermsModal = () => {
    setShowTermsModal(false);
  };

  return (
    <div className="App">
      <SurveyComponent />
      {/* <Footer openPrivacyModal={openPrivacyModal} openTermsModal={openTermsModal} />
      {showPrivacyModal && <PrivacyPolicy onClose={closePrivacyModal} />}
      {showTermsModal && <TermsOfUse onClose={closeTermsModal} />} */}
    </div>
  );
}

export default ReportPage;
