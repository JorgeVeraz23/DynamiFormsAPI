import { createAsyncThunk } from "@reduxjs/toolkit";

import FormGroupRepositoryImpl from "data/repositoryImpl/FormGroupRepositoryImpl";
import { FormGroupEntity } from "data/Entity/FormGroupEntity";
import { CreateFormResponse } from "./FormAction";
const repository = new FormGroupRepositoryImpl();



// Acción para obtener todos los formularios
export const getAllFormGroupAction = createAsyncThunk<FormGroupEntity[], void>(
    "formGroup/GetAllFormGroupAction",
    async (_, thunkAPI) => {
        try {
            const forms = await repository.getAllFormGroup();
            return forms;
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Error desconocido";
            return thunkAPI.rejectWithValue(errorMessage);
        }
    }
);

// Acción para obtener un formulario por ID
export const getFormGroupByIdAction = createAsyncThunk<FormGroupEntity, number>(
    "formGroup/GetFormGroupByIdAction",
    async (id, thunkAPI) => {
        try {
            const form = await repository.getFormGroupById(id);
            return form;
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Error desconocido";
            return thunkAPI.rejectWithValue(errorMessage);
        }
    }
);

// Acción para eliminar un formulario
export const deleteFormGroupAction = createAsyncThunk<number, number>(
    "formGroup/DeleteFormGroupAction",
    async (id, thunkAPI) => {
        try {
            await repository.deleteFormGroup(id);
            return id;
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Error desconocido";
            return thunkAPI.rejectWithValue(errorMessage);
        }
    }
);

// Acción para crear un formulario
export const createFormGroupAction = createAsyncThunk<CreateFormResponse, FormGroupEntity>(
    "formGroup/CreateFormGroupAction",
    async (data, thunkAPI) => {
        try {
            await repository.createFormGroup(data);
            return { success: true, message: "Formulario creado correctamente." };
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Error desconocido";
            return thunkAPI.rejectWithValue({ success: false, message: errorMessage });
        }
    }
);

// Acción para editar un formulario
export const editFormGroupAction = createAsyncThunk<FormGroupEntity, FormGroupEntity>(
    "formGroup/EditFormGroupAction",
    async (data, thunkAPI) => {
        try {
            await repository.editFormGroup(data);
            return data;
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Error desconocido";
            return thunkAPI.rejectWithValue(errorMessage);
        }
    }
);
