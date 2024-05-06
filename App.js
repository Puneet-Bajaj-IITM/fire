import React, { useState, useEffect } from "react";
import SurveyComponent from "./SurveyComponent";
import Footer from "./Footer";
import PrivacyPolicy from "./PrivacyPolicy";
import TermsOfUse from "./TermsOfUse";
import InboundSignup from "./Auth/Auth.js"
import { Helmet } from 'react-helmet';
import { BrowserRouter as Router, Route, Navigate, Routes } from 'react-router-dom';


function App() {
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);

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
    setShowPrivacyModal(true)
  };

  const closePrivacyModal = () => {
    setShowPrivacyModal(false);
  };

  const [showTermsModal, setShowTermsModal] = useState(false);

  const openTermsModal = () => {
    setShowTermsModal(true)
  };

  const closeTermsModal = () => {
    setShowTermsModal(false);
  };

  const Report = () => {
    return (
      <div className="App">
        <SurveyComponent />
        <Footer openPrivacyModal={openPrivacyModal} openTermsModal={openTermsModal} />
        {showPrivacyModal && <PrivacyPolicy onClose={closePrivacyModal} />}
        {showTermsModal && <TermsOfUse onClose={closeTermsModal} />}
      </div>
    )
  }

  const Home = () => {
    return <InboundSignup />
  }

  return (
    <>
      <Helmet>
        <link rel="stylesheet" type="text/css" href="css/normalize.css" />
        <link rel="stylesheet" type="text/css" href="css/webflow.css" />
        <link rel="stylesheet" type="text/css" href="css/static-form-template.webflow.css" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
        <script src="https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js" />
        {/* <script type="text/javascript">{`
          WebFont.load({
            google: {
              families: [
                "Montserrat:100,100italic,200,200italic,300,300italic,400,400italic,500,500italic,600,600italic,700,700italic,800,800italic,900,900italic",
                "Bitter:400,700,400italic"
              ]
            }
          });
        `}</script> */}
      </Helmet>
      {/* <Home/> */}
      <Router>
        <Routes>
          <Route exact path="/" Component={<Navigate to={"./Auth/index.html"} />}>
            {/* <Navigate push to={"./Auth/index.html"} /> */}
          </Route>
          <Route exact path='/report' Component={Report} />
          </Routes>
      </Router>
    </>
  );
}

export default App;
