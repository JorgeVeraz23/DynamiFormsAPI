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
import { createFormGroupAction } from "../../redux/action/FormGroupAction";
import { FormGroupEntity } from "data/Entity/FormGroupEntity";
import { getAllFormAction } from "../../redux/action/FormAction";
import { FormEntity } from "data/Entity/FormEntity";
import Swal from "sweetalert2";
import Autocomplete from '@mui/material/Autocomplete';

const CreateFormGroupPage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();


  const [formGroup, setFormGroup] = useState<FormGroupEntity>({
    idFormGroup: 0,
    name: "",
    formId: 0,
  });

  const [selectedForm, setSelectedForm] = useState<FormEntity | null>(null); 
  const [error, setError] = useState(false);


  const { loading, error: formGroupError } = useSelector((state: RootState) => state.formGroup);
  const { forms, loading: formsLoading } = useSelector((state: RootState) => state.form);

  useEffect(() => {
  
    dispatch(getAllFormAction());
  }, [dispatch]);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string, value: unknown }>) => {
    const { name, value } = e.target as HTMLInputElement;
    setFormGroup({
      ...formGroup,
      [name]: value,
    });
  };

  const handleSelectChange = (event: React.SyntheticEvent, value: FormEntity | null) => {
    setSelectedForm(value);
    setFormGroup({
      ...formGroup,
      formId: value ? value.idForm : 0,
    });
  };

  // Enviar formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formGroup.name || formGroup.formId === 0) {
      setError(true);
      return;
    }

    setError(false);

    const response = await dispatch(createFormGroupAction(formGroup)) as { payload: any };

    if (response.payload.success) {
 
      Swal.fire({
        title: "Grupo de formulario creado",
        text: response.payload.message,
        icon: "success",
        confirmButtonText: "Aceptar",
      });


      setFormGroup({ idFormGroup: 0, name: "", formId: 0 });
      setSelectedForm(null); 
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
    <Container sx={{ marginTop: '20px' }}>
      <Paper elevation={6} sx={{ padding: 4, borderRadius: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center" color="primary">
          Crear Grupo de Formulario
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Nombre del Grupo"
              variant="outlined"
              name="name"
              value={formGroup.name}
              onChange={handleChange}
              error={error && formGroup.name === ""}
              helperText={error && formGroup.name === "" ? "El nombre es obligatorio" : ""}
            />
          </Grid>

          <Grid item xs={12}>
            {formsLoading ? (
              <CircularProgress />
            ) : (
              <Autocomplete
                value={selectedForm} 
                options={forms} 
                getOptionLabel={(option: FormEntity) => option.name} 
                onChange={handleSelectChange} 
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Selecciona un Formulario"
                    variant="outlined"
                    error={error && formGroup.formId === 0}
                    helperText={error && formGroup.formId === 0 ? "El formulario es obligatorio" : ""}
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
                {loading ? "Creando..." : "Crear Grupo"}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default CreateFormGroupPage;
