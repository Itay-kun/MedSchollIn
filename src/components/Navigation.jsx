import { Link } from 'react-router-dom';
import { useState } from 'react';

function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="main-nav bg-slate-800 text-white">
      <div className="nav-container max-w-7xl mx-auto px-4">
       <div className="nav-content flex justify-between h-16">
          <div className="nav-left flex items-center ">
            <Link to="/" className="nav-logo text-2xl font-bold text-blue-400 hover:text-blue-300">
              MedSchool
            </Link>
            
            <div className="menu-desktop md:flex hidden md:items-center md:mr-4 md:space-x-8 mr-8">
              <Link to="/" className="menu-item text-lg px-4 py-2 rounded-md bg-slate-700 hover:bg-slate-600 transition-colors">
                נושאים
              </Link>
              </div>
              <div className="menu-desktop hidden md:flex md:items-center md:mr-4 md:space-x-8 mr-8">
              <Link to="/my-progress" className="menu-item text-lg px-4 py-2 rounded-md hover:bg-slate-700">
                ההתקדמות שלי
              </Link>
            </div>

          <div className="nav-auth hidden md:flex md:items-center md:space-x-4">
            <Link to="/login" className="menu-item text-lg px-4 py-2 rounded-md bg-slate-700 hover:bg-slate-600 transition-colors">
              התחברות
            </Link>
            </div>
            <div className="nav-auth hidden md:flex md:items-center md:space-x-4">
            <Link to="/signup" className="auth-link auth-signup text-lg px-4 py-2 bg-blue-600 rounded-md hover:bg-blue-700">
              הרשמה
            </Link>
          </div>
          </div>

          <div className="menu-mobile-button flex items-center md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="mobile-toggle inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-slate-700"
            >
              {!isMenuOpen ? (
                <svg className="menu-icon h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="close-icon h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="menu-mobile md:hidden bg-slate-800 border-t border-slate-700">
          <div className="mobile-items px-2 pt-2 pb-3 space-y-1">
            <Link to="/" className="menu-item-mobile block px-3 py-2 rounded-md text-white text-lg hover:bg-slate-700">
              נושאים
            </Link>
            <Link to="/my-progress" className="menu-item-mobile block px-3 py-2 rounded-md text-white text-lg hover:bg-slate-700">
              ההתקדמות שלי
            </Link>
            <Link to="/login" className="menu-item-mobile block px-3 py-2 rounded-md text-white text-lg hover:bg-slate-700">
              התחברות
            </Link>
            <Link to="/signup" className="menu-item-mobile block px-3 py-2 rounded-md text-white text-lg hover:bg-slate-700">
              הרשמה
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navigation;
