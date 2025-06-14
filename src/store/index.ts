import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
// Import your reducers here
import todoReducer from "./slices/todo-slice";

export const store = configureStore({
    reducer: {
        // Add your reducers here
        todos: todoReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                // Ignore these action types
                ignoredActions: ["your-non-serializable-action"],
                // Ignore these field paths in all actions
                ignoredActionPaths: ["meta.arg", "payload.timestamp"],
                // Ignore these paths in the state
                ignoredPaths: ["items.dates"],
            },
        }),
    devTools: process.env.NODE_ENV !== "production",
});

// Enable the refetchOnFocus/refetchOnReconnect behaviors
setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
