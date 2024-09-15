import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooksRedux';
import { getFormByIdAction, editFormAction } from '../../redux/action/FormAction';
import { TextField, Button, Container, Typography, CircularProgress, Alert, Checkbox, FormControlLabel, MenuItem, Select } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';

export const EditFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { selectedForm, loading, error } = useAppSelector((state) => state.form);

  const [formData, setFormData] = useState(null);

  useEffect(() => {
    if (id) {
      dispatch(getFormByIdAction(Number(id)));
    }
  }, [id, dispatch]);

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

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Container maxWidth="sm">
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
          <Button type="submit" variant="contained" color="primary">
            Guardar Cambios
          </Button>
        </form>
      )}
    </Container>
  );
};


const TextFieldComponent = ({ field, value, onChange }) => (
  <TextField
    fullWidth
    margin="normal"
    label={field.name}
    name={field.name}
    value={value}
    onChange={onChange}
    type="text"
  />
);

const NumberFieldComponent = ({ field, value, onChange }) => (
  <TextField
    fullWidth
    margin="normal"
    label={field.name}
    name={field.name}
    value={value}
    onChange={onChange}
    type="number"
  />
);

const DateFieldComponent = ({ field, value, onChange }) => (
  <TextField
    fullWidth
    margin="normal"
    label={field.name}
    name={field.name}
    value={value}
    onChange={onChange}
    type="date"
    InputLabelProps={{ shrink: true }}
  />
);

const CheckboxFieldComponent = ({ field, value, onChange }) => (
  <FormControlLabel
    control={<Checkbox checked={!!value} onChange={onChange} name={field.name} />}
    label={field.name}
  />
);

const SelectFieldComponent = ({ field, value, onChange }) => (
  <Select
    fullWidth
    margin="normal"
    label={field.name}
    name={field.name}
    value={value}
    onChange={onChange}
  >
    {field.options?.map((option) => (
      <MenuItem key={option.value} value={option.value}>
        {option.label}
      </MenuItem>
    ))}
  </Select>
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
      return CheckboxFieldComponent;
    case 10016: // ID de tipo "Opción" (Select)
      return SelectFieldComponent;
    default:
      return () => <div>Tipo de campo desconocido</div>;
  }
};
