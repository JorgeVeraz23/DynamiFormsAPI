import { createAsyncThunk } from "@reduxjs/toolkit";

import FormFieldRepositoryImpl from "../../data/repositoryImpl/FormFieldRepositoryImpl";
import { FormFieldEntity } from "data/Entity/FormFieldEntity";

import { KeyValueEntity } from "data/Entity/KeyValueEntity";

const repository = new FormFieldRepositoryImpl();

export interface CreateFormResponse {
    success: boolean;
    message: string;
}

export const getAllFormFieldAction = createAsyncThunk<FormFieldEntity[], void>(
    "formField/GetAllFormFieldAction",
    async (_, thunkAPI) => {
        try {
            const forms = await repository.getAllFormField();
            return forms;
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Error desconocido";
            return thunkAPI.rejectWithValue(errorMessage);
        }
    }
);


export const getFormFieldSelectorAction = createAsyncThunk<KeyValueEntity[], void>(
    "formField/GetFormFieldSelectorAction",
    async (_, thunkAPI) => {
        try {
            const forms = await repository.selectorFormField();
            return forms;
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Error desconocido";
            return thunkAPI.rejectWithValue(errorMessage);
        }
    }
);


export const getFormFieldByIdAction = createAsyncThunk<FormFieldEntity, number>(
    "formField/GetFormFieldByIdAction",
    async (id, thunkAPI) => {
        try {
            const form = await repository.getFormFieldById(id);
            return form;
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Error desconocido";
            return thunkAPI.rejectWithValue(errorMessage);
        }
    }
);


export const deleteFormFieldAction = createAsyncThunk<number, number>(
    "formField/DeleteFormFieldAction",
    async (id, thunkAPI) => {
        try {
            await repository.deleteFormField(id);
            return id;
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Error desconocido";
            return thunkAPI.rejectWithValue(errorMessage);
        }
    }
);


export const createFormFieldAction = createAsyncThunk<CreateFormResponse, FormFieldEntity>(
    "formField/CreateFormFieldAction",
    async (data, thunkAPI) => {
        try {
            await repository.createFormField(data);
            return { success: true, message: "Formulario creado correctamente." };
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Error desconocido";
            return thunkAPI.rejectWithValue({ success: false, message: errorMessage });
        }
    }
);


export const editFormFieldAction = createAsyncThunk<FormFieldEntity, FormFieldEntity>(
    "formField/editFormFieldAction",
    async (data, thunkAPI) => {
        try {
            await repository.editFormField(data);
            return data;
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Error desconocido";
            return thunkAPI.rejectWithValue(errorMessage);
        }
    }
);
