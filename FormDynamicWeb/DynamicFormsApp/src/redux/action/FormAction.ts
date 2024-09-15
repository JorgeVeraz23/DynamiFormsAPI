import { createAsyncThunk } from "@reduxjs/toolkit";
import FormRepositoryImpl from "../../data/repositoryImpl/FormRepositoryImpl";
import { Form } from "../../data/Entity/Entities";

const repository = new FormRepositoryImpl();

// Acción para obtener todos los formularios
export const getAllFormAction = createAsyncThunk<Form[], void, { rejectValue: string }>(
    "form/GetAllFormAction",
    async (_, thunkAPI) => {
        try {
            return await repository.getAllForm();
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Error desconocido";
            return thunkAPI.rejectWithValue(errorMessage);
        }
    }
);

// Acción para obtener un formulario por ID
export const getFormByIdAction = createAsyncThunk<Form, number, { rejectValue: string }>(
    "form/GetFormByIdAction",
    async (id, thunkAPI) => {
        try {
            return await repository.getFormById(id);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Error desconocido";
            return thunkAPI.rejectWithValue(errorMessage);
        }
    }
);

// Acción para eliminar un formulario
export const deleteFormAction = createAsyncThunk<boolean, number, { rejectValue: string }>(
    "form/DeleteFormAction",
    async (id, thunkAPI) => {
        try {
            return await repository.deleteForm(id);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Error desconocido";
            return thunkAPI.rejectWithValue(errorMessage);
        }
    }
);

// Acción para crear un nuevo formulario
export const createFormAction = createAsyncThunk<boolean, Form, { rejectValue: string }>(
    "form/CreateFormAction",
    async (formData, thunkAPI) => {
        try {
            return await repository.createForm(formData);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Error desconocido";
            return thunkAPI.rejectWithValue(errorMessage);
        }
    }
);

// Acción para editar un formulario existente
export const editFormAction = createAsyncThunk<boolean, Form, { rejectValue: string }>(
    "form/EditFormAction",
    async (formData, thunkAPI) => {
        try {
            return await repository.editForm(formData);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Error desconocido";
            return thunkAPI.rejectWithValue(errorMessage);
        }
    }
);
