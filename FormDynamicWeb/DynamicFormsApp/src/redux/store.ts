import { configureStore } from "@reduxjs/toolkit";

import formReducer from "./slice/FormSlice"
import formGroupReducer from "./slice/FormGroupSlice"
import FormFieldReducer from "./slice/FormFieldSlice";

import FieldTypeReducer from "./slice/FieldTypeSlice";
import filledFormReducer from "./slice/filledFormSlice";

export const store = configureStore({
    reducer: {
        form: formReducer, 
        formGroup: formGroupReducer,
        formField: FormFieldReducer,
        fielType: FieldTypeReducer,
        filledForm: filledFormReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch


