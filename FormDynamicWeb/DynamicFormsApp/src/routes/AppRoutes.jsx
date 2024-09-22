// src/routes/index.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import MainLayout from '../components/layout/MainLayout';
import Home from '../pages/DynamicFormPages/Home';
import About from '../pages/DynamicFormPages/About';
// import { FormCardPage } from '../pages/DynamicFormPages/FormCardPage';
import FormCarPage from "../pages/DynamicFormPages/FormCardPage"
import PetForm from '../pages/DynamicFormPages/PetForm';

import { EditFormPage } from '../pages/DynamicFormPages/EditFormPage';

import CreateFormPage from '../pages/DynamicFormPages/CreateFormPage'
import CreateFormGroupPage from '../pages/DynamicFormPages/CreateFormGroupPage'
import CreateFormFieldPage from '../pages/DynamicFormPages/CreateFormFieldPage'


const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="form-page" element={<FormCarPage />} />
          <Route path='/edit-form/:id' element={<EditFormPage />} />
          <Route path='create-form-page' element={<CreateFormPage/>} />
          <Route path='create-form-group' element={<CreateFormGroupPage />} />
          <Route path='create-form-field' element={<CreateFormFieldPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
