import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooksRedux';
import { getAllFormAction } from '../../redux/action/FormAction';
import { Container, Typography, CircularProgress, Alert, Grid, Card, CardContent, CardActions, IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const FormCardPage = () => {
  const dispatch = useAppDispatch();
  const { forms, loading, error } = useAppSelector((state) => state.form);

  useEffect(() => {
    if (!loading && forms.length === 0) {
      dispatch(getAllFormAction());
    }
  }, [dispatch, loading, forms.length]);

  useEffect(() => {
    console.log('Loading:', loading);
    console.log('Forms:', forms);
    console.log('Error:', error);
  }, [loading, forms, error]);


  return (
    <Container maxWidth="lg" sx={{ marginTop: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Formularios Disponibles
      </Typography>

      {loading && <CircularProgress />}

      {error && <Alert severity="error">{error}</Alert>}

      {forms.length > 0 ? (
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          {forms.map((form) => (
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
      ) : (
        !loading && <Typography>No hay formularios disponibles.</Typography>
      )}
    </Container>
  );
};

export default FormCardPage;
