import { configureStore } from '@reduxjs/toolkit';
import driversReducer from './slice/driversSlice';

const store = configureStore({
    reducer: {
        drivers: driversReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
            immutableCheck: false,
        }),
    devTools: __DEV__,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
