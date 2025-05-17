import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Register from './pages/Register';
import Login from './pages/Login';
import Contacts from './pages/Contacts';
import Loader from './components/Loader';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
}

export default function App() {
  const [loading, setLoading] = useState(false);

  return (
    <AuthProvider>
      {loading && <Loader />}
      <Routes>
        <Route path="/login" element={<Login setLoading={setLoading} />} />
        <Route path="/register" element={<Register setLoading={setLoading} />} />
        <Route path="/contacts" element={
          <PrivateRoute>
            <Contacts setLoading={setLoading} />
          </PrivateRoute>
        } />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        closeButton={false}
      />
    </AuthProvider>
  );
}
