// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { FirebaseProvider } from './context/FirebaseContext';
import Navigation from './components/Navigation';
import TopicsPage from './pages/TopicsPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import MyProgressPage from './pages/MyProgressPage';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <FirebaseProvider>
        <Router>
          <div className="min-h-screen bg-gray-50" dir="rtl">
            <Navigation />
            <main className="container mx-auto px-4 py-8">
              <Routes>
                <Route path="/" element={<TopicsPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/my-progress" element={<MyProgressPage />} />
              </Routes>
            </main>
          </div>
        </Router>
      </FirebaseProvider>
    </AuthProvider>
  );
}

export default App;
