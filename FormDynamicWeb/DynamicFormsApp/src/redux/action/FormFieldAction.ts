import { createAsyncThunk } from "@reduxjs/toolkit";
// import FormRepositoryImpl from "../../data/repositoryImpl/FormRepositoryImpl";
// import { FormEntity } from "data/Entity/FormEntity";
import FormFieldRepositoryImpl from "../../data/repositoryImpl/FormFieldRepositoryImpl";
import { FormFieldEntity } from "data/Entity/FormFieldEntity";

import { KeyValueEntity } from "data/Entity/KeyValueEntity";

const repository = new FormFieldRepositoryImpl();

export interface CreateFormResponse {
    success: boolean;
    message: string;
}

// Acción para obtener todos los formularios
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

// Acción para obtener los formularios del selector
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

// Acción para obtener un formulario por ID
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

// Acción para eliminar un formulario
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

// Acción para crear un formulario
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

// Acción para editar un formulario
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
