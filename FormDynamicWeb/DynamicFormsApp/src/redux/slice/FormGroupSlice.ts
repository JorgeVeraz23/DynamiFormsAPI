import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
    getAllFormGroupAction,
    getFormGroupByIdAction,
    deleteFormGroupAction,
    createFormGroupAction,
    editFormGroupAction,
    getFormGroupSelectorAction 
} from "../action/FormGroupAction";

import { CreateFormResponse } from "redux/action/FormAction";
import { FormGroupEntity } from "data/Entity/FormGroupEntity";
import { KeyValueEntity } from "data/Entity/KeyValueEntity";


interface FormGroupState {
    formsGroup: FormGroupEntity[];
    selectedFormGroup: FormGroupEntity | null;
    KeyValueSelectorFormGroup: KeyValueEntity[];
    loading: boolean;
    error: string | null;
}


const initialState: FormGroupState = {
    formsGroup: [],
    selectedFormGroup: null,
    KeyValueSelectorFormGroup: [],
    loading: false,
    error: null
};

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
                state.error = action.payload as string; 
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
            })
            .addCase(getFormGroupSelectorAction.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getFormGroupSelectorAction.fulfilled, (state, action: PayloadAction<KeyValueEntity[]>) => {
                console.log("Datos de tipos de campo almacenados:", action.payload);
                state.loading = false;
                state.KeyValueSelectorFormGroup = action.payload; 
            })
            .addCase(getFormGroupSelectorAction.rejected, (state, action: PayloadAction<string | unknown>) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { actions, reducer } = formGroupSlice;
export default reducer;
