import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ children }) => {
    const { authenticated, loading } = useAuth();

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!authenticated) { 
        return <Navigate to="/login" />;
    }  
    return children;
}

export default PrivateRoute;