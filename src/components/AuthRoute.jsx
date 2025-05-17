import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

export default function AuthRoute({ children }) {
  const { token } = useAuth();
  return token ? children : <Navigate to="/login" />;
}