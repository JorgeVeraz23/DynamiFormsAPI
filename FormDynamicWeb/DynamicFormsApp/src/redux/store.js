import { configureStore } from "@reduxjs/toolkit";
// import formSlice from "./slice/FormSlice.js"; // Asegúrate de que la ruta sea correcta
import formReducer from "./slice/FormSlice"
// import fieldTypeReducer from "./slice/FieldTypeSlice";
import fieldTypeReducer from "./slice/FieldTypeSlice"
export const store = configureStore({
    reducer: {
        form: formReducer, // Nombre de la propiedad en el reducer debe coincidir con el nombre del slice
        fieldType: fieldTypeReducer,
    },
});

// No necesitas inferir tipos en JavaScript, por lo que puedes eliminar `RootState` y `AppDispatch`
