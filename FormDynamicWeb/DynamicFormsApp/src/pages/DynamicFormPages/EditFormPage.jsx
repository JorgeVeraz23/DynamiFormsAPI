import React, { useEffect, useState } from "react";
import { Container, Typography, Grid, Paper, CircularProgress, Alert, Card, CardContent, Select, MenuItem, FormControl, InputLabel, TextField, Checkbox, FormControlLabel, RadioGroup, Radio, Button, Slider, Switch } from "@mui/material";
import axios from "axios";
import { useParams } from 'react-router-dom';

const FormDisplay = () => {
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const [fieldsEnabled, setFieldsEnabled] = useState(false);

  useEffect(() => {
    const fetchForm = async () => {
      try {
        const response = await axios.get(`https://localhost:7016/api/Form/MostrarFormulariosConCamposYGrupos?id=${id}`);
        setFormData(response.data);
      } catch (err) {
        setError("Error al cargar el formulario");
      } finally {
        setLoading(false);
      }
    };

    fetchForm();
  }, [id]);

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Container>
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
                        />
                      )}
                      {field.fieldType === "TextArea" && (
                        <TextField
                          fullWidth
                          variant="outlined"
                          placeholder={field.name}
                          multiline
                          rows={4}
                          disabled={!fieldsEnabled}
                        />
                      )}
                      {field.fieldType === "DropDown" && (
                        <FormControl fullWidth variant="outlined">
                          <InputLabel>{field.name}</InputLabel>
                          <Select
                            label={field.name}
                            defaultValue=""
                            disabled={!fieldsEnabled}
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
                          control={<Checkbox disabled={!fieldsEnabled} />}
                          label={field.name}
                        />
                      )}
                      {field.fieldType === "RadioButton" && (
                        <RadioGroup disabled={!fieldsEnabled}>
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
                      {field.fieldType === "NumberField" || field.fieldType === "PhoneNumberField" && (
                        <TextField
                          fullWidth
                          variant="outlined"
                          type="number"
                          placeholder={field.name}
                          disabled={!fieldsEnabled}
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
                        />
                      )}
                      {field.fieldType === "Slider" && (
                        <Slider
                          defaultValue={30}
                          aria-labelledby="continuous-slider"
                          disabled={!fieldsEnabled}
                        />
                      )}
                      {field.fieldType === "Switch" && (
                        <FormControlLabel
                          control={<Switch disabled={!fieldsEnabled} />}
                          label={field.name}
                        />
                      )}
                      {field.fieldType === "ColorPicker" && (
                        <TextField
                          type="color"
                          label={field.name}
                          variant="outlined"
                          disabled={!fieldsEnabled}
                        />
                      )}
                      {/* Agrega más tipos de campo según sea necesario */}
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          ))}
        </Paper>
      )}
    </Container>
  );
};

export default FormDisplay;
