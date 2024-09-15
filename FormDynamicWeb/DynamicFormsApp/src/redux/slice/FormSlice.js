import { createSlice } from "@reduxjs/toolkit";
import {
    getAllFormAction,
    getFormByIdAction,
    deleteFormAction,
    createFormAction,
    editFormAction
} from "../action/FormAction.js";

const initialState = {
    forms: [], // Lista de formularios, inicializada como un array vacío
    selectedForm: null, // Formulario seleccionado, inicializado como null
    loading: false, // Estado de carga, inicializado como false
    error: null // Error, inicializado como null
};

const formSlice = createSlice({
    name: 'form',
    initialState,
    reducers: {
        // Aquí puedes definir reducers adicionales si es necesario
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllFormAction.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllFormAction.fulfilled, (state, action) => {
                state.loading = false;
                state.forms = action.payload; // Actualiza la lista de formularios
            })
            .addCase(getAllFormAction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload; // Maneja el error
            })
            
            .addCase(getFormByIdAction.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getFormByIdAction.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedForm = action.payload; // Actualiza el formulario seleccionado
            })
            .addCase(getFormByIdAction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload; // Maneja el error
            })
            
            .addCase(deleteFormAction.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteFormAction.fulfilled, (state, action) => {
                state.loading = false;
                // Elimina el formulario de la lista
                state.forms = state.forms.filter(form => form.idForm !== action.payload);
            })
            .addCase(deleteFormAction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload; // Maneja el error
            })
            
            .addCase(createFormAction.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createFormAction.fulfilled, (state, action) => {
                state.loading = false;
                // Agrega el nuevo formulario a la lista
                state.forms.push(action.payload);
            })
            .addCase(createFormAction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload; // Maneja el error
            })
            
            .addCase(editFormAction.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(editFormAction.fulfilled, (state, action) => {
                state.loading = false;
                // Actualiza el formulario en la lista
                const index = state.forms.findIndex(form => form.idForm === action.payload.idForm);
                if (index !== -1) {
                    state.forms[index] = action.payload;
                }
            })
            .addCase(editFormAction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload; // Maneja el error
            });
    }
});

export const { actions, reducer } = formSlice;
export default reducer;
