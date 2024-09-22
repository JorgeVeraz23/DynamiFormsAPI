import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FormFieldEntity } from "data/Entity/FormFieldEntity";
import { KeyValueEntity } from "data/Entity/KeyValueEntity";
import {
  getAllFormFieldAction,
  getFormFieldSelectorAction,
  getFormFieldByIdAction,
  deleteFormFieldAction,
  createFormFieldAction,
  editFormFieldAction,
} from "../action/FormFieldAction";

interface FormFieldState {
  formFields: FormFieldEntity[];
  formFieldSelector: KeyValueEntity[];
  selectedFormField: FormFieldEntity | null;
  loading: boolean;
  error: string | null;
}

const initialState: FormFieldState = {
  formFields: [],
  formFieldSelector: [],
  selectedFormField: null,
  loading: false,
  error: null,
};

const formFieldSlice = createSlice({
  name: "formField",
  initialState,
  reducers: {
    // Puedes definir reductores adicionales si es necesario.
  },
  extraReducers: (builder) => {
    // Obtener todos los FormFields
    builder.addCase(getAllFormFieldAction.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getAllFormFieldAction.fulfilled, (state, action: PayloadAction<FormFieldEntity[]>) => {
      state.loading = false;
      state.formFields = action.payload;
    });
    builder.addCase(getAllFormFieldAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Obtener el selector de FormFields
    builder.addCase(getFormFieldSelectorAction.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getFormFieldSelectorAction.fulfilled, (state, action: PayloadAction<KeyValueEntity[]>) => {
      state.loading = false;
      state.formFieldSelector = action.payload;
    });
    builder.addCase(getFormFieldSelectorAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Obtener FormField por ID
    builder.addCase(getFormFieldByIdAction.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getFormFieldByIdAction.fulfilled, (state, action: PayloadAction<FormFieldEntity>) => {
      state.loading = false;
      state.selectedFormField = action.payload;
    });
    builder.addCase(getFormFieldByIdAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Eliminar FormField
    builder.addCase(deleteFormFieldAction.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteFormFieldAction.fulfilled, (state, action: PayloadAction<number>) => {
      state.loading = false;
      state.formFields = state.formFields.filter((field) => field.idFormField !== action.payload);
    });
    builder.addCase(deleteFormFieldAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Crear FormField
    builder.addCase(createFormFieldAction.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createFormFieldAction.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(createFormFieldAction.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as { success: boolean; message: string }).message;
    });

    // Editar FormField
    builder.addCase(editFormFieldAction.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(editFormFieldAction.fulfilled, (state, action: PayloadAction<FormFieldEntity>) => {
      state.loading = false;
      const index = state.formFields.findIndex((field) => field.idFormField === action.payload.idFormField);
      if (index !== -1) {
        state.formFields[index] = action.payload;
      }
    });
    builder.addCase(editFormFieldAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export default formFieldSlice.reducer;
