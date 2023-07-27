import './App.css';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { MainLayout } from './shared/layout/MainLayout';
import HomePage from './modules/HomePage';
import { PatientPage } from './modules/patients/components/PatientPage';
import { ReceivingPatientPage } from './modules/patients/components/ReceivingPatientPage';

function App() {
  return (
    <HashRouter>
      <Routes>
        {/* <Route errorElement={<h2>Error</h2>}>
          <Route path='/auth/login' element={<LogInPage />} />
        </Route> */}
        <Route element={<MainLayout />} errorElement={<h2>Error</h2>}>
          <Route path='/' element={<HomePage />} />
          <Route path='/receiving-patient' element={<ReceivingPatientPage />} />
          <Route path='/patient' element={<PatientPage />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
