import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
    getAllFormAction,
    getFormByIdAction,
    deleteFormAction,
    createFormAction,
    editFormAction,
    CreateFormResponse
} from "../action/FormAction";
import { FormEntity } from "data/Entity/FormEntity";
import { FormGroupEntity } from "data/Entity/FormGroupEntity";

// Tipos para el estado
interface FormState {
    forms: FormEntity[];
    selectedForm: FormEntity | null;
    loading: boolean;
    error: string | null;
}

// Estado inicial tipado
const initialState: FormState = {
    forms: [],
    selectedForm: null,
    loading: false,
    error: null
};

// Slice con tipado
const formSlice = createSlice({
    name: "form",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllFormAction.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllFormAction.fulfilled, (state, action: PayloadAction<FormEntity[]>) => {
                state.loading = false;
                state.forms = action.payload;
            })
            .addCase(getAllFormAction.rejected, (state, action: PayloadAction<string | unknown>) => {
                state.loading = false;
                state.error = action.payload as string; // Asegúrate de convertirlo a string
            })
            .addCase(getFormByIdAction.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getFormByIdAction.fulfilled, (state, action: PayloadAction<FormEntity>) => {
                state.loading = false;
                state.selectedForm = action.payload;
            })
            .addCase(getFormByIdAction.rejected, (state, action: PayloadAction<string | unknown>) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(deleteFormAction.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteFormAction.fulfilled, (state, action: PayloadAction<number>) => {
                state.loading = false;
                state.forms = state.forms.filter((form) => form.idForm !== action.payload);
            })
            .addCase(deleteFormAction.rejected, (state, action: PayloadAction<string | unknown>) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(createFormAction.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createFormAction.fulfilled, (state, action: PayloadAction<CreateFormResponse>) => {
                state.loading = false;
                state.error = null;
            })
            
            .addCase(createFormAction.rejected, (state, action: PayloadAction<string | unknown>) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(editFormAction.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(editFormAction.fulfilled, (state, action: PayloadAction<FormEntity>) => {
                state.loading = false;
                const index = state.forms.findIndex((form) => form.idForm === action.payload.idForm);
                if (index !== -1) {
                    state.forms[index] = action.payload;
                }
            })
            .addCase(editFormAction.rejected, (state, action: PayloadAction<string | unknown>) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { actions, reducer } = formSlice;
export default reducer;
