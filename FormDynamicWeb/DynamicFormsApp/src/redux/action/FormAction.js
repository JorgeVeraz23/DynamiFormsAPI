import { createAsyncThunk } from "@reduxjs/toolkit";
import FormRepositoryImpl from "../../data/repositoryImpl/FormRepositoryImpl";

const repository = new FormRepositoryImpl();

// Acción para obtener todos los formularios
export const getAllFormAction = createAsyncThunk(
    "form/GetAllFormAction",
    async (_, thunkAPI) => {
        try {
            const forms = await repository.getAllForm();
            return forms; // Retorna los datos sin tipo
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Error desconocido";
            return thunkAPI.rejectWithValue(errorMessage);
        }
    }
);

// Acción para obtener un formulario por ID
export const getFormByIdAction = createAsyncThunk(
    "form/GetFormByIdAction",
    async (id, thunkAPI) => {
        try {
            const form = await repository.getFormById(id);
            return form; // Retorna los datos sin tipo
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Error desconocido";
            return thunkAPI.rejectWithValue(errorMessage);
        }
    }
);

// Acción para eliminar un formulario
export const deleteFormAction = createAsyncThunk(
    "form/DeleteFormAction",
    async (id, thunkAPI) => {
        try {
            await repository.deleteForm(id);
            return id; // Retorna el ID del formulario eliminado
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Error desconocido";
            return thunkAPI.rejectWithValue(errorMessage);
        }
    }
);

// Acción para crear un formulario
export const createFormAction = createAsyncThunk(
    "form/CreateFormAction",
    async (data, thunkAPI) => {
        try {
            await repository.createForm(data);
            return data; // Retorna los datos enviados
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Error desconocido";
            return thunkAPI.rejectWithValue(errorMessage);
        }
    }
);

// Acción para editar un formulario
export const editFormAction = createAsyncThunk(
    "form/EditFormAction",
    async (data, thunkAPI) => {
        try {
            await repository.editForm(data);
            return data; // Retorna los datos enviados
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Error desconocido";
            return thunkAPI.rejectWithValue(errorMessage);
        }
    }
);
