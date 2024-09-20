import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkAuthToken } from '../utilis/auth';

const useAuthRedirect = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if (!checkAuthToken()) {
            navigate('/'); // Redirect to login page if no token
        }
    }, [navigate]);
};

export default useAuthRedirect;
