import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooksRedux';
import { editFormAction } from '../../redux/action/FormAction';
import { TextField, Button, Container, Typography, CircularProgress, Alert } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';

export const EditFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const form = useAppSelector((state) =>
    state.form.data?.find((f) => f.idForm === Number(id))
  );
  const { loading, error } = useAppSelector((state) => state.form);
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    if (form) {
      setFormData(form);
    }
  }, [form]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData) {
      dispatch(editFormAction(formData)).then((result) => {
        if (editFormAction.fulfilled.match(result)) {
          navigate('/form-list'); // Redirigir a la lista de formularios
        }
      });
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        Editar Formulario
      </Typography>
      {loading && <CircularProgress />}
      {error && <Alert severity="error">{error}</Alert>}
      {formData && (
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="Nombre"
            name="name"
            value={formData.name || ''}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Descripción"
            name="description"
            value={formData.description || ''}
            onChange={handleChange}
          />
          <Button type="submit" variant="contained" color="primary">
            Guardar Cambios
          </Button>
        </form>
      )}
    </Container>
  );
};
