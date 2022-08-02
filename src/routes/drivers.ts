import { Request, Response } from 'express';

import { Route, ServiceErrorResponse } from '../types/routing';
import { Driver, GetDriverDetailsServiceResponse, GetDriversServiceResponse } from '../types/drivers';

export const driverRoutes: Route[] = [
  {
    method: 'GET',
    path: '/drivers',
    callbackFunction: (request: Request, response: Response) => {
      try {
        const drivers: Driver[] = [
          {
            _id: '1',
            name: 'Driver 1',
            phoneNumber: '1234567890'
          },
          {
            _id: '2',
            name: 'Driver 2',
            phoneNumber: '1234567890'
          },
          {
            _id: '3',
            name: 'Driver 3',
            phoneNumber: '1234567890'
          },
          {
            _id: '4',
            name: 'Driver 4',
            phoneNumber: '1234567890'
          }
        ];

        const responseJson: GetDriversServiceResponse = {
          drivers
        };
        response.status(200).json(responseJson);
      } catch (error) {
        const responseJson: ServiceErrorResponse = {
          message: error.message,
          description: error.description
        };
        response.status(500).json(responseJson);
      }
    }
  },
  {
    method: 'GET',
    path: '/drivers/:id',
    callbackFunction: (request: Request, response: Response) => {
      try {
        const driver: Driver = {
          _id: request.params.id,
          name: `Drivers ${request.params.id}`,
          phoneNumber: '1234567890'
        };
        const responseJson: GetDriverDetailsServiceResponse = {
          driver
        };
        response.status(200).json(responseJson);
      } catch (error) {
        const responseJson: ServiceErrorResponse = {
          message: error.message,
          description: error.description
        };
        response.status(500).json(responseJson);
      }
    }
  }
];
