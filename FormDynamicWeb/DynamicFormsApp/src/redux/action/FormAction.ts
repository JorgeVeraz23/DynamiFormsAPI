import { createAsyncThunk } from "@reduxjs/toolkit";
import FormRepositoryImpl from "../../data/repositoryImpl/FormRepositoryImpl";
import { FormEntity } from "data/Entity/FormEntity";

const repository = new FormRepositoryImpl();

export interface CreateFormResponse {
    success: boolean;
    message: string;
}

// Acción para obtener todos los formularios
export const getAllFormAction = createAsyncThunk<FormEntity[], void>(
    "form/GetAllFormAction",
    async (_, thunkAPI) => {
        try {
            const forms = await repository.getAllForm();
            return forms;
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Error desconocido";
            return thunkAPI.rejectWithValue(errorMessage);
        }
    }
);

// Acción para obtener un formulario por ID
export const getFormByIdAction = createAsyncThunk<FormEntity, number>(
    "form/GetFormByIdAction",
    async (id, thunkAPI) => {
        try {
            const form = await repository.getFormById(id);
            return form;
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Error desconocido";
            return thunkAPI.rejectWithValue(errorMessage);
        }
    }
);

// Acción para eliminar un formulario
export const deleteFormAction = createAsyncThunk<number, number>(
    "form/DeleteFormAction",
    async (id, thunkAPI) => {
        try {
            await repository.deleteForm(id);
            return id;
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Error desconocido";
            return thunkAPI.rejectWithValue(errorMessage);
        }
    }
);

// Acción para crear un formulario
export const createFormAction = createAsyncThunk<CreateFormResponse, FormEntity>(
    "form/CreateFormAction",
    async (data, thunkAPI) => {
        try {
            await repository.createForm(data);
            return { success: true, message: "Formulario creado correctamente." };
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Error desconocido";
            return thunkAPI.rejectWithValue({ success: false, message: errorMessage });
        }
    }
);

// Acción para editar un formulario
export const editFormAction = createAsyncThunk<FormEntity, FormEntity>(
    "form/EditFormAction",
    async (data, thunkAPI) => {
        try {
            await repository.editForm(data);
            return data;
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Error desconocido";
            return thunkAPI.rejectWithValue(errorMessage);
        }
    }
);
