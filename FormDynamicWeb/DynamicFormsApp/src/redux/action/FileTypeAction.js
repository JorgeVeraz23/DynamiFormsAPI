import { createAsyncThunk } from "@reduxjs/toolkit";
// import FormRepositoryImpl from "../../data/repositoryImpl/FormRepositoryImpl";

import FielTypeRepositoryIml from "../../data/repositoryImpl/FieldTypeRepositoryImpl";

const repository = new FielTypeRepositoryIml();

export const selectorFieldTypeAction = createAsyncThunk(
    "fieldType/SelectorFieldTypeAction",
    async (_, thunkAPI) => {
        try {
            const forms = await repository.selectorFielType();
            return forms; 
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Error desconocido";
            return thunkAPI.rejectWithValue(errorMessage);
        }
    }
);

