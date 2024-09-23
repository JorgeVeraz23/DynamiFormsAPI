import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Paper,
  CircularProgress,
  Alert,
  Card,
  CardContent,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
  Checkbox,
  FormControlLabel,
  RadioGroup,
  Radio,
  Button,
  Slider,
  Switch,
} from "@mui/material";
import axios from "axios";
import { useParams } from 'react-router-dom';

const FormDisplay = () => {
  const [formData, setFormData] = useState(null);
  const [filledFormId, setFilledFormId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const [fieldsEnabled, setFieldsEnabled] = useState(false);
  const [filledFields, setFilledFields] = useState({});

  useEffect(() => {
    const fetchForm = async () => {
      try {
        const response = await axios.get(`https://localhost:7016/api/Form/MostrarFormulariosConCamposYGrupos?id=${id}`);
        setFormData(response.data);

        const newFilledFormId = await createFilledForm(response.data.idForm);
        setFilledFormId(newFilledFormId);
      } catch (err) {
        setError("Error al cargar el formulario");
      } finally {
        setLoading(false);
      }
    };

    fetchForm();
  }, [id]);

  const createFilledForm = async (formId) => {
    const response = await axios.post('https://localhost:7016/api/FilledForm/CrearFilledForm', {
      idFilledForm: 0,
      formId: formId,
    });
    return response.data.id;
  };

  const handleInputChange = (fieldId, fieldType) => (event, value) => {
    const newValue = fieldType === "Slider" ? value : event.target.value;
    const checked = fieldType === "CheckBox" || fieldType === "Switch" ? event.target.checked : null;

    const fieldData = {
      isChecked: fieldType === "CheckBox" || fieldType === "Switch" ? checked : null,
      textValue: fieldType === "TextField" ? newValue : null,
      numericValue: fieldType === "NumberField" ? newValue : null,
      dateTimeValue: fieldType === "DatePicker" ? new Date(newValue).toISOString() : null,
      selectedOptionId: fieldType === "DropDown" || fieldType === "RadioButton" ? newValue : null,
      sliderValue: fieldType === "Slider" ? newValue : null,
      formFieldId: fieldId,
    };

    setFilledFields(prev => ({ ...prev, [fieldId]: fieldData }));
  };

  const handleSubmit = async () => {
    if (!filledFormId) {
      alert("No se ha podido crear el filledForm.");
      return;
    }
  
    try {
      const promises = Object.keys(filledFields).map(async (fieldId) => {
        const fieldData = filledFields[fieldId];
  
        return await axios.post(`https://localhost:7016/api/FilledFormField/CrearFilledFormField`, {
          filledFormId: filledFormId,  // Enviamos el filledFormId aquí
          isChecked: fieldData.isChecked,
          textValue: fieldData.textValue,
          numericValue: fieldData.numericValue,
          dateTimeValue: fieldData.dateTimeValue,
          selectedOptionId: fieldData.selectedOptionId,
        });
      });
  
      await Promise.all(promises);
  
      alert("Formulario enviado correctamente");
    } catch (err) {
      alert("Error al enviar el formulario");
    }
  };
  

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Container  sx={{ marginTop: '20px', marginBottom: '40px' }}>
      {formData && (
        <Paper elevation={3} style={{ padding: 20 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            {formData.name}
          </Typography>
          <Typography variant="body1" paragraph>
            {formData.description}
          </Typography>

          <Button variant="contained" onClick={() => setFieldsEnabled(!fieldsEnabled)}>
            {fieldsEnabled ? "Desactivar" : "Activar"}
          </Button>

          {formData.formGroups.map(group => (
            <Card key={group.idFormGroup} variant="outlined" sx={{ marginBottom: 2 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {group.name}
                </Typography>
                <Grid container spacing={2}>
                  {group.formFields.map(field => (
                    <Grid item xs={12} sm={6} key={field.idFormField}>
                      <Typography variant="body2" gutterBottom>
                        {field.name}
                      </Typography>

                      {field.fieldType === "TextField" && (
                        <TextField
                          fullWidth
                          variant="outlined"
                          placeholder={field.name}
                          disabled={!fieldsEnabled}
                          onChange={handleInputChange(field.idFormField, "TextField")}
                          value={filledFields[field.idFormField]?.textValue || ''}
                        />
                      )}

                      {field.fieldType === "DropDown" && (
                        <FormControl fullWidth variant="outlined">
                          <InputLabel>{field.name}</InputLabel>
                          <Select
                            label={field.name}
                            disabled={!fieldsEnabled}
                            onChange={handleInputChange(field.idFormField, "DropDown")}
                            value={filledFields[field.idFormField]?.selectedOptionId || ''}
                          >
                            <MenuItem value=""><em>Seleccione</em></MenuItem>
                            {field.options.map(option => (
                              <MenuItem key={option.idOption} value={option.idOption}>
                                {option.name}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      )}

                      {field.fieldType === "CheckBox" && (
                        <FormControlLabel
                          control={<Checkbox disabled={!fieldsEnabled} checked={filledFields[field.idFormField]?.isChecked || false} onChange={handleInputChange(field.idFormField, "CheckBox")} />}
                          label={field.name}
                        />
                      )}

                      {field.fieldType === "RadioButton" && (
                        <RadioGroup disabled={!fieldsEnabled} value={filledFields[field.idFormField]?.selectedOptionId || ''} onChange={handleInputChange(field.idFormField, "RadioButton")}>
                          {field.options.map(option => (
                            <FormControlLabel
                              key={option.idOption}
                              value={option.idOption}
                              control={<Radio disabled={!fieldsEnabled} />}
                              label={option.name}
                            />
                          ))}
                        </RadioGroup>
                      )}

                      {(field.fieldType === "NumberField" || field.fieldType === "PhoneNumberField") && (
                        <TextField
                          fullWidth
                          variant="outlined"
                          type="number"
                          placeholder={field.name}
                          disabled={!fieldsEnabled}
                          onChange={handleInputChange(field.idFormField, "NumberField")}
                          value={filledFields[field.idFormField]?.numericValue || ''}
                        />
                      )}

                      {field.fieldType === "DatePicker" && (
                        <TextField
                          fullWidth
                          variant="outlined"
                          type="date"
                          placeholder={field.name}
                          InputLabelProps={{ shrink: true }}
                          disabled={!fieldsEnabled}
                          onChange={handleInputChange(field.idFormField, "DatePicker")}
                          value={filledFields[field.idFormField]?.dateTimeValue?.split('T')[0] || ''}
                        />
                      )}

                      {field.fieldType === "Slider" && (
                        <Slider
                          defaultValue={30}
                          aria-labelledby="continuous-slider"
                          disabled={!fieldsEnabled}
                          onChange={(event, value) => handleInputChange(field.idFormField, "Slider")(event, value)}
                          value={filledFields[field.idFormField]?.sliderValue || 30}
                        />
                      )}

                      {field.fieldType === "Switch" && (
                        <FormControlLabel
                          control={<Switch disabled={!fieldsEnabled} checked={filledFields[field.idFormField]?.isChecked || false} onChange={handleInputChange(field.idFormField, "Switch")} />}
                          label={field.name}
                        />
                      )}
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          ))}

          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Enviar Formulario
          </Button>
        </Paper>
      )}
    </Container>
  );
};

export default FormDisplay;
