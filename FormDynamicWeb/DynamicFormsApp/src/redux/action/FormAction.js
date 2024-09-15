import { createAsyncThunk } from "@reduxjs/toolkit";
import FormRepositoryImpl from "../../data/repositoryImpl/FormRepositoryImpl";

const repository = new FormRepositoryImpl();

export const getAllFormAction = createAsyncThunk(
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

export const getFormByIdAction = createAsyncThunk(
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


export const deleteFormAction = createAsyncThunk(
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
export const createFormAction = createAsyncThunk(
    "form/CreateFormAction",
    async (data, thunkAPI) => {
        try {
            await repository.createForm(data);
            return data;
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Error desconocido";
            return thunkAPI.rejectWithValue(errorMessage);
        }
    }
);


export const editFormAction = createAsyncThunk(
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
