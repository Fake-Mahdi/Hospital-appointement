import React, { useState } from 'react';
import '../styles/style.css'; 
import Verfication from '../components/ConfirmationComponents/Verfication';
import { useNavigate } from 'react-router-dom';
function Login() {
  const navigate = useNavigate();
    const [optCode, setOptCode] = useState('');
    const [type, setType] = useState('');
    const [isConfirmVisible, setIsConfirmVisible] = useState(false);
    const handleButtonClick = () => {
        setIsConfirmVisible(true);
      };
      const handleCancel = () => {
        setIsConfirmVisible(false); // Hide the dialog
      };
  // Set initial form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });

  // Handle change for all form inputs
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try
    {
        const response = await fetch('http://localhost:5000/send' ,{
            method: 'POST',
            headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        });
        if (response.ok) {
            const data = await response.json();
            console.log('this is : ',data);
            if(!data.value)
            {
              setOptCode(data.otp);
              handleButtonClick();
            }
            else if(data.value)
            {
              
                console.log('User registered successfully');
                console.log('Mahdi Here :',data.token)
                localStorage.setItem('token', data.token);
                localStorage.setItem('userId', data.userId);
                navigate(`/Apointement`);
            }
            
        } else {
            console.error('Failed to register user');
        }
    }
    catch (error) {
        console.error('Error:', error);
      }
  };
  const admin = async (event) => {
    event.preventDefault();
    try
    {
        const response = await fetch('http://localhost:5000/admin');
        if (response.ok) {

            const data = await response.json();
            console.log(data);
            console.log('everthink is good Mahdi');
            localStorage.setItem('token', data.token);
            setOptCode(data.otp);
            setType(data.type)
            setIsConfirmVisible(true);
            
            
        } else {
            console.error('Failed to register user');
        }
    }
    catch (error) {
        console.error('Error:', error);
      }
  };
  return (
    <div>
        <div className="flexbox">
      <div className="form box">
        <div className="nestflex">
          <div style={{ marginBottom: '70px', marginTop: '30px', cursor: 'pointer' }}>
            <img 
              src="assets/icons/logo-full.svg" 
              width="124px" 
              height="42px" 
              alt="Logo" 
              srcSet="" 
            />
          </div>
          <div className="heading-container">
            <h1 className="text-left">Hi There,...</h1>
            <p className="text-left">Get Started with Appointments.</p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="formulaire">
              {/* Full Name Input */}
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input 
                  type="text" 
                  className="form-control" 
                  id="name" 
                  placeholder="Full Name" 
                  name="name" 
                  autoComplete="off" 
                  value={formData.name}
                  onChange={handleChange} // Handle input change
                />
              </div>

              {/* Email Input */}
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input 
                  type="email" 
                  className="form-control" 
                  id="email" 
                  placeholder="Email Address" 
                  name="email" 
                  autoComplete="off" 
                  value={formData.email}
                  onChange={handleChange} // Handle input change
                />
              </div>

              <div style={{ marginTop: '30px' }}>
                <button id="btn6" type="submit">Get Started</button>
              </div>
            </div>
          </form>
          <div className="footer">
            <div className="left">© 2024 CarePluse</div>
            <div className="right" onClick={admin}>Admin</div>
          </div>
        </div>
      </div>

      <div className="box">
        <img 
          src="assets/images/onboarding-img.png" 
          width="100%" 
          height="100%" 
          style={{ objectFit: 'cover' }} 
          alt="Onboarding" 
          srcSet="" 
        />
      </div>
    </div>
    <Verfication isVisible={isConfirmVisible}  onCancel={handleCancel} code ={optCode} detail={formData} type ={type} />
</div>
    
  );
};

export default Login;
