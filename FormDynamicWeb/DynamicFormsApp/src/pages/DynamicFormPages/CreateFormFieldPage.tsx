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
  Checkbox
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "redux/store";
import { createFormFieldAction } from "../../redux/action/FormFieldAction";
import Swal from "sweetalert2";
import Autocomplete from '@mui/material/Autocomplete';
import { FormFieldEntity } from "data/Entity/FormFieldEntity";
import { KeyValueEntity } from "data/Entity/KeyValueEntity";
import { getFileTypeSelectorAction } from "../../redux/action/FieldTypeAction";
import { getFormGroupSelectorAction } from "../../redux/action/FormGroupAction";  // Importar la acción para obtener los grupos de formulario

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

  const [selectedFormType, setSelectedFormType] = useState<KeyValueEntity | null>(null);
  const [selectedFormGroup, setSelectedFormGroup] = useState<KeyValueEntity | null>(null);
  const [error, setError] = useState(false);

  // Obtener el estado desde el store de Redux
  const { formFields, loading } = useSelector((state: RootState) => state.formField);
  const { fieldTypes, loading: formsLoading } = useSelector((state: RootState) => state.fielType);
  const { KeyValueSelectorFormGroup, loading: formGroupLoading } = useSelector((state: RootState) => state.formGroup);

  // Obtener los tipos de campo y grupos de formulario al cargar el componente
  useEffect(() => {
    dispatch(getFileTypeSelectorAction());
    dispatch(getFormGroupSelectorAction());
  }, [dispatch]);

  // Manejar cambios en los campos del formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string, value: unknown }>) => {
    const { name, value } = e.target as HTMLInputElement;
    setFormFile({
      ...formFile,
      [name]: value,
    });
  };

  const handleSelectFormTypeChange = (event: React.SyntheticEvent, value: KeyValueEntity | null) => {
    setSelectedFormType(value);
    setFormFile({
      ...formFile,
      fieldTypeId: value ? value.key : 0,
    });
  };

  const handleSelectFormGroupChange = (event: React.SyntheticEvent, value: KeyValueEntity | null) => {
    setSelectedFormGroup(value);
    setFormFile({
      ...formFile,
      formGroupId: value ? value.key : 0,
    });
  };

  const handleOptionalChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormFile({
      ...formFile,
      isOptional: event.target.checked,
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
      setFormFile({
        idFormField: 0,
        name: '',
        index: 0,
        isOptional: false,
        fieldTypeId: 0,
        formGroupId: 0,
      });
      setSelectedFormType(null);
      setSelectedFormGroup(null);
    } else {
      Swal.fire({
        title: "Error",
        text: response.payload.message,
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    }
  };

  return (
    <Container>
      <Paper elevation={3} style={{ padding: 20 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          Crear Campo de Formulario
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Nombre del Campo"
                name="name"
                value={formFile.name}
                onChange={handleChange}
                error={error && formFile.name === ''}
                helperText={error && formFile.name === '' ? "Este campo es obligatorio" : ''}
              />
            </Grid>

            {/* Autocomplete para Tipo de Campo */}
            <Grid item xs={12}>
              <Autocomplete
                options={fieldTypes || []}
                getOptionLabel={(option: KeyValueEntity) => option.value}
                value={selectedFormType}
                onChange={handleSelectFormTypeChange}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Seleccionar Tipo de Campo"
                    error={error && formFile.fieldTypeId === 0}
                    helperText={error && formFile.fieldTypeId === 0 ? "Este campo es obligatorio" : ''}
                  />
                )}
              />
            </Grid>

            {/* Autocomplete para Grupo de Formulario */}
            <Grid item xs={12}>
              <Autocomplete
                options={KeyValueSelectorFormGroup || []}
                getOptionLabel={(option: KeyValueEntity) => option.value}
                value={selectedFormGroup}
                onChange={handleSelectFormGroupChange}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Seleccionar Grupo de Formulario"
                    error={error && formFile.formGroupId === 0}
                    helperText={error && formFile.formGroupId === 0 ? "Este campo es obligatorio" : ''}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Índice"
                name="index"
                type="number"
                value={formFile.index}
                onChange={handleChange}
                error={error && formFile.index === 0}
                helperText={error && formFile.index === 0 ? "Este campo es obligatorio" : ''}
              />
            </Grid>

            {/* Checkbox para Campo Opcional */}
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formFile.isOptional}
                    onChange={handleOptionalChange}
                    name="isOptional"
                  />
                }
                label="Campo Opcional"
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                startIcon={<AddCircleIcon />}
                fullWidth
                disabled={loading || formsLoading || formGroupLoading}
              >
                {loading || formsLoading || formGroupLoading ? <CircularProgress size={24} /> : "Crear Campo"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default CreateFormFilePage;
