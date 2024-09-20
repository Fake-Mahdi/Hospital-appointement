import React, { useState } from 'react';
import '../styles/style.css'; 
import useAuthRedirect from '../hooks/useAuthRedirect';
import { useNavigate } from 'react-router-dom';
function Apointement()
{
    const navigate = useNavigate();
    useAuthRedirect();
    const [selectedName, setSelectedName] = useState('Select Name');
    const [selectedImage, setSelectedImage] = useState('');
    
    const [formData, setFormData] = useState({
        doctor: '',
        appointmentReason: '',
        additionalComments : '',
        birthDate:''
      });

      const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };

    const handleDropdownSelect = (imgSrc, text) => {
        setSelectedImage(imgSrc);
        setSelectedName(text);
        setFormData({
            ...formData,
            doctor: text // Update the physician field in formData
        });

    };

    const sendinfo = async (event) =>
        {
          try
          {
              const token = localStorage.getItem('token');
              const userId = localStorage.getItem('userId');
                console.log(userId);
              if (!formData || Object.keys(formData).length === 0) {
                  console.error('Form data is missing');
                  return;
              }
  
              const formDataWithUserId = { ...formData, userId };
  
              const resultat = await fetch('http://localhost:5000/appointements',{
                  method : 'POST',
                  headers: {
                      'Content-Type': 'application/json',
                      'Authorization': `Bearer ${token}`,  // Send the token in the Authorization header
                  },
                  body: JSON.stringify(formDataWithUserId),
              })
              
              if(resultat.ok)
              {
                  console.log('everythink is good');
                  const data = await resultat.json();
                  console.log('Mahdi The Data That u Are Waiting is Here : ' , data);
                  navigate('/successpage');
              }
              else {
                  // If the response is not OK, log the error status and message
                  const errorText = await resultat.text();
                  console.error(`Failed to register user. Status: ${resultat.status}, Status Text: ${resultat.statusText}`);
                  console.error('Response body:', errorText);  // Log the body to understand the issue
              }
          } 
          catch(error) {
              // Catch any unexpected errors
              console.error('An error occurred:', error);
          }
        }

    const handleSubmit = (e) => {
        e.preventDefault();
        
        console.log({
          doctor: formData.doctor,
          appointmentReason: formData.appointmentReason, // Access from formData
          additionalComments: formData.additionalComments, // Access from formData
          birthDate: formData.birthDate, // Access from formData
        });

        sendinfo();
      };
      
      
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-9">
            <div className="flexi">
              <div className="col-lg-12 col-xs-12" style={{ marginBottom: '30px' }}>
                <div style={{ marginTop: '30px', cursor: 'pointer' }}>
                  <img
                    src="assets/icons/logo-full.svg"
                    width="150px"
                    height="52px"
                    alt="Logo"
                  />
                </div>
                <div className="heading-container2">
                  <h1 className="text-left">Hey there 👋</h1>
                  <p className="text-left">Get Started with Appointments.</p>
                </div>
              </div>
  
              <div>
                <div className="col-lg-12 col-xs-12">
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
  
                <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12">
                  <div className="form-group">
                    <label htmlFor="medication">Reason for appointment</label>
                    <textarea
                      className="form-control"
                      id="medication"
                      placeholder="ex: Annual monthly check-up"
                      rows="3"
                      value={formData.appointmentReason}
                      onChange={handleChange}
                      name='appointmentReason'
                    />
                  </div>
                </div>
                <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12">
                  <div className="form-group">
                    <label htmlFor="additionalComments">Additional comments/notes</label>
                    <textarea
                      className="form-control"
                      id="additionalComments"
                      placeholder="ex: Prefer afternoon appointments, if possible"
                      rows="3"
                      value={formData.additionalComments}
                      onChange={handleChange}
                      name='additionalComments'
                    />
                  </div>
                </div>
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <div className="form-group">
                    <label htmlFor="inputBirthDate">Birthdate</label>
                    <input
                      type="date"
                      className="form-control"
                      id="inputBirthDate"
                      placeholder="Enter Birthdate"
                      style={{ backgroundColor: '#131619' }}
                      name='birthDate'
                      value={formData.birthDate}
                      onChange={handleChange}
                      
                    />
                  </div>
                </div>
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <div style={{ marginTop: '30px' }}>
                    <button id="btn6" onClick={handleSubmit}>
                      Submit and continue
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3 hidden-xs hidden-sm">
            <div
              style={{
                height: '100vh',
                backgroundColor: 'aqua',
                margin: 0,
                padding: 0,
              }}
            >
              <img
                src="assets/images/register-img.png"
                width="100%"
                height="100%"
                style={{ objectFit: 'cover' }}
                alt="Register"
              />
            </div>
          </div>
        </div>
      </div>
    );

};

export default Apointement