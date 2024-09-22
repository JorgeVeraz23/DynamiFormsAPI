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
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "redux/store";
import { createFormFieldAction, getAllFormFieldAction } from "../../redux/action/FormFieldAction";
import { getAllFormAction } from "../../redux/action/FormAction";
import Swal from "sweetalert2";
import Autocomplete from '@mui/material/Autocomplete';
import { FormFieldEntity } from "data/Entity/FormFieldEntity";
import { KeyValueEntity } from "data/Entity/KeyValueEntity";
// import { getFieldTypeSelectorAction } from "../../redux/action/FieldTypeAction";
import { getFileTypeSelectorAction } from "../../redux/action/FieldTypeAction";
const CreateFormFilePage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();

  // Estado local para los valores del formulario
  const [formFile, setFormFile] = useState<FormFieldEntity>({
    idFormField: 0,
    name: '',
    index: 0,
    isOptional: false,
    fieldTypeId: 0,
    formGroupId: 0,
  });

  const [selectedForm, setSelectedForm] = useState<KeyValueEntity | null>(null); // Cambié a FormEntity
  const [error, setError] = useState(false);

  // Obtener el estado desde el store de Redux
  const { formFields, loading } = useSelector((state: RootState) => state.formField);
  const { fieldTypes, loading: formsLoading } = useSelector((state: RootState) => state.fielType);

  useEffect(() => {
    // Obtener los formularios al cargar el componente
    dispatch(getFileTypeSelectorAction());
  }, [dispatch]);

  // Manejar cambios en los campos del formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string, value: unknown }>) => {
    const { name, value } = e.target as HTMLInputElement;
    setFormFile({
      ...formFile,
      [name]: value,
    });
  };

  const handleSelectChange = (event: React.SyntheticEvent, value: KeyValueEntity | null) => {
    setSelectedForm(value);
    setFormFile({
      ...formFile,
      fieldTypeId: value ? value.key : 0,
      formGroupId: value ? value.key : 0, // Asegúrate de que `id` sea la propiedad correcta
    });
  };

  // Enviar formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formFile.name === '' || formFile.fieldTypeId === 0 || formFile.formGroupId === 0) {
      setError(true);
      return;
    }

    setError(false);

    // Despachar acción para crear el campo del formulario
    const response = await dispatch(createFormFieldAction(formFile)) as { payload: any };

    if (response.payload.success) {
      // Muestra el alert de éxito
      Swal.fire({
        title: "Campo de formulario creado",
        text: response.payload.message,
        icon: "success",
        confirmButtonText: "Aceptar",
      });

      // Limpiar los campos del formulario
      setFormFile({ idFormField: 0, name: "", fieldTypeId: 0, formGroupId: 0, index: 0, isOptional: false });
      setSelectedForm(null); // Limpiar el valor del Autocomplete
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
              value={formFile.name}
              onChange={handleChange}
              error={error && formFile.name === ""}
              helperText={error && formFile.name === "" ? "El nombre es obligatorio" : ""}
            />
          </Grid>

          <Grid item xs={12}>
            {formsLoading ? (
              <CircularProgress />
            ) : (
              <Autocomplete
                value={selectedForm} // Vinculado al estado para que se limpie correctamente
                options={fieldTypes} // Lista de formularios disponibles
                getOptionLabel={(option: KeyValueEntity) => option.value} // Etiqueta mostrada
                onChange={handleSelectChange} // Cambiar el valor seleccionado
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Selecciona un tipo de formulario"
                    variant="outlined"
                    error={error && formFile.fieldTypeId === 0}
                    helperText={error && formFile.fieldTypeId === 0 ? "El formulario es obligatorio" : ""}
                  />
                )}
              />
            )}
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
                disabled={loading}
              >
                {loading ? "Creando..." : "Crear Campo"}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default CreateFormFilePage;
