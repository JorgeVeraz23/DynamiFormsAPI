import { createSlice } from "@reduxjs/toolkit";
import { Form } from "../../data/Entity/Entities";
import {
    getAllFormAction,
    getFormByIdAction,
    deleteFormAction,
    createFormAction,
    editFormAction
} from "../action/FormAction";

interface FormState {
    data: Form[];
    currentForm: Form | null;
    loading: boolean;
    error: string | null;
}

const initialState: FormState = {
    data: [],
    currentForm: null,
    loading: false,
    error: null,
};

const formSlice = createSlice({
    name: 'form',
    initialState,
    reducers: {
        resetState: (state) => {
            state.data = [];
            state.currentForm = null;
            state.loading = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        // Obtener todos los formularios
        builder
            .addCase(getAllFormAction.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllFormAction.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(getAllFormAction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Error al obtener los formularios';
            });

        // Obtener un formulario por ID
        builder
            .addCase(getFormByIdAction.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getFormByIdAction.fulfilled, (state, action) => {
                state.loading = false;
                state.currentForm = action.payload;
            })
            .addCase(getFormByIdAction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Error al obtener el formulario';
            });

        // Eliminar un formulario
        builder
            .addCase(deleteFormAction.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteFormAction.fulfilled, (state, action) => {
                state.loading = false;
                if (state.data) {
                    state.data = state.data.filter(form => form.idForm !== action.meta.arg);
                }
            })
            .addCase(deleteFormAction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Error al eliminar el formulario';
            });

        // Crear un formulario
        builder
            .addCase(createFormAction.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createFormAction.fulfilled, (state) => {
                state.loading = false;
                // Aquí podrías actualizar la lista de formularios si es necesario
            })
            .addCase(createFormAction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Error al crear el formulario';
            });

        // Editar un formulario
        builder
            .addCase(editFormAction.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(editFormAction.fulfilled, (state, action) => {
                state.loading = false;
                // Aquí podrías actualizar la lista de formularios si es necesario
                if (action.payload) {
                    // Actualizar el formulario en el estado
                    state.data = state.data?.map(form =>
                      form.idForm === action.meta.arg.idForm ? action.meta.arg : form
                    );
                  }
            })
            .addCase(editFormAction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Error al editar el formulario';
            });
    },
});

export const { resetState } = formSlice.actions;
export default formSlice.reducer;
