export interface Driver {
    driverId: string;
    url: string;
    givenName: string;
    familyName: string;
    dateOfBirth: string;
    nationality: string;
}

export interface DriverTable {
    Drivers: Driver[];
}

export interface DriversState {
    limit: number;
    offset: number;
    total: number;
    DriverTable: DriverTable;
    loading: boolean;
    error: string | null;
}
