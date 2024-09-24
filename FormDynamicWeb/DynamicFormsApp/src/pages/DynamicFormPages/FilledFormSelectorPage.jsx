import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Container,
    Typography,
    Paper,
    Grid,
    TextField,
    Checkbox,
    FormControlLabel,
    Slider,
    Box,
    CircularProgress,
    Alert,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
} from '@mui/material';

const DynamicForms = () => {
    const [filledFormsData, setFilledFormsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFilledFormsData = async () => {
            try {
                const response = await axios.get('https://localhost:7016/api/FilledFormField/GetFormWithGroupsAndFieldsAndResponsesAsyncNew?id=1');
                setFilledFormsData(response.data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchFilledFormsData();
    }, []);

    if (loading) return <CircularProgress />;
    if (error) return <Alert severity="error">Error al cargar los formularios: {error.message}</Alert>;

    return (
        <Container className="dynamic-forms" maxWidth="lg">
            {filledFormsData.map((form) => (
                <Paper key={form.idForm} elevation={3} sx={{ padding: 3, marginBottom: 3 }}>
                    <Typography variant="h4">{form.name}</Typography>
                    <Typography variant="subtitle1">{form.description}</Typography>
                    {form.formGroups.map((group) => (
                        <Box key={group.idFormGroup} sx={{ marginTop: 2 }}>
                            <Typography variant="h5">{group.name}</Typography>
                            {form.filledForms.map((filledForm) => (
                                <Paper key={filledForm.idFilledForm} elevation={2} sx={{ padding: 2, marginTop: 2 }}>
                                    <Typography variant="h6">Formulario Llenado {filledForm.idFilledForm}</Typography>
                                    <Typography variant="body2">Fecha de llenado: {new Date(filledForm.fillDate).toLocaleString()}</Typography>
                                    <Grid container spacing={2} sx={{ marginTop: 2 }}>
                                        {group.formFields.map((field) => {
                                            // Buscar el campo llenado correspondiente
                                            const filledField = filledForm.filledFormFields.find(
                                                (fieldResponse) => fieldResponse.idFormField === field.idFormField
                                            );

                                            return (
                                                <Grid item xs={12} sm={6} md={4} key={field.idFormField}>
                                                    <Typography>{field.name}:</Typography>
                                                    {(() => {
                                                        switch (field.fieldType) {
                                                            case 'TextField':
                                                                return (
                                                                    <TextField
                                                                        fullWidth
                                                                        variant="outlined"
                                                                        defaultValue={filledField ? filledField.textValue : ''}
                                                                        placeholder={`Ingrese ${field.name}`}
                                                                        InputProps={{
                                                                            readOnly: true,
                                                                        }}
                                                                    />
                                                                );
                                                            case 'PhoneNumberField':
                                                                return (
                                                                    <TextField
                                                                        fullWidth
                                                                        variant="outlined"
                                                                        type="tel"
                                                                        defaultValue={filledField ? filledField.numericValue : ''}
                                                                        placeholder={`Ingrese ${field.name}`}
                                                                        InputProps={{
                                                                            readOnly: true,
                                                                        }}
                                                                    />
                                                                );
                                                            case 'DatePicker':
                                                                return (
                                                                    <TextField
                                                                        fullWidth
                                                                        variant="outlined"
                                                                        type="date"
                                                                        defaultValue={filledField ? filledField.dateTimeValue.split('T')[0] : ''}
                                                                        InputProps={{
                                                                            readOnly: true,
                                                                        }}
                                                                    />
                                                                );
                                                            case 'Slider':
                                                                return (
                                                                    <Box>
                                                                        <Slider
                                                                            value={filledField ? filledField.numericValue : 0}
                                                                            min={0}
                                                                            max={100}
                                                                            readOnly
                                                                        />
                                                                        <Typography>{filledField ? filledField.numericValue : 0}</Typography>
                                                                    </Box>
                                                                );
                                                            case 'CheckBox':
                                                                return (
                                                                    <FormControlLabel
                                                                        control={
                                                                            <Checkbox
                                                                                checked={filledField ? filledField.isChecked : false}
                                                                                disabled
                                                                            />
                                                                        }
                                                                        label={field.name}
                                                                    />
                                                                );
                                                            case 'Select':  // Agregado para el campo Select
                                                                return (
                                                                    <FormControl fullWidth variant="outlined" disabled>
                                                                        <InputLabel>{field.name}</InputLabel>
                                                                        <Select
                                                                            value={filledField ? filledField.selectedValue : ''}
                                                                        >
                                                                            {field.options.map((option) => (
                                                                                <MenuItem key={option.value} value={option.value}>
                                                                                    {option.label}
                                                                                </MenuItem>
                                                                            ))}
                                                                        </Select>
                                                                    </FormControl>
                                                                );
                                                            default:
                                                                return <span>Campo desconocido</span>;
                                                        }
                                                    })()}
                                                </Grid>
                                            );
                                        })}
                                    </Grid>
                                </Paper>
                            ))}
                        </Box>
                    ))}
                </Paper>
            ))}
        </Container>
    );
};

export default DynamicForms;
