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
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "redux/store";
import { createFormFieldAction } from "../../redux/action/FormFieldAction";
import Swal from "sweetalert2";
import Autocomplete from '@mui/material/Autocomplete';
import { FormFieldEntity } from "data/Entity/FormFieldEntity";
import { KeyValueEntity } from "data/Entity/KeyValueEntity";
import { getFileTypeSelectorAction } from "../../redux/action/FieldTypeAction";
import { getFormGroupSelectorAction } from "../../redux/action/FormGroupAction";

const CreateFormFilePage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();

  // Estado para opciones del dropdown
  const [dropdownOptions, setDropdownOptions] = useState<{ idOption: number, name: string }[]>([]);
  const [newOption, setNewOption] = useState<string>("");

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

  const { formFields, loading } = useSelector((state: RootState) => state.formField);
  const { fieldTypes, loading: formsLoading } = useSelector((state: RootState) => state.fielType);
  const { KeyValueSelectorFormGroup, loading: formGroupLoading } = useSelector((state: RootState) => state.formGroup);

  useEffect(() => {
    dispatch(getFileTypeSelectorAction());
    dispatch(getFormGroupSelectorAction());
  }, [dispatch]);

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

  // Manejar opciones del dropdown
  const handleAddOption = () => {
    if (newOption.trim()) {
      setDropdownOptions([...dropdownOptions, { idOption: 0, name: newOption }]);
      setNewOption("");
    }
  };

  const handleDeleteOption = (index: number) => {
    setDropdownOptions(dropdownOptions.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formFile.name === '' || formFile.fieldTypeId === 0 || formFile.formGroupId === 0) {
      setError(true);
      return;
    }

    setError(false);

    // Crear payload incluyendo las opciones del dropdown si es el tipo seleccionado
    const payload = {
      ...formFile,
      dropdownOptions: formFile.fieldTypeId === 1 ? dropdownOptions : [], // 1 es un ejemplo del id del tipo dropdown
    };

    const response = await dispatch(createFormFieldAction(payload)) as { payload: any };

    if (response.payload.success) {
      Swal.fire({
        title: "Campo de formulario creado",
        text: response.payload.message,
        icon: "success",
        confirmButtonText: "Aceptar",
      });

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
      setDropdownOptions([]);
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

            {/* Mostrar sección de opciones si el tipo es dropdown */}
            {formFile.fieldTypeId === 1 && (
              <Grid item xs={12}>
                <Typography variant="h6">Opciones del Dropdown</Typography>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={10}>
                    <TextField
                      fullWidth
                      label="Nueva Opción"
                      value={newOption}
                      onChange={(e) => setNewOption(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleAddOption}
                    >
                      <AddCircleIcon />
                    </Button>
                  </Grid>
                </Grid>

                {/* Lista de opciones */}
                <List>
                  {dropdownOptions.map((option, index) => (
                    <ListItem key={index}>
                      <ListItemText primary={option.name} />
                      <ListItemSecondaryAction>
                        <IconButton edge="end" onClick={() => handleDeleteOption(index)}>
                          <DeleteIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
                </List>
              </Grid>
            )}

            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary" fullWidth>
                {loading ? <CircularProgress size={24} /> : "Crear Campo"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default CreateFormFilePage;
