import { configureStore } from "@reduxjs/toolkit";
import formSlice from "./slice/FormSlice";  // Asegúrate de que el nombre coincida

export const store = configureStore({
    reducer: {
        form: formSlice,  // Nombre de la propiedad en el reducer debe coincidir con el nombre del slice
    },
});

// Inferir los tipos `RootState` y `AppDispatch` de la propia tienda
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
