import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { getDashboardRouteByRole, hasRequiredRole } from '../../utils/dashboardRoutes';

const RoleProtectedRoute = ({ allowedRoles = [], children }) => {
    const { isAuthenticated, loading, user } = useAuth();
    const location = useLocation();

    if (loading) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center px-6">
                <div className="h-12 w-12 animate-spin rounded-xl border-4 border-primary/20 border-t-primary" />
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace state={{ from: location.pathname }} />;
    }

    if (!hasRequiredRole(user?.role, allowedRoles)) {
        return <Navigate to={getDashboardRouteByRole(user?.role) || '/'} replace />;
    }

    return children;
};

export default RoleProtectedRoute;
