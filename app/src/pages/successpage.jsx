import React, {useEffect}from 'react';
import '../styles/style.css'; 
import useAuthRedirect from '../hooks/useAuthRedirect';
import { useNavigate } from 'react-router-dom';
function SuccessPage(){
    const navigate = useNavigate();
    useAuthRedirect()

    useEffect(() => {
        
        const interval = setInterval(() => {
             navigate('/apointement');
        }, 4000); // 3000 milliseconds = 3 seconds

        return () => clearInterval(interval);
    }, [[navigate]]);

    return (
        <div style={{ marginTop: '80px' }} className="container">
            <div style={{ marginBottom: '90px' }} className="text-center">
                <img 
                    src="/assets/icons/logo-full.svg" 
                    width="124px" 
                    height="42px" 
                    alt="Logo" 
                />
            </div>
            <div className="text-center">
                <img 
                    src="/assets/gifs/success.gif" 
                    className="text-center" 
                    alt="Success" 
                />
            </div>
            <div className="text-center">
                <h1 style={{ color: 'white', fontWeight: 'bold' }}>
                    Your <span style={{ color: '#4c9967' }}>appointment request</span> has <br /> been successfully submitted!
                </h1>
            </div>
            <div className="text-center">
                <p className="the_text">We'll be in touch shortly to confirm.</p>
            </div>
        </div>
    );
};

export default SuccessPage;