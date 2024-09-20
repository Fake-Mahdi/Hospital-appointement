import React from 'react';
import '../../styles/style.css';
import { useNavigate } from 'react-router-dom';
const Verification = ({ isVisible, onCancel, code , detail , type }) => {
  const navigate = useNavigate();
  if (!isVisible) return null;

  // Function to handle focus movement between OTP input fields
  const moveFocus = (currentElement, event) => {
    const maxLength = currentElement.getAttribute("maxlength");
    if (currentElement.value.length >= maxLength) {
      const nextElement = currentElement.nextElementSibling;
      if (nextElement && nextElement.classList.contains('otp-field')) {
        nextElement.focus();
      }
    } else if (currentElement.value.length === 0) {
      const previousElement = currentElement.previousElementSibling;
      if (previousElement && previousElement.classList.contains('otp-field')) {
        previousElement.focus();
      }
    }
  };

  // Function to handle form submission
  const handleSubmit = async(event) => {
    event.preventDefault();
    // Convert the code prop to a string for comparison
    const predefinedOtp = code.toString();
    console.log(predefinedOtp);
    // Collect the entered OTP from the fields
    const otpFields = document.querySelectorAll('.otp-field');
    const enteredOtp = Array.from(otpFields).map(field => field.value).join('');
    const userType = type;
    if(userType === 'admin')
    {
      if(enteredOtp === predefinedOtp)
      {
        navigate('/Dashboard')
      }
    }
    else
    {
      if (enteredOtp === predefinedOtp) {
        try
        {
          console.log('data of detail :' , detail)
            const response = await fetch('http://localhost:5000/check' ,{
                method: 'POST',
                headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(detail),
            });
            if (response.ok) {
    
               
                const data = await response.json();
                console.log('this is : ',data);
                console.log('User registered successfully');
                console.log('Mahdi Here :',data.token);
                localStorage.setItem('token', data.token);
                localStorage.setItem('userId', data.userId)
                navigate(`/Welcome`);
                
            } else {
                console.error('Failed to register user');
            }
        }
        catch (error) {
            console.error('Error:', error);
            
          }

      
    } else {
        console.log('Error: OTP does not match!');
    }
    }
    
  };

  return (
    <div className="confirm-overlay">
      <div className="verify_ui">
        <div className="otp-box">
          <div className="flexy">
            <div>
              <h5 style={{ color: 'whitesmoke', fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 600 }}>
                Verify OTP
              </h5>
            </div>
            <div>
              <img src="/assets/icons/close.svg" width="20px" height="20px" onClick={onCancel} alt="" />
            </div>
          </div>
          <div>
            <div className="text-left" style={{ marginBottom: '30px' }}>
              <p className="the_text2">Are you sure you want to cancel your appointment?</p>
            </div>
          </div>
          <form id="otpForm" onSubmit={handleSubmit}>
            <div className="form-group text-center">
              <div className="otp-inputs">
                {[...Array(6)].map((_, index) => (
                  <input
                    key={index}
                    type="text"
                    className="otp-field"
                    maxLength="1"
                    onInput={(e) => moveFocus(e.target, e)}
                    autoFocus={index === 0}
                  />
                ))}
              </div>
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-primary2 btn-block">
                Verify OTP
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Verification;
