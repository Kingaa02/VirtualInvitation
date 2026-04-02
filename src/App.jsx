import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import LoginPage from "./pages/LoginPage";
import InvitationPage from "./pages/InvitationPage";

const BASENAME = import.meta.env.BASE_URL;

function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='animate-spin rounded-full h-16 w-16 border-4 border-beer-amber-400 border-t-transparent'></div>
      </div>
    );
  }

  return isAuthenticated ? children : <Navigate to='/login' replace />;
}

function PublicRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='animate-spin rounded-full h-16 w-16 border-4 border-beer-amber-400 border-t-transparent'></div>
      </div>
    );
  }

  return isAuthenticated ? <Navigate to='/invitation' replace /> : children;
}

function AppRoutes() {
  return (
    <Routes>
      <Route
        path='/login'
        element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        }
      />
      <Route
        path='/invitation'
        element={
          <ProtectedRoute>
            <InvitationPage />
          </ProtectedRoute>
        }
      />
      <Route path='/' element={<Navigate to='/login' replace />} />
      <Route path='*' element={<Navigate to='/login' replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter basename={BASENAME}>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}
