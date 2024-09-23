import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { KeyValueEntity } from "data/Entity/KeyValueEntity";
import { getFileTypeSelectorAction } from "../action/FieldTypeAction";

interface FieldTypeState {
    fieldTypes: KeyValueEntity[];
    loading: boolean;
    error: string | null;
}

const initialState: FieldTypeState = {
    fieldTypes: null,
    loading: false,
    error: null,
};

const fieldTypeSlice = createSlice({
    name: "fieldType",
    initialState,
    reducers: {
        resetFieldTypeState: (state) => {
            state.fieldTypes = [];
            state.loading = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(getFileTypeSelectorAction.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(getFileTypeSelectorAction.fulfilled, (state, action: PayloadAction<KeyValueEntity[]>) => {
            state.loading = false;
            state.fieldTypes = action.payload;
        })
        .addCase(getFileTypeSelectorAction.rejected, (state, action: PayloadAction<string | unknown>) => {
            state.loading = false;
            state.error = action.payload as string;
        });
},
});


export const { resetFieldTypeState } = fieldTypeSlice.actions;
export default fieldTypeSlice.reducer;
