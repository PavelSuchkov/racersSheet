import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchDrivers } from '../../api/driversApi';

export const loadDrivers = createAsyncThunk(
    'drivers/loadDrivers',
    async ({ offset = 30, limit = 30 }: { offset?: number; limit?: number }, thunkAPI) => {
        try {
            const data = await fetchDrivers(offset, limit);
            return data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message || 'Unknown error');
        }
    }
);

export const loadMoreDrivers = createAsyncThunk(
    'drivers/loadMoreDrivers',
    async ({ offset = 30, limit = 30 }: { offset?: number; limit?: number }, thunkAPI) => {
        try {
            const data = await fetchDrivers(offset, limit);
            return data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message || 'Unknown error');
        }
    }
);
