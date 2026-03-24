import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const ProtectedRoute = ({ children, allowedRoles }) => {
    const { isAuthenticated, loading, user } = useAuth();
    const location = useLocation();

    if (loading) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center px-6">
                <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary/20 border-t-primary" />
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace state={{ from: location.pathname }} />;
    }

    if (allowedRoles && allowedRoles.length > 0) {
        if (!user || !user.role || !allowedRoles.includes(user.role)) {
            // User doesn't have the required role, redirect to a safe page (e.g., home or profile)
            return <Navigate to="/" replace />;
        }
    }

    return children;
};

export default ProtectedRoute;
