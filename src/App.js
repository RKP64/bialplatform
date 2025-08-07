import React, { useState } from 'react';

// --- ICONS ---
// Using inline SVGs for simplicity and to avoid external dependencies.

const ProcurementIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const RegulatoryIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

const MicrosoftIcon = () => (
    <svg className="w-6 h-6 mr-2" viewBox="0 0 21 21" xmlns="http://www.w3.org/2000/svg">
        <path fill="#f25022" d="M1 1h9v9H1z"/>
        <path fill="#00a4ef" d="M1 11h9v9H1z"/>
        <path fill="#7fba00" d="M11 1h9v9h-9z"/>
        <path fill="#ffb900" d="M11 11h9v9h-9z"/>
    </svg>
);

const SpinnerIcon = () => (
    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);

const HelpIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.546-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const SettingsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
const NewModuleIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>;


// --- LOGIN COMPONENT ---
const LoginPage = ({ onLoginSuccess }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        setTimeout(() => {
            if (password === 'fail') {
                setError('Invalid username or password. Please try again.');
                setIsLoading(false);
            } else {
                const user = { name: 'Nama' };
                onLoginSuccess(user);
            }
        }, 1500);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 font-poppins">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
                <div className="flex justify-center mb-8">
                    <img src="/bial-logo.png" alt="BIAL Logo" className="h-10" />
                </div>
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">Welcome Back</h2>
                <p className="text-center text-gray-500 mb-8">Sign in to your Enterprise Platform</p>

                <button 
                    onClick={handleLogin}
                    disabled={isLoading}
                    className="w-full flex items-center justify-center bg-white border border-gray-300 text-gray-700 font-semibold py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors duration-300 mb-4"
                >
                    <MicrosoftIcon />
                    Sign in with Microsoft
                </button>

                <div className="relative flex py-5 items-center">
                    <div className="flex-grow border-t border-gray-300"></div>
                    <span className="flex-shrink mx-4 text-gray-400">Or</span>
                    <div className="flex-grow border-t border-gray-300"></div>
                </div>
                
                <form onSubmit={handleLogin}>
                    {error && <p className="bg-red-100 text-red-700 p-3 rounded-lg mb-4 text-center">{error}</p>}
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email Address
                        </label>
                        <input className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-purple-500" id="email" type="email" placeholder="name@example.com" value={email} onChange={e => setEmail(e.target.value)} required />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 mb-3 leading-tight focus:outline-none focus:ring-2 focus:ring-purple-500" id="password" type="password" placeholder="Use 'fail' to see error" value={password} onChange={e => setPassword(e.target.value)} required />
                    </div>
                    <div className="flex items-center justify-between">
                        <button style={{backgroundColor: '#4F2F84'}} className="w-full hover:opacity-90 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition-opacity duration-300 flex items-center justify-center" type="submit" disabled={isLoading}>
                            {isLoading && <SpinnerIcon />}
                            {isLoading ? 'Signing In...' : 'Sign In'}
                        </button>
                    </div>
                </form>
            </div>
             <footer className="text-center mt-8 text-gray-500">
                <p>&copy; {new Date().getFullYear()} BIAL. All Rights Reserved.</p>
            </footer>
        </div>
    );
};

// --- PORTAL COMPONENT (REDESIGNED) ---
const Portal = ({ user, onLogout }) => {
    const [activeModule, setActiveModule] = useState('Procurement');

    const SideNavItem = ({ icon, text, isActive, onClick }) => (
        <button 
            onClick={onClick}
            className={`flex items-center w-full text-left px-4 py-2.5 rounded-lg transition-colors duration-200 ${
                isActive 
                ? 'bg-purple-100 text-purple-800' 
                : 'text-gray-600 hover:bg-gray-200'
            }`}
        >
            {icon}
            <span className="ml-3 font-medium">{text}</span>
        </button>
    );

    const ModuleCard = ({ icon, title, description, url }) => {
      const handleCardClick = () => {
          window.open(url, '_blank', 'noopener,noreferrer');
      };

      return (
          <div
              onClick={handleCardClick}
              className="bg-white border border-gray-200 rounded-xl shadow-md p-6 flex flex-col items-start hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ease-in-out cursor-pointer"
          >
              <div className="flex items-center mb-4">
                  <div className="bg-gray-100 p-3 rounded-lg">{icon}</div>
                  <h3 className="text-xl font-bold text-gray-800 ml-4">{title}</h3>
              </div>
              <p className="text-gray-600 mb-6 flex-grow">{description}</p>
              <button
                  style={{backgroundColor: '#4F2F84'}}
                  className="mt-auto hover:opacity-90 text-white font-semibold py-2 px-6 rounded-lg transition-opacity duration-300 self-start"
              >
                  Launch Module
              </button>
          </div>
      );
    };

    return (
        <div className="flex h-screen bg-gray-100 font-poppins">
            {/* Side Navigation */}
            <aside className="w-64 bg-white border-r border-gray-200 flex flex-col p-4">
                <button className="flex items-center justify-center w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-2.5 px-4 rounded-lg transition-colors duration-200 mb-6">
                    <NewModuleIcon />
                    <span className="ml-2">New Module</span>
                </button>
                
                <nav className="flex-grow space-y-2">
                    <p className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Modules</p>
                    <SideNavItem 
                        icon={<ProcurementIcon />} 
                        text="BIAL Procurement" 
                        isActive={activeModule === 'Procurement'} 
                        onClick={() => setActiveModule('Procurement')} 
                    />
                    <SideNavItem 
                        icon={<RegulatoryIcon />} 
                        text="Regulatory Assistant" 
                        isActive={activeModule === 'Regulatory'} 
                        onClick={() => setActiveModule('Regulatory')} 
                    />
                </nav>

                <div className="mt-auto">
                    <SideNavItem icon={<HelpIcon />} text="Help" />
                    <SideNavItem icon={<SettingsIcon />} text="Settings" />
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col">
                <header className="bg-white border-b border-gray-200 p-4 flex justify-between items-center">
                    <div className="flex items-center">
                        <img src="/bial-logo.png" alt="BIAL Logo" className="h-8" />
                        <span className="ml-3 text-lg font-semibold text-gray-700">Bangalore International Airport Limited</span>
                    </div>
                    <div className="flex items-center">
                        <span className="text-gray-700 mr-4">Welcome, {user.name}</span>
                        <button onClick={onLogout} className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded-lg transition-colors duration-300">
                            Logout
                        </button>
                    </div>
                </header>

                <div className="flex-1 p-8 overflow-y-auto">
                    <h1 className="text-3xl font-bold text-gray-800 mb-6">Enterprise Platform</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <ModuleCard 
                            icon={<ProcurementIcon />} 
                            title="BIAL Procurement" 
                            description="Streamline and manage all procurement activities, from sourcing to payment." 
                            url="https://your-procurement-app.com" 
                        />
                        <ModuleCard 
                            icon={<RegulatoryIcon />} 
                            title="BIAL Regulatory Assistant" 
                            description="Navigate complex regulatory landscapes and ensure compliance with ease." 
                            url="https://bial-test-mdm.onrender.com/" 
                        />
                    </div>
                </div>
            </main>
        </div>
    );
};

// --- MAIN APP COMPONENT ---
export default function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    const handleLoginSuccess = (loggedInUser) => {
        setUser(loggedInUser);
        setIsAuthenticated(true);
    };

    const handleLogout = () => {
        setUser(null);
        setIsAuthenticated(false);
    };

    return (
        <div className="font-poppins">
            {isAuthenticated ? <Portal user={user} onLogout={handleLogout} /> : <LoginPage onLoginSuccess={handleLoginSuccess} />}
        </div>
    );
}

