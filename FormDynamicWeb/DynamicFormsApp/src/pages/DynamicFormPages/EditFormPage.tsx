import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
import { useAppDispatch, useAppSelector } from '../../redux/hooksRedux';
import { RootState } from '../../redux/store';
import { editFormAction } from '../../redux/action/FormAction';
import { Form } from '../../data/Entity/Entities';
import { TextField, Button, Container, Typography, CircularProgress, Alert } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';

const EditFormPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const form = useAppSelector((state: RootState) =>
    state.form.data?.find((f) => f.idForm === Number(id))
  );
  const { loading, error } = useAppSelector((state: RootState) => state.form);
  const [formData, setFormData] = useState<Form | null>(null);

  useEffect(() => {
    if (form) {
      setFormData(form);
    }
  }, [form]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState!,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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
            value={formData.name}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Descripción"
            name="description"
            value={formData.description}
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

export default EditFormPage;
