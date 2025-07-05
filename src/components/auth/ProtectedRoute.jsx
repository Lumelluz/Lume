import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ProtectedRoute = ({ allowedRoles }) => {
    const { isLoggedIn, user, isLoading } = useAuth();

    if (isLoading) {
        return <div>A verificar autenticação...</div>;
    }

    if (!isLoggedIn) {
        return <Navigate to="/login" replace />;
    }

    const hasRequiredRole = user && allowedRoles.includes(user.role);

    if (!hasRequiredRole) {
        console.warn(`Acesso negado para o utilizador com o papel: ${user.role}. Rota requer um dos seguintes papéis: ${allowedRoles.join(', ')}`);
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
