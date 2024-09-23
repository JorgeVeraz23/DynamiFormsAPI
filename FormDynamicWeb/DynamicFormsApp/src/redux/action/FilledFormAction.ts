import { createAsyncThunk } from "@reduxjs/toolkit";


import { KeyValueEntity } from "data/Entity/KeyValueEntity";

import FilledFormRepositoryImpl from "../../data/repositoryImpl/FilledFormRepositoryImpl";

const repository = new FilledFormRepositoryImpl();

export interface CreateFormResponse {
    success: boolean;
    message: string;
}



// Acción para obtener los formularios del selector
export const getFilledFormSelectorAction = createAsyncThunk<KeyValueEntity[], void>(
    "filledForm/GetFilledFormSelectorAction",
    async (_, thunkAPI) => {
        try {
            const forms = await repository.selectorFilledForm();
            console.log("en action",forms)
            return forms;
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Error desconocido";
            return thunkAPI.rejectWithValue(errorMessage);
        }
    }
);







