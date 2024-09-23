import { createAsyncThunk } from "@reduxjs/toolkit";


import { KeyValueEntity } from "data/Entity/KeyValueEntity";
import FieldTypeRepositoryImpl from "../../data/repositoryImpl/FieldTypeRepositoryImpl";


const repository = new FieldTypeRepositoryImpl();

export interface CreateFormResponse {
    success: boolean;
    message: string;
}




export const getFileTypeSelectorAction = createAsyncThunk<KeyValueEntity[], void>(
    "fileType/GetFileTypeSelectorAction",
    async (_, thunkAPI) => {
        try {
            const forms = await repository.selectorFielType();
            console.log("en action",forms)
            return forms;
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Error desconocido";
            return thunkAPI.rejectWithValue(errorMessage);
        }
    }
);







