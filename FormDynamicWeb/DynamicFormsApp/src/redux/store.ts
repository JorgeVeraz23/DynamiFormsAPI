import { configureStore } from "@reduxjs/toolkit";
// import formSlice from "./slice/FormSlice.js"; // Asegúrate de que la ruta sea correcta
// import formReducer from "./slice/FormSlice"
import formReducer from "./slice/FormSlice"
// import fieldTypeReducer from "./slice/FieldTypeSlice";
export const store = configureStore({
    reducer: {
        form: formReducer, // Nombre de la propiedad en el reducer debe coincidir con el nombre del slice
    },
});
// Infer the `RootState` and `AppDispatch` types from the store itself
// Inferir los tipos `RootState` y `AppDispatch` de la propia tienda
// Definir RootState basado en la configuración del store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch

// No necesitas inferir tipos en JavaScript, por lo que puedes eliminar `RootState` y `AppDispatch`
