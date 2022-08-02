export interface Driver {
  _id: string;
  name: string;
  phoneNumber: string;
}

// Get all drivers
export interface GetDriversServiceResponse {
  drivers: Driver[];
}


// Get driver
export interface GetDriverDetailsServiceResponse {
  driver: Driver;
}