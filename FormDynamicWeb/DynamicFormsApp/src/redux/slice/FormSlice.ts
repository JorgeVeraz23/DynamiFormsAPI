import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
    getAllFormAction,
    getFormByIdAction,
    deleteFormAction,
    createFormAction,
    editFormAction,
    CreateFormResponse,
    getFormSelectorAction
} from "../action/FormAction";
import { FormEntity } from "data/Entity/FormEntity";
import { FormGroupEntity } from "data/Entity/FormGroupEntity";
import { KeyValueEntity } from "data/Entity/KeyValueEntity";


interface FormState {
    forms: FormEntity[];
    selectedForm: FormEntity | null;
    KeyValueForm: KeyValueEntity[];
    loading: boolean;
    error: string | null;
}


const initialState: FormState = {
    forms: [],
    selectedForm: null,
    KeyValueForm: null,
    loading: false,
    error: null
};


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
                state.error = action.payload as string; 
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
            })
            .addCase(getFormSelectorAction.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getFormSelectorAction.fulfilled, (state, action: PayloadAction<KeyValueEntity[]>) => {
                state.loading = false;
                state.KeyValueForm = action.payload;
            })
            .addCase(getFormSelectorAction.rejected, (state, action: PayloadAction<string | unknown>) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { actions, reducer } = formSlice;
export default reducer;
