import './App.css';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { MainLayout } from './shared/layout/MainLayout';
import { HomePage } from './modules/HomePage';
import { PatientPage } from './modules/patients/components/PatientPage';
import { ReceivingPatientPage } from './modules/patients/components/ReceivingPatientPage';
import { BloodTestPage } from './modules/paraclinical/components/blood-test/BloodTestPage';
import { ImagingDiagnosticPage } from './modules/paraclinical/components/imaging-diagnostic/ImagingDiagnosticPage';
import { LogInPage } from './modules/auth/components/LogInPage';
import { AuthChecker } from './modules/auth/layouts/AuthChecker';
import { MedicalExaminationPage } from './modules/medical-examination/medical-report/components/MedicalExaminationPage';
import { PrescriptionPage } from './modules/medical-examination/prescription/component/PrescriptionPage';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route errorElement={<h2>Error</h2>}>
          <Route path='/auth/login' element={<LogInPage />} />
        </Route>
        <Route element={<AuthChecker />}>
          <Route element={<MainLayout />} errorElement={<h2>Error</h2>}>
            <Route path='/' element={<HomePage />} />
            <Route path='/receiving-patient' element={<ReceivingPatientPage />} />
            <Route path='/patient' element={<PatientPage />} />
            <Route path='/medical-examination' element={<MedicalExaminationPage />} />
            <Route path='/prescription' element={<PrescriptionPage />} />
            <Route path='/imaging-diagnostic' element={<ImagingDiagnosticPage />} />
            <Route path='/blood-test' element={<BloodTestPage />} />
          </Route>
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
