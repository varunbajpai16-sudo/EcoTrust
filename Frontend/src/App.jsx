import { useState } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import LiveMonitoring from './pages/LiveMonitoring';
import Alerts from './pages/Alert';
import Compliance from './pages/Compliance';
import Reports from './pages/Reports';
import Analytics from './pages/Analytics';
import Devices from './pages/Devices';
import About from './pages/About';
import Resources from './pages/Resources';
import Login from './pages/Login';
import SelectRole from './pages/Select_Role';
import GovernmentRegistration from './pages/Goverment_USer';
import IndustryRegistration from './pages/Industry_User';
import Settings from './pages/setting';
import Profile from './pages/profile';
import FactoryDetails from './pages/Factory_Details';
import SensorInvestigation from './pages/Sensorinvestigation';
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/LiveMonitoring" element={<LiveMonitoring />} />
        <Route path="/compliance" element={<Compliance />} />
        <Route path="/Alerts" element={<Alerts />} />
        <Route path="/Analytics" element={<Analytics />} />
        <Route path="/Reports" element={<Reports />} />
        <Route path="/Devices" element={<Devices />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/selectrole" element={<SelectRole />} />
         <Route path="/settings" element={<Settings />} />
         <Route path="/profile" element={<Profile />} />
         <Route path="/factorydetails" element={<FactoryDetails />} />
        <Route
          path="/GovernmentRegistration"
          element={<GovernmentRegistration />}
        />
        <Route
          path="/IndustryRegistration"
          element={<IndustryRegistration />}
        />
         <Route path="/investigation/:id" element={<SensorInvestigation />} />
      </Routes>
    </>
  );
}

export default App;
