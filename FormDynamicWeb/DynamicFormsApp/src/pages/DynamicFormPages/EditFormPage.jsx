import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooksRedux';
import { getFormByIdAction, editFormAction } from '../../redux/action/FormAction';
import { TextField, Button, Container, Typography, CircularProgress, Alert, Checkbox, FormControlLabel, MenuItem, Select, Box } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';




export const EditFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { selectedForm,  loading: formLoading, error: formError } = useAppSelector((state) => state.form);
  // const {selectedFieldType, loading: fieldTypeLoading, error: fieldTypeError} = useAppSelector((state) = state.fieldType);
  const [openModal, setOpenModal] = useState(false)
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    if (id) {
      dispatch(getFormByIdAction(Number(id)));
    }
  }, [id, dispatch]);

  console.log(openModal)

  useEffect(() => {
    if (selectedForm) {
      setFormData(selectedForm);
    }
  }, [selectedForm]);

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setFormData((prevState) => ({
      ...prevState,
      [name]: newValue,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData) {
      dispatch(editFormAction(formData)).then((result) => {
        if (editFormAction.fulfilled.match(result)) {
          navigate('/form-list'); 
        }
      });
    }
  };

  if (formLoading) return <CircularProgress />;
  if (formError) return <Alert severity="error">{formError}</Alert>;

  return (
    <Container maxWidth="sm" >
      <Typography variant="h4" component="h1" gutterBottom>
        Editar Formulario
      </Typography>
      {formData && (
        <form onSubmit={handleSubmit}>
          {formData.formGroups.map((group) => (
            <div key={group.idFormGroup}>
              <Typography variant="h6">{group.name}</Typography>
              {group.formFields.map((field) => {
                console.log('Field:', field); 
                const FieldComponent = getFieldComponent(field.typeId);
                return (
                  <FieldComponent
                    key={field.idFormField}
                    field={field}
                    value={formData[field.name] || ''}
                    onChange={handleChange}
                  />
                );
              })}
            </div>
          ))}
          <Button type="submit" variant="contained" color="primary" sx={{ mb: 3 }}>
            Guardar Cambios
          </Button>
        </form>
      )}
    </Container>
  );
};


const TextFieldComponent = ({ field, value, onChange }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
    <TextField
      fullWidth
      margin="normal"
      label={field.name}
      name={field.name}
      value={value}
      onChange={onChange}
      type="text"
      sx={{ flexGrow: 1 }} // Permitir que el campo ocupe el mayor espacio
    />
    <Button 
      variant="outlined" 
      color="primary" 
      sx={{ ml: 2 }} // Margen izquierdo para separar del campo
    >
      Editar
    </Button>
  </Box>
);


const NumberFieldComponent = ({ field, value, onChange }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
    <TextField
      fullWidth
      margin="normal"
      label={field.name}
      name={field.name}
      value={value}
      onChange={onChange}
      type="number"
      sx={{ flexGrow: 1 }}
    />
    <Button 
      variant="outlined" 
      color="primary" 
      sx={{ ml: 2 }}
    >
      Editar
    </Button>
  </Box>
);

const DateFieldComponent = ({ field, value, onChange }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
    <TextField
      fullWidth
      margin="normal"
      label={field.name}
      name={field.name}
      value={value}
      onChange={onChange}
      type="date"
      InputLabelProps={{ shrink: true }}
      sx={{ flexGrow: 1 }}
    />
    <Button 
      variant="outlined" 
      color="primary" 
      sx={{ ml: 2 }}
    >
      Editar
    </Button>
  </Box>
);

const CheckboxFieldComponent = ({ field, value, onChange }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
    <FormControlLabel
      control={<Checkbox checked={!!value} onChange={onChange} name={field.name} />}
      label={field.name}
      sx={{ flexGrow: 1 }}
    />
    <Button 
      variant="outlined" 
      color="primary" 
      sx={{ ml: 2 }}
    >
      Editar
    </Button>
  </Box>
);


const SelectFieldComponent = ({ field, value, onChange }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
    <Select
      fullWidth
      margin="normal"
      label={field.name}
      name={field.name}
      value={value}
      onChange={onChange}
      sx={{ flexGrow: 1 }}
    >
      {field.options?.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </Select>
    <Button 
      variant="outlined" 
      color="primary" 
      sx={{ ml: 2 }}
    >
      Editar
    </Button>
  </Box>
);

const getFieldComponent = (fieldType) => {
  console.log('FieldType:', fieldType); 
  switch (fieldType) {
    case 10012: // ID de tipo "Texto"
      return TextFieldComponent;
    case 10013: // ID de tipo "Número"
      return NumberFieldComponent;
    case 10014: // ID de tipo "Fecha"
      return DateFieldComponent;
    case 10015: // ID de tipo "Checkbox"
      return SelectFieldComponent;
    case 10016: // ID de tipo "Opción" (Select)
      return CheckboxFieldComponent;
    default:
      return () => <div>Tipo de campo desconocido</div>;
  }
};
