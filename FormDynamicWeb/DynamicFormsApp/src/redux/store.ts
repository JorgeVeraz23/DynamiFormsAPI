import { configureStore } from "@reduxjs/toolkit";
import FormSlice from "./slice/FormSlice";

export const store = configureStore({
    reducer: {
        Form: FormSlice,
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
// Inferir los tipos `RootState` y `AppDispatch` de la propia tienda

export type RootState = ReturnType<typeof store.getState>
// Tipo inferido: {publicaciones: PostsState, comentarios: CommentsState, usuarios: UsersState}
export type AppDispatch = typeof store.dispatch