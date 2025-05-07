import axiosInstance from '../axios/axiosInstance';

export const fetchDrivers = async (offset: number = 30, limit: number = 30) => {
    const response = await axiosInstance.get('drivers.json', {
        params: { offset, limit },
    });
    return response.data.MRData;
};
