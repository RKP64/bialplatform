import React, { useState } from 'react';
import { PublicClientApplication } from '@azure/msal-browser';
import { MsalProvider, AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from '@azure/msal-react';

// --- MSAL CONFIGURATION ---
// IMPORTANT: You must replace these placeholder values with your actual
// Azure app registration details.
const msalConfig = {
  auth: {
    clientId: "YOUR_CLIENT_ID_HERE", // Your application (client) ID from Azure
    authority: "https://login.microsoftonline.com/YOUR_TENANT_ID_HERE", // Your tenant ID
    redirectUri: window.location.origin
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: false,
  }
};

const msalInstance = new PublicClientApplication(msalConfig);

// --- ICONS ---
const BIALLogo = ({ className }) => (
    <svg className={className} viewBox="0 0 224 54" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M36.3291 43.3981V10.0581H41.3211V29.8661L55.4571 10.0581H61.4331L45.4131 31.8101L61.7811 43.3981H55.4571L41.3211 32.9941V43.3981H36.3291Z" fill="#4F2F84"/>
        <path d="M66.1133 10.0581H79.2013C83.9853 10.0581 87.7613 10.9941 90.5293 12.8661C93.3253 14.7101 94.7253 17.3381 94.7253 20.7501C94.7253 23.4701 93.8933 25.7981 92.2293 27.7341C90.5933 29.6421 88.2653 30.9501 85.2453 31.6581L95.4453 43.3981H88.8933L79.4133 32.2541H71.1053V43.3981H66.1133V10.0581ZM71.1053 27.9741H78.4133C81.4933 27.9741 83.7613 27.2941 85.2173 25.9421C86.6733 24.5621 87.4013 22.8061 87.4013 20.6741C87.4013 18.5701 86.6733 16.8421 85.2173 15.4901C83.7613 14.1101 81.4933 13.4301 78.4133 13.4301H71.1053V27.9741Z" fill="#4F2F84"/>
        <path d="M99.3135 10.0581H104.305V43.3981H99.3135V10.0581Z" fill="#4F2F84"/>
        <path d="M110.161 43.3981V10.0581H127.385V13.4301H115.153V24.8941H125.849V28.2661H115.153V40.0261H127.733V43.3981H110.161Z" fill="#4F2F84"/>
        <path d="M132.073 10.0581H145.161C149.945 10.0581 153.721 10.9941 156.489 12.8661C159.285 14.7101 160.685 17.3381 160.685 20.7501C160.685 23.4701 159.853 25.7981 158.189 27.7341C156.553 29.6421 154.225 30.9501 151.205 31.6581L161.405 43.3981H154.853L145.373 32.2541H137.065V43.3981H132.073V10.0581ZM137.065 27.9741H144.373C147.453 27.9741 149.721 27.2941 151.177 25.9421C152.633 24.5621 153.361 22.8061 153.361 20.6741C153.361 18.5701 152.633 16.8421 151.177 15.4901C149.721 14.1101 147.453 13.4301 144.373 13.4301H137.065V27.9741Z" fill="#4F2F84"/>
        <path d="M21.2852 26.7C21.2852 36.02 14.8052 43.4 5.92519 43.4C-2.92481 43.4 -9.40481 36.02 -9.40481 26.7C-9.40481 17.38 -2.92481 10 5.92519 10C14.8052 10 21.2852 17.38 21.2852 26.7Z" fill="#E5007E"/>
        <path d="M189.983 26.7C189.983 36.02 196.463 43.4 205.343 43.4C214.193 43.4 220.673 36.02 220.673 26.7C220.673 17.38 214.193 10 205.343 10C196.463 10 189.983 17.38 189.983 26.7Z" fill="#4F2F84"/>
        <path d="M169.349 10.0581H174.341V43.3981H169.349V10.0581Z" fill="#4F2F84"/>
    </svg>
);
const ProcurementIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>;
const RegulatoryIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>;
const MicrosoftIcon = () => <svg className="w-6 h-6 mr-2" viewBox="0 0 21 21" xmlns="http://www.w3.org/2000/svg"><path fill="#f25022" d="M1 1h9v9H1z"/><path fill="#00a4ef" d="M1 11h9v9H1z"/><path fill="#7fba00" d="M11 1h9v9h-9z"/><path fill="#ffb900" d="M11 11h9v9h-9z"/></svg>;
const HelpIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.546-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const SettingsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
const NewModuleIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>;

// --- LOGIN COMPONENT (MSAL ENABLED) ---
const LoginPage = () => {
    const { instance } = useMsal();

    const handleMicrosoftLogin = () => {
        instance.loginPopup().catch(e => {
            console.error(e);
        });
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 font-poppins">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
                <div className="flex justify-center mb-8">
                    <BIALLogo className="h-10" />
                </div>
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">Welcome</h2>
                <p className="text-center text-gray-500 mb-8">Sign in to the BIAL Enterprise Platform</p>
                <button 
                    onClick={handleMicrosoftLogin}
                    className="w-full flex items-center justify-center bg-white border border-gray-300 text-gray-700 font-semibold py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors duration-300"
                >
                    <MicrosoftIcon />
                    Sign in with Microsoft
                </button>
            </div>
             <footer className="text-center mt-8 text-gray-500">
                <p>&copy; {new Date().getFullYear()} BIAL. All Rights Reserved.</p>
            </footer>
        </div>
    );
};

// --- PORTAL COMPONENT ---
const Portal = () => {
    const { instance, accounts } = useMsal();
    const [activeModule, setActiveModule] = useState('Procurement');
    const user = accounts[0];

    const handleLogout = () => {
        instance.logoutPopup();
    };
    
    // ... (This component remains largely unchanged)
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

            <main className="flex-1 flex flex-col">
                <header className="bg-white border-b border-gray-200 p-4 flex justify-between items-center">
                    <BIALLogo className="h-8" />
                    <div className="flex items-center">
                        <span className="text-gray-700 mr-4">Welcome, {user.name}</span>
                        <button onClick={handleLogout} className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded-lg transition-colors duration-300">
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
                            url="https://your-regulatory-app.com" 
                        />
                    </div>
                </div>
            </main>
        </div>
    );
};

// --- MAIN APP COMPONENT (WRAPPED WITH MSAL) ---
export default function App() {
    return (
        <MsalProvider instance={msalInstance}>
            <div className="font-poppins">
                <AuthenticatedTemplate>
                    <Portal />
                </AuthenticatedTemplate>
                <UnauthenticatedTemplate>
                    <LoginPage />
                </UnauthenticatedTemplate>
            </div>
        </MsalProvider>
    );
}