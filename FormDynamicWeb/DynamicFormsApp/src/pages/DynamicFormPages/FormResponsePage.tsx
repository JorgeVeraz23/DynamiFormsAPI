import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Paper,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import axios from "axios";
import { useParams } from "react-router-dom";

const FormResponsesDisplay = () => {
  const [formData, setFormData] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchFormResponses = async () => {
      try {
        const response = await axios.get(`https://localhost:7016/api/FilledFormField/GetFormWithGroupsAndFieldsAndResponsesAsync?id=${id}`);
        setFormData(response.data);
      } catch (error) {
        console.error("Error al cargar las respuestas del formulario", error);
      }
    };

    fetchFormResponses();
  }, [id]);

  if (!formData) return <Typography variant="h6">Cargando...</Typography>;

  return (
    <Container>
      <Paper elevation={3} style={{ padding: 20 }}>
        <Typography variant="h4" gutterBottom>
          {formData.name}
        </Typography>
        <Typography variant="body1" paragraph>
          {formData.description}
        </Typography>
        <Divider style={{ margin: "20px 0" }} />
        <Typography variant="h6">Respuestas:</Typography>
        <List>
          {formData.responses.map((response) => (
            <ListItem key={response.idFilledFormField}>
              <ListItemText
                primary={`Campo ID: ${response.idFilledFormField}`}
                secondary={
                  <div>
                    {response.textValue && <div><strong>Texto:</strong> {response.textValue}</div>}
                    {response.numericValue !== null && <div><strong>Número:</strong> {response.numericValue}</div>}
                    {response.dateTimeValue && <div><strong>Fecha:</strong> {new Date(response.dateTimeValue).toLocaleDateString()}</div>}
                    {response.isChecked !== null && <div><strong>Marcado:</strong> {response.isChecked ? 'Sí' : 'No'}</div>}
                    {response.selectedOptionId !== null && <div><strong>Opción Seleccionada ID:</strong> {response.selectedOptionId}</div>}
                  </div>
                }
              />
            </ListItem>
          ))}
        </List>
        <Button variant="contained" color="primary" onClick={() => window.history.back()}>
          Volver
        </Button>
      </Paper>
    </Container>
  );
};

export default FormResponsesDisplay;
