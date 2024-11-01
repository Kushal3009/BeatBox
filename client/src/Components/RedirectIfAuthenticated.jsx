import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const RedirectIfAuthenticated = ({ children }) => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = document.cookie.split('; ').find(row => row.startsWith('token='));
        if (token) {
            navigate('/'); // Redirect to home if already logged in
        }
    }, [navigate]);

    return children; // Render the component if not logged in
};

export default RedirectIfAuthenticated;
