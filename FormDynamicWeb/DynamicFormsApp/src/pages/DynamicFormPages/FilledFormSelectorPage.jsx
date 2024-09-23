import React, { useEffect } from 'react';
import { Container, TextField, Autocomplete, CircularProgress, Box, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getFilledFormSelectorAction } from '../../redux/action/FilledFormAction';
import { resetFieldTypeState } from '../../redux/slice/filledFormSlice'; // Asegúrate de que la ruta sea correcta

const FilledFormSelector = () => {
  const dispatch = useDispatch();
  const { fieldTypes, loading, error } = useSelector((state) => state.filledForm);

  useEffect(() => {
    dispatch(getFilledFormSelectorAction());


    return () => {
      dispatch(resetFieldTypeState());
    };
  }, [dispatch]);

  return (
    <Container sx={{ marginTop: '20px' }}>
      <Box display="flex" justifyContent="flex-start" alignItems="flex-start" marginTop={0}>
        {loading ? (
          <CircularProgress />
        ) : (
          <Autocomplete
            options={fieldTypes || []}
            getOptionLabel={(option) => option.value}
            renderInput={(params) => (
              <TextField {...params} label="Seleccione un formulario llenado" variant="outlined" />
            )}
            onChange={(event, value) => {
              if (value) {
                console.log('Formulario seleccionado:', value);
 
              }
            }}
            style={{ width: '300px' }}
          />
        )}
        {error && (
          <Typography variant="body2" color="error" style={{ marginLeft: '16px' }}>
            {error}
          </Typography>
        )}
      </Box>
    </Container>
  );
};

export default FilledFormSelector;
