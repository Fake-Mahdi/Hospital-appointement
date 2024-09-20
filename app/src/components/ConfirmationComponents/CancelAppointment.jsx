import React ,{useState} from "react";
import '../../styles/style.css';

const CancelAppointment = ({isVisible , onCancel , appointdata}) => {
    const [reason, setReason] = useState('');
    if (!isVisible) return null;   
    
    const sendcancelmsg = async () =>
    {
        const cancelData = {
            id : appointdata.id ,
            fullname: appointdata.fullname,
            email: appointdata.email,
            date: appointdata.birthdate,  
            reason: reason, 
        };
        try
        {
            const response = await fetch('http://localhost:5000/cancelmsg', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(cancelData), 
            });
            if(response.ok)
            {
                const data = await response.json()
                console.log(data);
                setReason('');
                oncancel();
            }
            else
            {
                console.log('Mahdi That did not go well bro');
            }
        } 
        catch(err)
        {
            console.error('An error occurred:', err);
        }

        }
    
        const handleCancel = () => {
            // Logic for cancelling the appointment goes here
            console.log('Reason for cancellation:', reason);
            sendcancelmsg();
        };

    return (
        <div className="confirm-overlay">
         <div className="cancel_ui">
            <div className="flexy">
                <div>
                    <h3 style={{ color: 'whitesmoke', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                        Cancel Appointment
                    </h3>
                </div>
                <div>
                    <img src="assets/icons/close.svg" onClick={onCancel} width="20px" height="20px" alt="Close Icon" />
                </div>
            </div>

            <div className="text-left" style={{ marginBottom: '30px' }}>
                <p className="the_text2">Are you sure you want to cancel your appointment?</p>
            </div>

            <div className="text-left" style={{ marginBottom: '20px' }}>
                <p className="the_text2">Reason for cancellation</p>
            </div>

            <textarea
                className="form-control"
                id="reason"
                placeholder="ex: Urgent meeting came up"
                rows="3"
                value={reason}
                onChange={(e) => setReason(e.target.value)} // Update the state when textarea changes
            ></textarea>

            <button className="btn btn-danger" onClick={handleCancel}>
                Cancel Appointment
            </button>
        </div>
        </div>
    );
};

export default CancelAppointment;