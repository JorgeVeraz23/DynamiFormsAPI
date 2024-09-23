import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { KeyValueEntity } from "data/Entity/KeyValueEntity";

import { getFilledFormSelectorAction } from "../action/FilledFormAction";

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

const filledFormSlice = createSlice({
    name: "filledForm",
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
        .addCase(getFilledFormSelectorAction.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(getFilledFormSelectorAction.fulfilled, (state, action: PayloadAction<KeyValueEntity[]>) => {
            state.loading = false;
            state.fieldTypes = action.payload;
        })
        .addCase(getFilledFormSelectorAction.rejected, (state, action: PayloadAction<string | unknown>) => {
            state.loading = false;
            state.error = action.payload as string;
        });
},
});


export const { resetFieldTypeState } = filledFormSlice.actions;
export default filledFormSlice.reducer;
