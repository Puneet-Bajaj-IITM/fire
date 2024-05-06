import { useEffect, useState } from "react";

import "../App.css";
import AOS from "aos";
import "aos/dist/aos.css";
import logo from "../assets/2024-logo-landscape-red-white-p-500.png";
import { IoIosChatboxes, IoIosClose } from "react-icons/io";
import Modal from "../Modal";
import { useNavigate } from "react-router-dom";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { app } from "../config/firebase";

function HomePage() {
  const db = getFirestore(app)
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const toggleModal = () => {
    setShowModal(!showModal);
  };
  const [clickedInputs, setClickedInputs] = useState({
    revenue: null,
    lookingFor: null,
    location: null,
  });

  useEffect(() => {
    const cookieName = "DigitalNeedsAssessment";
    const cookieExists = checkCookie(cookieName);

    if (cookieExists) {
      console.log(`Cookie "${cookieName}" exists.`);
      navigate('/report')
      // Retrieve and use the cookie data if needed
      const retrievedData = getCookie(cookieName);
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

  useEffect(() => {
    AOS.init();
  }, []);

  const handleInputClick = (inputType, id) => {
    setClickedInputs((prevState) => ({
      ...prevState,
      [inputType]: prevState[inputType] === id ? null : id,
    }));
  };

  const isClicked = (inputType, id) => clickedInputs[inputType] === id;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = {
        fullName: e.target.elements.fullname.value,
        businessName: e.target.elements.businessname.value,
        businessEmail: e.target.elements.businessemail.value,
        phoneNumber: e.target.elements.phonenumber.value,
        revenue: clickedInputs.revenue,
        lookingFor: clickedInputs.lookingFor,
        location: clickedInputs.location,
        industry: e.target.elements.location.value,
        grant: clickedInputs.grant,
      };

      const jsonCookiesString = JSON.stringify(formDataToSend);

      // Set cookie expiration (optional)
      const expirationDate = new Date();
      expirationDate.setDate(expirationDate.getFullYear()  + 1); // Expires in 1 year

      // Encode the JSON string to handle special characters
      const encodedData = encodeURIComponent(jsonCookiesString);

      // Construct the cookie string
      const cookieString = `DigitalNeedsAssessment=${encodedData}; expires=${expirationDate.toUTCString()}; path=/`;

      // Set the cookie
      document.cookie = cookieString;

      console.log("Data saved in cookie:", cookieString);
      await addDoc(collection(db, "data"), formDataToSend)
      .then(()=> {
        console.log('data uploaded')
        navigate("/report");
      })
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <div className="bg-[#0E142B] relative text-white p-8 flex flex-col items-center">
        <div className="flex items-center gap-2 p-2 mb-6">
          <img className="w-48" src={logo} alt="" />
        </div>
        <div className="bg-[#0E142B] w-full md:w-full lg:w-8/12 border-white border rounded-2xl p-8   equal-shadow">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <div
                data-aos="fade-up"
                data-aos-offset="200"
                data-aos-easing="ease-in-sine"
                data-aos-duration="600"
                data-aos-delay="500"
              >
                <input
                  type="text"
                  name="fullname"
                  placeholder="Full Name"
                  className="w-full p-2 mb-4 focus:outline-none border-white border rounded-3xl bg-inherit placeholder:text-white text-center"
                />
              </div>
              <div
                data-aos="fade-up"
                data-aos-offset="200"
                data-aos-easing="ease-in-sine"
                data-aos-duration="600"
                data-aos-delay="1500"
              >
                <input
                  type="text"
                  name="businessname"
                  placeholder="Business Name"
                  className="w-full p-2 mb-4 focus:outline-none border-white border rounded-3xl bg-inherit placeholder:text-white text-center"
                />
              </div>
              <div
                data-aos="fade-up"
                data-aos-offset="200"
                data-aos-easing="ease-in-sine"
                data-aos-duration="600"
                data-aos-delay="2500"
              >
                <input
                  type="text"
                  name="businessemail"
                  placeholder="Business Email Address"
                  className="w-full p-2 mb-4 focus:outline-none border-white border rounded-3xl bg-inherit placeholder:text-white text-center"
                />
              </div>
              <div
                data-aos="fade-up"
                data-aos-offset="200"
                data-aos-easing="ease-in-sine"
                data-aos-duration="600"
                data-aos-delay="3000"
              >
                <input
                  type="text"
                  name="phonenumber"
                  placeholder="Phone Number"
                  className="w-full p-2 mb-4 focus:outline-none border-white border rounded-3xl bg-inherit placeholder:text-white text-center"
                />
              </div>
            </div>

            <div
              data-aos="fade-up"
              data-aos-offset="200"
              data-aos-easing="ease-in-sine"
              data-aos-duration="600"
              data-aos-delay="500"
              className="flex flex-col mt-4 mb-4 items-center"
            >
              <p className="text-center mb-4">
                Company annual revenue for the last 12 months?
              </p>
              <div className="flex items-center justify-center">
                {/* <input
                
                  type="text"
                  id="over500"
                  name="revenue"
                  className={`w-full mr-2 p-2 text-xs md:text-lg  focus:outline-none focus:bg-[#117FC5] cursor-pointer border-white border rounded-3xl bg-inherit placeholder:text-white text-center caret-transparent ${
                    isClicked('revenue', 'over500') && 'clicked-input'
                  }`}
                  placeholder="Over 500k"
                  onClick={() => handleInputClick('revenue', 'over500')}
                /> */}
                <div
                  id="over500"
                  className={` mr-2 p-2 pr-5 pl-5 text-xs md:text-lg focus:outline-none focus:bg-[#117FC5] cursor-pointer border-white border rounded-3xl bg-inherit placeholder:text-white text-center caret-transparent ${
                    isClicked("revenue", "over500") && "clicked-input"
                  }`}
                  placeholder="Over 500k"
                  onClick={() => handleInputClick("revenue", "over500")}
                >
                  Over 500k
                </div>

                {/* <input
                  type="text"
                  id="lessThan500"
                  name="revenue"
                  className={`w-full p-2 text-xs md:text-lg focus:outline-none focus:bg-[#117FC5] cursor-pointer border-white border rounded-3xl bg-inherit placeholder:text-white text-center caret-transparent ${
                    isClicked('revenue', 'lessThan500') && 'clicked-input'
                  }`}
                  placeholder="Less than 500k"
                  onClick={() => handleInputClick('revenue', 'lessThan500')}
                /> */}
                <div
                  id="lessThan500"
                  className={` p-2 pr-5 pl-5 text-xs md:text-lg focus:outline-none focus:bg-[#117FC5] cursor-pointer border-white border rounded-3xl bg-inherit placeholder:text-white text-center caret-transparent ${
                    isClicked("revenue", "lessThan500") && "clicked-input"
                  }`}
                  placeholder="Less than 500k"
                  onClick={() => handleInputClick("revenue", "lessThan500")}
                >
                  Less than 500k
                </div>
              </div>
            </div>
            <div
              data-aos="fade-up"
              data-aos-offset="200"
              data-aos-easing="ease-in-sine"
              data-aos-duration="600"
              className="flex flex-col items-center"
            >
              <p className="text-center mb-4">What are you looking for?</p>
              <div className="flex flex-col items-center">
                <div className="flex items-center flex-col md:flex-row gap-4 mb-4">
                  {/* <input
                    type="text"
                    id="moreCustomers"
                    name="lookingFor"
                    className={`w-full md:mr-2 p-2 text-xs md:text-lg focus:outline-none  cursor-pointer border-white border rounded-3xl bg-inherit placeholder:text-white text-center caret-transparent ${
                      isClicked('lookingFor', 'moreCustomers') && 'clicked-input'
                    }`}
                    placeholder="More Customers"
                    onClick={() => handleInputClick('lookingFor', 'moreCustomers')}
                  /> */}
                  <div
                    id="moreCustomers"
                    className={` p-2 pr-5 pl-5 md:mr-2 text-xs md:text-lg focus:outline-none  cursor-pointer border-white border rounded-3xl bg-inherit placeholder:text-white text-center caret-transparent ${
                      isClicked("lookingFor", "moreCustomers") &&
                      "clicked-input"
                    }`}
                    placeholder="More Customers"
                    onClick={() =>
                      handleInputClick("lookingFor", "moreCustomers")
                    }
                  >
                    More Customers
                  </div>
                  {/* <input
                    type="text"
                    id="reducedCosts"
                    name="lookingFor"
                    className={`w-full p-2 text-xs md:text-lg focus:outline-none  cursor-pointer border-white border rounded-3xl bg-inherit placeholder:text-white text-center caret-transparent ${
                      isClicked('lookingFor', 'reducedCosts') && 'clicked-input'
                    }`}
                    placeholder="Reduced Overhead costs"
                    onClick={() => handleInputClick('lookingFor', 'reducedCosts')}
                  /> */}
                  <div
                    id="reducedCosts"
                    className={` p-2 pr-5 pl-5 text-xs md:text-lg focus:outline-none  cursor-pointer border-white border rounded-3xl bg-inherit placeholder:text-white text-center caret-transparent ${
                      isClicked("lookingFor", "reducedCosts") && "clicked-input"
                    }`}
                    placeholder="Reduced Overhead costs"
                    onClick={() =>
                      handleInputClick("lookingFor", "reducedCosts")
                    }
                  >
                    Reduced Overhead costs
                  </div>
                </div>
                <div className="flex items-center w-1/2">
                  {/* <input
                    type="text"
                    id="bothOptions"
                    name="lookingFor"
                    className={`w-full p-2 text-xs md:text-lg focus:outline-none  cursor-pointer  border-white border rounded-3xl bg-inherit placeholder:text-white text-center caret-transparent ${
                      isClicked('lookingFor', 'bothOptions') && 'clicked-input'
                    }`}
                    placeholder="Both"
                    onClick={() => handleInputClick('lookingFor', 'bothOptions')}
                  /> */}
                  <div
                    id="bothOptions"
                    className={`  p-2 w-full text-xs md:text-lg focus:outline-none  cursor-pointer  border-white border rounded-3xl bg-inherit placeholder:text-white text-center caret-transparent ${
                      isClicked("lookingFor", "bothOptions") && "clicked-input"
                    }`}
                    placeholder="Both"
                    onClick={() =>
                      handleInputClick("lookingFor", "bothOptions")
                    }
                  >
                    Both
                  </div>
                </div>
              </div>
            </div>

            <div
              data-aos="fade-up"
              data-aos-offset="200"
              data-aos-easing="ease-in-sine"
              data-aos-duration="600"
              className="flex flex-col items-center p-8"
            >
              <p className="text-center mb-4">Where are you located?</p>
              <div className="flex items-center flex-col gap-4 md:flex-row w-full">
                <div
                  id="canada"
                  className={` w-full md:mr-2 text-xs md:text-lg p-2 focus:outline-none focus:bg-[#117FC5] cursor-pointer border-white border rounded-3xl bg-inherit placeholder:text-white text-center caret-transparent ${
                    isClicked("location", "canada") && "clicked-input"
                  }`}
                  placeholder="Canada"
                  onClick={() => handleInputClick("location", "canada")}
                >
                  Canada
                </div>
                <div
                  id="usa"
                  className={` w-full md:mr-2 text-xs md:text-lg p-2 focus:outline-none focus:bg-[#117FC5] cursor-pointer border-white border rounded-3xl bg-inherit placeholder:text-white text-center caret-transparent ${
                    isClicked("location", "usa") && "clicked-input"
                  }`}
                  placeholder="USA"
                  onClick={() => handleInputClick("location", "usa")}
                >
                  USA
                </div>
                <div
                  id="international"
                  className={` w-full p-2 text-xs md:text-lg focus:outline-none focus:bg-[#117FC5] cursor-pointer border-white border rounded-3xl bg-inherit placeholder:text-white text-center caret-transparent ${
                    isClicked("location", "international") && "clicked-input"
                  }`}
                  placeholder="International"
                  onClick={() => handleInputClick("location", "international")}
                >
                  International
                </div>
              </div>
            </div>
            <div
              data-aos="fade-up"
              data-aos-offset="200"
              data-aos-easing="ease-in-sine"
              data-aos-duration="600"
              className="flex flex-col items-center mb-4"
            >
              <p className="text-center mb-2   text-white">Industry?</p>
              <div className="flex items-center w-1/2">
                <select
                  id="location"
                  name="location"
                  className="w-full p-2 pl-4 focus:outline-none  cursor-pointer border-white border rounded-3xl bg-[#0E142B] placeholder:text-white text-white caret-transparent"
                  defaultValue={"DEFAULT"}
                >
                 <option value="select" defaultValue={"Select one..."}>
                  Select one...
                  </option>
                  <option value="Agriculture">Agriculture</option>
                  <option value="Automotive">Automotive</option>
                  <option value="Banking/Finance">Banking/Finance</option>
                  <option value="Construction">Construction</option>
                  <option value="Education">Education</option>
                  <option value="Energy">Energy</option>
                  <option value="Entertainment">Entertainment</option>
                  <option value="Food and Beverage">Food and Beverage</option>
                  <option value="Government">Government</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Information Technology (IT)">Information Technology (IT)</option>
                  <option value="Manufacturing">Manufacturing</option>
                  <option value="Marketing/Advertising">Marketing/Advertising</option>
                  <option value="Non Profit/Charity">Non Profit/Charity</option>
                  <option value="Real Estate">Real Estate</option>
                  <option value="Retail">Retail</option>
                  <option value="Telecommunication">Telecommunication</option>
                  <option value="Transport/Logistics">Transport/Logistics</option>
                  <option value="Travel/Hospitality">Travel/Hospitality</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
            <div
              data-aos="fade-up"
              data-aos-offset="200"
              data-aos-easing="ease-in-sine"
              data-aos-duration="600"
              className="flex flex-col items-center"
            >
              <p className="text-center mb-4">
                Are you interested in applying for a grant to get you started?
              </p>
              <div className="flex items-center justify-center w-full">
                <div
                  id="yesGrant"
                  className={`md:w-1/3  w-full mr-2 p-2 text-xs md:text-lg focus:outline-none cursor-pointer border-white border rounded-3xl bg-inherit placeholder:text-white text-center caret-transparent ${
                    isClicked("grant", "yesGrant") && "clicked-input"
                  }`}
                  onClick={() => handleInputClick("grant", "yesGrant")}
                >
                  Yes
                </div>
                <div
                  id="noGrant"
                  className={`md:w-1/3 w-full p-2 text-xs md:text-lg focus:outline-none cursor-pointer border-white border rounded-3xl bg-inherit placeholder:text-white text-center caret-transparent ${
                    isClicked("grant", "noGrant") && "clicked-input"
                  }`}
                  onClick={() => handleInputClick("grant", "noGrant")}
                >
                  No
                </div>
              </div>
            </div>

            <div
              data-aos="fade-up"
              data-aos-offset="100"
              data-aos-easing="ease-in-sine"
              data-aos-duration="600"
              className="flex items-center justify-center mt-8"
            >
              <button className="md:w-1/2 w-full  p-2 focus:outline-none focus:bg-[#117FC5] cursor-pointer border-white border rounded-3xl bg-inherit hover:bg-white hover:text-black">
                Apply Now
              </button>
            </div>
          </form>
        </div>
        <div>
          <div
            className="fixed bottom-8 bg-[#F23005] hover:scale-110 transition-transform duration-300 p-4 rounded-full right-12 cursor-pointer"
            onClick={toggleModal}
          >
            <IoIosChatboxes className="text-white text-3xl" />
          </div>

          <Modal isOpen={showModal} onClose={toggleModal} />
        </div>
      </div>
    </>
  );
}

export default HomePage;
