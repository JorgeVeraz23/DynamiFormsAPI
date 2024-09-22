import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
  Box,
  CircularProgress,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "redux/store";
import { createFormFieldAction } from "../../redux/action/FormFieldAction";
import { FormFieldEntity } from "data/Entity/FormFieldEntity";
import Swal from "sweetalert2";
import Autocomplete from '@mui/material/Autocomplete';

const CreateFormFieldPage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();

  // Estado local para los valores del formulario
  const [formField, setFormField] = useState<FormFieldEntity>({
    idFormField: 0,
    name: "",
    index: 0,
    isOptional: false,
    fieldTypeId: 1, // Valor predeterminado
    formGroupId: 1, // Valor predeterminado
  });

  const [error, setError] = useState(false);

  // Simular los valores del selector (quemados)
  const fieldTypeOptions = [
    { id: 1, name: "Texto" },
    { id: 2, name: "Número" },
    { id: 3, name: "Correo" },
  ];

  const formGroupOptions = [
    { id: 1, name: "Grupo 1" },
    { id: 2, name: "Grupo 2" },
  ];

  // Manejar cambios en los campos del formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormField({
      ...formField,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Enviar formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formField.name) {
      setError(true);
      return;
    }

    setError(false);

    // Despachar acción para crear el campo de formulario
    const response = await dispatch(createFormFieldAction(formField)) as { payload: any };

    if (response.payload.success) {
      // Muestra el alert de éxito
      Swal.fire({
        title: "Campo de formulario creado",
        text: response.payload.message,
        icon: "success",
        confirmButtonText: "Aceptar",
      });

      // Limpiar los campos del formulario
      setFormField({
        idFormField: 0,
        name: "",
        index: 0,
        isOptional: false,
        fieldTypeId: 1,
        formGroupId: 1,
      });
    } else {
      // Mostrar alert de error
      Swal.fire({
        title: "Error",
        text: response.payload.message,
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    }
  };

  return (
    <Container maxWidth="md" sx={{ marginTop: 4 }}>
      <Paper elevation={6} sx={{ padding: 4, borderRadius: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center" color="primary">
          Crear Campo de Formulario
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Nombre del Campo"
              variant="outlined"
              name="name"
              value={formField.name}
              onChange={handleChange}
              error={error && formField.name === ""}
              helperText={error && formField.name === "" ? "El nombre es obligatorio" : ""}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Índice"
              variant="outlined"
              type="number"
              name="index"
              value={formField.index}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
  <FormControlLabel
    control={
      <Checkbox
        name="isOptional"
        checked={formField.isOptional}
        onChange={handleChange}
      />
    }
    label="Campo Opcional"
  />
</Grid>
          <Grid item xs={12}>
            <Autocomplete
              options={fieldTypeOptions}
              getOptionLabel={(option) => option.name}
              onChange={(event, value) => setFormField({ ...formField, fieldTypeId: value ? value.id : 1 })}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Selecciona el Tipo de Campo"
                  variant="outlined"
                />
              )}
            />
          </Grid>

          <Grid item xs={12}>
            <Autocomplete
              options={formGroupOptions}
              getOptionLabel={(option) => option.name}
              onChange={(event, value) => setFormField({ ...formField, formGroupId: value ? value.id : 1 })}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Selecciona el Grupo de Formulario"
                  variant="outlined"
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
            <Box>
              <Button
                variant="contained"
                startIcon={<AddCircleIcon />}
                sx={{
                  backgroundColor: "#2196f3",
                  borderRadius: 10,
                  padding: "10px 20px",
                  "&:hover": { backgroundColor: "#1976d2" },
                  fontSize: "16px",
                }}
                onClick={handleSubmit}
              >
                Crear Campo
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default CreateFormFieldPage;
