import React, {useState} from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
  Box,
} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useAppDispatch } from '../../redux/hooksRedux';
import { createFormAction, CreateFormResponse, getAllFormAction } from '../../redux/action/FormAction';
import { FormEntity } from 'data/Entity/FormEntity';
import Swal from 'sweetalert2';

const CreateFormPage: React.FC = () => {
  const dispatch = useAppDispatch();

  const [form, setForm] = useState<FormEntity>({
    idForm: 0,
    name: '',
    description: '',
  });
  
  const [error, setError] = useState(false);

  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string, value: unknown }>) => {
    const { name, value } = e.target as HTMLInputElement;
    setForm({
      ...form,
      [name]: value,
    });
  };


  const handleSubmit = async () => {
    if (!form.name || !form.description) {
      setError(true);
      return;
    }

    setError(false); 

    const response = await dispatch(createFormAction(form)) as { payload: CreateFormResponse };

    if (response.payload.success) {

      setForm({ idForm: 0, name: '', description: '' });

        await dispatch(getAllFormAction());

      Swal.fire({
        title: 'Formulario Creado',
        text: response.payload.message, 
        icon: 'success',
        confirmButtonText: 'Aceptar',
      });
    } else {
 
      Swal.fire({
        title: 'Error',
        text: response.payload.message, 
        icon: 'error',
        confirmButtonText: 'Aceptar',
      });
    }
  };

  return (
    <Container sx={{ marginTop: '20px' }}>
      <Paper elevation={6} sx={{ padding: 4, borderRadius: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center" color="primary">
          Crear Nuevo Formulario
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Nombre del Formulario"
              variant="outlined"
              name="name" 
              value={form.name}
              onChange={handleInputChange}
              error={error && form.name === ''}
              helperText={error && form.name === '' ? 'El nombre es obligatorio' : ''}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Descripción"
              multiline
              rows={4}
              variant="outlined"
              name="description" 
              value={form.description}
              onChange={handleInputChange}
              error={error && form.description === ''}
              helperText={error && form.description === '' ? 'La descripción es obligatoria' : ''}
            />
          </Grid>

          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Box>
              <Button
                variant="contained"
                startIcon={<AddCircleIcon />}
                sx={{
                  backgroundColor: '#2196f3',
                  borderRadius: 10,
                  padding: '10px 20px',
                  '&:hover': { backgroundColor: '#1976d2' },
                  fontSize: '16px',
                }}
                onClick={handleSubmit}
              >
                Crear Formulario
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default CreateFormPage;
