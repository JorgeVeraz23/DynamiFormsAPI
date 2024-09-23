import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooksRedux';
import { getAllFormAction, getFormByIdAction, deleteFormAction } from '../../redux/action/FormAction';
import { Container, Typography, CircularProgress, Alert, Grid2, Card, CardContent, CardActions, IconButton, Grid } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';


import { useNavigate } from 'react-router-dom';
import { RootState } from 'redux/store'; // Importa RootState desde tu configuración de Redux
import { FormEntity } from 'data/Entity/FormEntity';
const FormCardPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Seleccionamos el estado con tipado del RootState
  const { forms, loading, error } = useAppSelector((state: RootState) => state.form);

  // Efecto para obtener los formularios si no hay ninguno cargado
  useEffect(() => {
    if (!loading && forms.length === 0) {
      dispatch(getAllFormAction());
    }
  }, [dispatch, loading, forms.length]);

  // Para revisar el estado en consola durante el desarrollo
  useEffect(() => {
    console.log('Loading:', loading);
    console.log('Forms:', forms);
    console.log('Error:', error);
  }, [loading, forms, error]);

  // Manejar la acción de ver el formulario y navegar a la página de edición
  const handleView = (id: number) => {
    dispatch(getFormByIdAction(id)).then((result) => {
      if (getFormByIdAction.fulfilled.match(result)) {
        navigate(`/form-display/${id}`);
      }
    });
  };

  // Manejar la acción de eliminar un formulario
  const handleDelete = (id: number) => {
    dispatch(deleteFormAction(id)).then((result) => {
      if (deleteFormAction.fulfilled.match(result)) {
        // Si se eliminó exitosamente, aquí podrías agregar lógica adicional
        // como mostrar un mensaje de éxito o actualizar la lista
      }
    });
  };

  return (
    <Container maxWidth="lg" sx={{ marginTop: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Formularios Disponibles
      </Typography>

      {loading && <CircularProgress />}

      {error && <Alert severity="error">{error}</Alert>}

      {/* Renderizar los formularios si están disponibles */}
      {forms.length > 0 ? (
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          {forms.map((form: FormEntity) => (
            <Grid item xs={2} sm={4} md={4} key={form.idForm}>
              <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
                <CardContent>
                  <Typography variant="h6" component="div">
                    {form.name}
                  </Typography>
                  <Typography color="text.secondary">
                    {form.description}
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'space-between' }}>
                  <IconButton onClick={() => handleView(form.idForm)} color="primary">
                    <VisibilityIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(form.idForm)} color="error">
                    <DeleteIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        !loading && <Typography>No hay formularios disponibles.</Typography>
      )}
    </Container>
  );
};

export default FormCardPage;
