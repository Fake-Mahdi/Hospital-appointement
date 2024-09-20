import React, { useState , useEffect } from 'react';
import '../styles/style.css'; 
import CancelAppointment from '../components/ConfirmationComponents/CancelAppointment';
import useAuthRedirect from '../hooks/useAuthRedirect';
function Dashboard()
{
    useAuthRedirect();
    const [appointments, setAppointments] = useState([]);
    const [scheduled, setScheduled] = useState('');
    const [waiting, setWaiting] = useState('');
    const [cancelled, setCancelled] = useState('');
    const [isConfirmVisible, setIsConfirmVisible] = useState(false);
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [selectedDoneAppointment, setDoneAppointment] = useState(null);

    useEffect(() => {

        const fetchAppointments = async () => {
            try {
              const token = localStorage.getItem('token');
              console.log(token);
                const response = await fetch('http://localhost:5000/dashbord',{
                  headers: {
                    'Authorization': `Bearer ${token}`, // Ensure token is passed correctly
                    'Content-Type': 'application/json',
                },});
                if (response.ok) {
                    const data = await response.json();
                    console.log(data)
                    setAppointments(data);
                } else {
                    console.error('Failed to fetch appointments');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

       
        fetchAppointments();
    },[appointments]);

    useEffect(() => {
        // Update counts whenever appointments change
        if (appointments.length > 0) {
            const scheduledCount = appointments.filter(app => app.status === 'scheduled').length;
            const waitingCount = appointments.filter(app => app.status === 'pending').length;
            const cancelledCount = appointments.filter(app => app.status === 'cancelled').length;

            setScheduled(scheduledCount);
            setWaiting(waitingCount);
            setCancelled(cancelledCount);
        }
    }, [appointments]);

    const cancel = (appointment)=>
    {
        setSelectedAppointment(appointment);
        console.log(appointment)
        setIsConfirmVisible(true);
    }
    const handleCancel = () => {
        setIsConfirmVisible(false); // Hide the dialog
      };

      const done = (appointment) => {
        setDoneAppointment(appointment);
    };
    
    useEffect(() => {
        if (selectedDoneAppointment) {
            senddonemsg();
        }
    }, [selectedDoneAppointment]);
    
    const senddonemsg = async () => {
        const info = {
            id: selectedDoneAppointment.id,
            fullname: selectedDoneAppointment.fullname,
            email: selectedDoneAppointment.email,
            date: selectedDoneAppointment.birthdate,
            doctor: selectedDoneAppointment.physician_name,  
        };
        try {
            const response = await fetch('http://localhost:5000/donemsg', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(info),
            });
            if (response.ok) {
                const data = await response.json();
                console.log(data);
            } else {
                console.log('Failed to send the appointment confirmation message.');
            }
        } catch (err) {
            console.error('An error occurred:', err);
        }
    };
      
      
      

    return(
        <div style={{ marginTop: '25px' }} className="container">
      <div className="flexy3">
        <div style={{ cursor: 'pointer' }}>
          <img src="assets/icons/logo-full.svg" width="124px" height="42px" alt="" />
        </div>
        <div style={{ color: 'white', fontFamily: 'Plus Jakarta Sans, sans-serif', marginRight: '20px' }}>
          Admin
        </div>
      </div>

      <div style={{ marginTop: '15px' }} className="heading-container">
        <h1 style={{ color: 'whitesmoke' }}>Welcome, Admin</h1>
        <p>Start the day with managing new appointments</p>
      </div>

      <div style={{ marginTop: '50px' }} className="row">
        <div className="col-lg-4">
          <div className="the_image">
            <div className="flexy4">
              <div>
                <img src="assets/icons/appointments.svg" width="80px" height="32px" alt="" />
              </div>
              <div style={{ color: 'white', fontSize: '22px', fontWeight: 'bold' }}>{scheduled}</div>
            </div>
            <div style={{ marginTop: '25px' }} className="detail">
              Total number of scheduled appointments
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="the_image">
            <div className="flexy4">
              <div>
                <img src="assets/icons/pending.svg" width="80px" height="32px" alt="" />
              </div>
              <div style={{ color: 'white', fontSize: '22px', fontWeight: 'bold' }}>{waiting}</div>
            </div>
            <div style={{ marginTop: '25px' }} className="detail">
              Total number of pending appointments
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="the_image">
            <div className="flexy4">
              <div>
                <img src="assets/icons/cancelled.svg" width="80px" height="32px" alt="" />
              </div>
              <div style={{ color: 'white', fontSize: '22px', fontWeight: 'bold' }}>{cancelled}</div>
            </div>
            <div style={{ marginTop: '25px' }} className="detail">
              Total number of cancelled appointments
            </div>
          </div>
        </div>
      </div>

      <div style={{ marginTop: '40px' }} className="container table-container">
        <div className="table-responsive">
          <table style={{ width: '100%' }}>
            <thead style={{ backgroundColor: '#0D0F10', color: '#CDCECF' }}>
              <tr>
                <th>Patient</th>
                <th>Date</th>
                <th>Status</th>
                <th>Doctor</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
            {appointments.map((appointment, index) => {
                                // Trim and lowercase the doctor's name to format image source
                                const doctorImageName = appointment.physician_name.trim().toLowerCase().replace(/\s+/g, '');
                                
                                return (
                                    <tr key={appointment.id}>
                                        <td>{appointment.fullname}</td>
                                        <td>{new Date(appointment.birthdate).toLocaleDateString()}</td>
                                        <td>
                                            <button className={appointment.status === 'scheduled' ? 'good' : appointment.status === 'cancelled' ? 'refuse' : 'waiting'}>
                                                {appointment.status}
                                            </button>
                                        </td>
                                        <td>
                                            <span>
                                                <img 
                                                    src={`assets/images/${doctorImageName}.png`} 
                                                    style={{ marginRight: '10px' }} 
                                                    width="30px" 
                                                    height="30px" 
                                                    alt="" 
                                                />
                                            </span>
                                            <span>{appointment.physician_name}</span>
                                        </td>
                                        <td>
                                            <span>
                                                <button className="action1" onClick={() => done(appointment)}>Schedule</button>
                                            </span>
                                            <span>
                                                <button className="action2" onClick={() => cancel(appointment)}>Cancelled</button>
                                            </span>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
          </table>
        </div>
      </div>
      <CancelAppointment isVisible={isConfirmVisible} onCancel={handleCancel} appointdata = {selectedAppointment} />
      
    </div>
    );
};
export default Dashboard