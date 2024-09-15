import { createSlice } from "@reduxjs/toolkit";
import {
    getAllFormAction,
    getFormByIdAction,
    deleteFormAction,
    createFormAction,
    editFormAction
} from "../action/FormAction.js";

const initialState = {
    forms: [], 
    selectedForm: null,
    loading: false, 
    error: null 
};

const formSlice = createSlice({
    name: 'form',
    initialState,
    reducers: {
       
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllFormAction.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllFormAction.fulfilled, (state, action) => {
                state.loading = false;
                state.forms = action.payload; 
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
                state.selectedForm = action.payload; 
            })
            .addCase(getFormByIdAction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload; 
            })
            
            .addCase(deleteFormAction.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteFormAction.fulfilled, (state, action) => {
                state.loading = false;
               
                state.forms = state.forms.filter(form => form.idForm !== action.payload);
            })
            .addCase(deleteFormAction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload; 
            })
            
            .addCase(createFormAction.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createFormAction.fulfilled, (state, action) => {
                state.loading = false;
                state.forms.push(action.payload);
            })
            .addCase(createFormAction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload; 
            })
            
            .addCase(editFormAction.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(editFormAction.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.forms.findIndex(form => form.idForm === action.payload.idForm);
                if (index !== -1) {
                    state.forms[index] = action.payload;
                }
            })
            .addCase(editFormAction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload; 
            });
    }
});

export const { actions, reducer } = formSlice;
export default reducer;
