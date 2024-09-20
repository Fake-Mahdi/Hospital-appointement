import React, { useState } from 'react';
import '../styles/style.css'; 
import useAuthRedirect from '../hooks/useAuthRedirect';
import { useNavigate } from 'react-router-dom';
function Welcome() {
  const navigate = useNavigate();
  useAuthRedirect();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        birthDate: '',
        gender: '',
        emergencyContactName: '',
        emergencyContactNumber: '',
        physician: '',
        insurance: '',
        insuranceNumber: '',
        allergies: '',
        pastMedication: '',
        familyHistory: '',
        currentCondition: '',
        identificationType: '',
        identificationNumber: '',
      });

      const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };

  const [selectedName, setSelectedName] = useState('Select Name');
  const [selectedImage, setSelectedImage] = useState('');

  const handleDropdownSelect = (imgSrc, text) => {
    setSelectedImage(imgSrc);
    setSelectedName(text);
    setFormData({
        ...formData,
        physician: text // Update the physician field in formData
    });
};

const handleSubmit = async () => {
    try {
        // Get token and userId from localStorage
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');

        if (!token) {
            console.error('No token found. Please login again.');
            return;
        }

        // Validate formData exists and has the correct structure
        if (!formData || Object.keys(formData).length === 0) {
            console.error('Form data is missing');
            return;
        }

        // Add userId to formData
        const formDataWithUserId = { ...formData, userId };

        // Make the POST request
        const response = await fetch('http://localhost:5000/addthink', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,  // Send the token in the Authorization header
            },
            body: JSON.stringify(formDataWithUserId),  // Send formDataWithUserId in the request body
        });

        // Check if the response is OK (status 200-299)
        if (response.ok) {
            const data = await response.json();  // Parse the JSON response
            console.log('Response from server:', data);
            console.log('Sent data:', formDataWithUserId);
            navigate(`/Apointement`);
        } else {
            // If the response is not OK, log the error status and message
            const errorText = await response.text();
            console.error(`Failed to register user. Status: ${response.status}, Status Text: ${response.statusText}`);
            console.error('Response body:', errorText);  // Log the body to understand the issue
        }
    } catch (error) {
        // Catch any unexpected errors
        console.error('An error occurred:', error);
    }
};


  return (
    <div className="container">
      <div style={{ marginTop: '40px' }}>
        <img src="assets/icons/logo-full.svg" width="124px" height="42px" alt="Logo" />
      </div>
      <div style={{ marginBottom: '65px' }} className="heading-container">
        <h1 className="text-left"><span>Welcome👋</span></h1>
        <p className="text-left">Let us know more about yourself</p>
      </div>
      <div className="row">
        <div style={{ marginBottom: '15px', marginLeft: '15px' }} className="heading-container">
          <h1 className="text-left"><span>Personal Information</span></h1>
        </div>
        <div className="col-lg-12 col-xs-12">
          <div className="form-group">
            <label htmlFor="inputFullName">Full Name</label>
            <input type="text" className="form-control" value={formData.name} name='name' onChange={handleChange} id="inputFullName" placeholder="Enter Full Name" autoComplete="off" />
          </div>
        </div>
      </div>

      <div className="row input-grid">
        <div className="col-lg-6 col-md-12 col-sm-6 col-xs-12">
          <div className="form-group">
            <label htmlFor="inputEmail">Email</label>
            <input type="email" value={formData.email} onChange={handleChange} name='email' className="form-control" id="inputEmail" placeholder="Enter Email" autoComplete="off" />
          </div>
        </div>
        <div className="col-lg-6 col-md-12 col-sm-6 col-xs-12">
          <div className="form-group">
            <label htmlFor="inputPhoneNumber">Phone Number</label>
            <input type="text" className="form-control" value={formData.phoneNumber} name='phoneNumber' onChange={handleChange} id="inputPhoneNumber" placeholder="Enter Phone Number" autoComplete="off" />
          </div>
        </div>
        <div className="col-lg-6 col-md-12 col-sm-6 col-xs-12">
          <div className="form-group">
            <label htmlFor="inputBirthDate">Birthdate</label>
            <input type="date" className="form-control" value={formData.birthDate} name='birthDate' onChange={handleChange} id="inputBirthDate" />
          </div>
        </div>
        <div className="col-lg-6 col-md-12 col-sm-6 col-xs-12">
          <div className="form-group">
            <label htmlFor="inputGender">Gender</label>
            <select className="form-control" id="inputGender" value={formData.gender} name='gender'  onChange={handleChange}>
              <option value="" disabled>Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
        <div className="col-lg-6 col-md-12 col-sm-6 col-xs-12">
          <div className="form-group">
            <label htmlFor="inputEmergencyContactName">Emergency Contact Name</label>
            <input type="text" className="form-control" value={formData.emergencyContactName} name='emergencyContactName'  onChange={handleChange} id="inputEmergencyContactName" placeholder="Enter Emergency Contact Name" autoComplete="off" />
          </div>
        </div>
        <div className="col-lg-6 col-md-12 col-sm-6 col-xs-12">
          <div className="form-group">
            <label htmlFor="inputEmergencyPhoneNumber">Emergency Contact Number</label>
            <input type="text" className="form-control" value={formData.emergencyContactNumber}  name='emergencyContactNumber' onChange={handleChange} id="inputEmergencyPhoneNumber" placeholder="Enter Emergency Contact Number" autoComplete="off" />
          </div>
        </div>

        <div className="col-lg-12 col-xs-12">
                    <div style={{ marginBottom: '15px' }} className="heading-container">
                        <h1 className="text-left"><span>Medical Information</span></h1>
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputNameSelect">Primary care physician</label>
                        <div className="dropdown">
                            <button className="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-expanded="true">
                                <img id="selectedImage" src={selectedImage} alt="Selected Image" style={{ display: selectedImage ? 'inline' : 'none' }} /> <span id="selectedText">{selectedName}</span>
                            </button>
                            <ul className="dropdown-menu" role="menu" aria-labelledby="dropdownMenu1">
                                <li role="presentation">
                                    <a role="menuitem" tabIndex="-1" href="#" onClick={(e) => { e.preventDefault(); handleDropdownSelect('/assets/images/dr-cameron.png', 'Dr.cameron.'); }}>
                                        <img src="/assets/images/dr-cameron.png" alt="Name 1" /> Dr.cameron.
                                    </a>
                                </li>
                                <li role="presentation">
                                    <a role="menuitem" tabIndex="-1" href="#" onClick={(e) => { e.preventDefault(); handleDropdownSelect('/assets/images/dr-green.png', 'Dr.green'); }}>
                                        <img src="/assets/images/dr-green.png" alt="Name 2" /> Dr.green
                                    </a>
                                </li>
                                <li role="presentation">
                                    <a role="menuitem" tabIndex="-1" href="#" onClick={(e) => { e.preventDefault(); handleDropdownSelect('/assets/images/dr-lee.png', 'Dr.lee'); }}>
                                        <img src="/assets/images/dr-lee.png" alt="Name 3" /> Dr.lee
                                    </a>
                                </li>
                                <li role="presentation">
                                    <a role="menuitem" tabIndex="-1" href="#" onClick={(e) => { e.preventDefault(); handleDropdownSelect('/assets/images/dr-sharma.png', 'Dr.sharma'); }}>
                                        <img src="/assets/images/dr-sharma.png" alt="Name 4" /> Dr.sharma
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

        <div>
          <div className="col-lg-6 col-md-12 col-sm-6 col-xs-12">
            <div className="form-group">
              <label htmlFor="insurance">Insurance Provider</label>
              <input type="text" className="form-control" value={formData.insurance} onChange={handleChange}  name='insurance'  id="insurance" placeholder="ex: BlueCross" autoComplete="off" />
            </div>
          </div>
          <div className="col-lg-6 col-md-12 col-sm-6 col-xs-12">
            <div className="form-group">
              <label htmlFor="provider">Insurance Provider Number</label>
              <input type="text" className="form-control" value={formData.insuranceNumber} onChange={handleChange}  name='insuranceNumber' id="provider" placeholder="ex: ABC1234567" autoComplete="off" />
            </div>
          </div>
          <div className="col-lg-6 col-md-12 col-sm-6 col-xs-12">
            <div className="form-group">
              <label htmlFor="allergie">Allergies:</label>
              <textarea className="form-control" id="allergie" value={formData.allergies} onChange={handleChange}  name='allergies' placeholder="ex: Peanuts, Penicillin, Pollen" rows="3" autoComplete="off"></textarea>
            </div>
          </div>
          <div className="col-lg-6 col-md-12 col-sm-6 col-xs-12">
            <div className="form-group">
              <label htmlFor="medication">Past Medication</label>
              <textarea className="form-control" id="medication" value={formData.pastMedication} onChange={handleChange}  name='pastMedication' placeholder="ex: Ibuprofen 200mg, Levothyroxine 50mcg" rows="3" autoComplete="off"></textarea>
            </div>
          </div>
          <div className="col-lg-6 col-md-12 col-sm-6 col-xs-12">
            <div className="form-group">
              <label htmlFor="familyHistory">Family medical history (if relevant):</label>
              <textarea className="form-control" id="familyHistory" value={formData.familyHistory} onChange={handleChange}  name='familyHistory' placeholder="ex: Mother had breast cancer" rows="3" autoComplete="off"></textarea>
            </div>
          </div>
          <div className="col-lg-6 col-md-12 col-sm-6 col-xs-12">
            <div className="form-group">
              <label htmlFor="currentCondition">Current Condition</label>
              <textarea className="form-control" id="currentCondition" value={formData.currentCondition} onChange={handleChange}  name='currentCondition' placeholder="ex: Asthma diagnosis in childhood" rows="3" autoComplete="off"></textarea>
            </div>
          </div>
          <div className="col-lg-12 col-xs-12">
            <div style={{ marginBottom: '15px' }} className="heading-container">
              <h1 className="text-left"><span>Identification and Verification</span></h1>
            </div>
            <div className="form-group">
              <label htmlFor="inputIdentificationType">Identification type</label>
              <input type="text" className="form-control" value={formData.identificationType} onChange={handleChange} name='identificationType' id="inputIdentificationType" placeholder="Enter Identification type" autoComplete="off" />
            </div>
          </div>
          <div className="col-lg-12 col-xs-12">
            <div className="form-group">
              <label htmlFor="inputIdentificationNumber">Identification Number</label>
              <input type="text" className="form-control" value={formData.identificationNumber} onChange={handleChange} name='identificationNumber' id="inputIdentificationNumber" placeholder="ex 123456" autoComplete="off" />
            </div>
          </div>
        </div>
      </div>
      <div style={{ marginTop: '30px' }}>
                <button id="btn6" onClick={handleSubmit} type="submit">Get Started</button>
              </div>
    </div>
  );
};

export default Welcome;
