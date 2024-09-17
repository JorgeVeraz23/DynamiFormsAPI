import { createSlice } from "@reduxjs/toolkit";
// import {
//     getAllFormAction,
//     getFormByIdAction,
//     deleteFormAction,
//     createFormAction,
//     editFormAction
// } from "../action/FormAction.js";


import { selectorFieldTypeAction } from "../action/FileTypeAction";

const initialState = {
    fieldType: [], 
    selectedFieldTypeAction: null,
    loading: false, 
    error: null 
};

const fieldTypeSlice = createSlice({
    name: 'fieldType',
    initialState,
    reducers: {
       
    },
    extraReducers: (builder) => {
        builder
            .addCase(selectorFieldTypeAction.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(selectorFieldTypeAction.fulfilled, (state, action) => {
                state.loading = false;
                state.forms = action.payload; 
            })
            .addCase(selectorFieldTypeAction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload; // Maneja el error
            })
            
    }
});

export const { actions, reducer } = fieldTypeSlice;
export default reducer;
