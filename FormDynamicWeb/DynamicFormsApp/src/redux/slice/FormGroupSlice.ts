import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import {
//     getAllFormAction,
//     getFormByIdAction,
//     deleteFormAction,
//     createFormAction,
//     editFormAction,
//     CreateFormResponse
// } from "../action/FormAction";

import { 
    getAllFormGroupAction,
    getFormGroupByIdAction,
    deleteFormGroupAction,
    createFormGroupAction,
    editFormGroupAction,
 } from "redux/action/FormGroupAction";

 import { CreateFormResponse } from "redux/action/FormAction";

import { FormGroupEntity } from "data/Entity/FormGroupEntity";

// Tipos para el estado
interface FormGroupState {
    formsGroup: FormGroupEntity[];
    selectedFormGroup: FormGroupEntity | null;
    loading: boolean;
    error: string | null;
}

// Estado inicial tipado
const initialState: FormGroupState = {
    formsGroup: [],
    selectedFormGroup: null,
    loading: false,
    error: null
};

// Slice con tipado
const formGroupSlice = createSlice({
    name: "formGroup",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllFormGroupAction.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllFormGroupAction.fulfilled, (state, action: PayloadAction<FormGroupEntity[]>) => {
                state.loading = false;
                state.formsGroup = action.payload;
            })
            .addCase(getAllFormGroupAction.rejected, (state, action: PayloadAction<string | unknown>) => {
                state.loading = false;
                state.error = action.payload as string; // Asegúrate de convertirlo a string
            })
            .addCase(getFormGroupByIdAction.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getFormGroupByIdAction.fulfilled, (state, action: PayloadAction<FormGroupEntity>) => {
                state.loading = false;
                state.selectedFormGroup = action.payload;
            })
            .addCase(getFormGroupByIdAction.rejected, (state, action: PayloadAction<string | unknown>) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(deleteFormGroupAction.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteFormGroupAction.fulfilled, (state, action: PayloadAction<number>) => {
                state.loading = false;
                state.formsGroup = state.formsGroup.filter((form) => form.idFormGroup !== action.payload);
            })
            .addCase(deleteFormGroupAction.rejected, (state, action: PayloadAction<string | unknown>) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(createFormGroupAction.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createFormGroupAction.fulfilled, (state, action: PayloadAction<CreateFormResponse>) => {
                state.loading = false;
                state.error = null;
            })
            
            .addCase(createFormGroupAction.rejected, (state, action: PayloadAction<string | unknown>) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(editFormGroupAction.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(editFormGroupAction.fulfilled, (state, action: PayloadAction<FormGroupEntity>) => {
                state.loading = false;
                const index = state.formsGroup.findIndex((form) => form.idFormGroup === action.payload.idFormGroup);
                if (index !== -1) {
                    state.formsGroup[index] = action.payload;
                }
            })
            .addCase(editFormGroupAction.rejected, (state, action: PayloadAction<string | unknown>) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { actions, reducer } = formGroupSlice;
export default reducer;
