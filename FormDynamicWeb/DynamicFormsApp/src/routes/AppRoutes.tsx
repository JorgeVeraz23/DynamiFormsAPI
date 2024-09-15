// src/routes/index.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import MainLayout from '../layouts/MainLayout';
// import Home from '../pages/Home';
// import About from '../pages/About';
// import PersonForm from '../pages/PersonForm';
// import PetForm from '../pages/PetForm';
import MainLayout from '../components/layout/MainLayout';
import Home from '../pages/DynamicFormPages/Home';
import About from '../pages/DynamicFormPages/About';
import FormCardPage from '../pages/DynamicFormPages/FormCardPage';
import PetForm from '../pages/DynamicFormPages/PetForm';
import EditFormPage from '../pages/DynamicFormPages/EditFormPage';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="form-page" element={<FormCardPage />} />
          <Route path='form-edit-page/:id' element={<EditFormPage />} />
          <Route path="pet-form" element={<PetForm />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
