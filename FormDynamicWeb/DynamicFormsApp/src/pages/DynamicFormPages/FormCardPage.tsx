import React, { useEffect } from 'react';
import { RootState } from '../../redux/store';
import { deleteFormAction, editFormAction, getAllFormAction, getFormByIdAction } from '../../redux/action/FormAction';
import { Container, Card, CardContent, Typography, CardActions, IconButton, CircularProgress, Alert, Grid2 } from '@mui/material';
import Grid from '@mui/material/Grid2';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Form } from '../../data/Entity/Entities';
import { useAppDispatch, useAppSelector } from '../../redux/hooksRedux';
import { useNavigate } from 'react-router-dom';

const FormCardPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Seleccionamos los datos del store, asegurándonos de que están bien tipados
  const { data, loading, error } = useAppSelector((state: RootState) => state.form);

  useEffect(() => {
    dispatch(getAllFormAction());
  }, [dispatch]);

  const handleView = (idForm: number) => {
    // Lógica para ver detalles del formulario
    dispatch(getFormByIdAction(idForm));
  };



  const handleDelete = (idForm: number) => {
    // Lógica para eliminar el formulario
    dispatch(deleteFormAction(idForm));
  };

  const handleEdit = (idForm: number) => {
    navigate(`/edit-form/${idForm}`)
  }

  return (
    <Container maxWidth="lg" sx={{ marginTop: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Formularios Disponibles
      </Typography>

      {loading && <CircularProgress />}
      
      {error && <Alert severity="error">{error}</Alert>}

      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {data && data.map((form: Form) => (
          <Grid   size={{ xs: 2, sm: 4, md: 4 }} key={form.idForm}>
          <Card>
            <CardContent>
              <Typography variant="h6" component="div">
                {form.name}
              </Typography>
              <Typography color="text.secondary">
                {form.description}
              </Typography>
            </CardContent>
            <CardActions>
              <IconButton onClick={() => handleView(form.idForm)} color="primary">
                <VisibilityIcon />
              </IconButton>
              <IconButton onClick={() => handleEdit(form.idForm)} color="secondary">
                  <EditIcon />
                </IconButton>
              <IconButton onClick={() => handleDelete(form.idForm)} color="error">
                <DeleteIcon />
              </IconButton>
            </CardActions>
          </Card>
        </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default FormCardPage;
