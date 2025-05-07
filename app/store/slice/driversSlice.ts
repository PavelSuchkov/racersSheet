import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DriversState } from '../types/driver.types';
import { loadDrivers } from '../thunk/driversThunk';
import { loadMoreDrivers } from '../thunk/driversThunk';

const initialState: DriversState = {
    limit: 30,
    offset: 0,
    total: 0,
    DriverTable: {
        Drivers: [],
    },
    loading: false,
    error: null,
};

const driversSlice = createSlice({
    name: 'drivers',
    initialState,
    reducers: {
        setDrivers: (state, action: PayloadAction<DriversState>) => {
            return { ...state, ...action.payload };
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
        clearDrivers: (state) => {
            state.DriverTable.Drivers = [];
            state.total = 0;
            state.offset = 0;
        },
    },
    extraReducers: (builder) => {
        builder
            // Первая страница — замена массива
            .addCase(loadDrivers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loadDrivers.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.limit = Number(action.payload.limit);
                state.total = Number(action.payload.total);
                state.DriverTable.Drivers = action.payload.DriverTable.Drivers;
                state.offset = state.limit;
            })
            .addCase(loadDrivers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string || 'Ошибка загрузки';
            })
            // Подгрузка — добавление к массиву
            .addCase(loadMoreDrivers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loadMoreDrivers.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.limit = Number(action.payload.limit);
                state.total = Number(action.payload.total);
                state.DriverTable.Drivers = [
                  ...state.DriverTable.Drivers,
                  ...action.payload.DriverTable.Drivers,
                ];
                state.offset = state.offset + state.limit;
            })
            .addCase(loadMoreDrivers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string || 'Ошибка загрузки';
            });
    },
});

export const { setDrivers, setLoading, setError, clearDrivers } = driversSlice.actions;
export default driversSlice.reducer;
