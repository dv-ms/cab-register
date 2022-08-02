import { Request, Response } from 'express';
import MongoDB from '../db';

import { Route, ServiceErrorResponse } from '../types/routing';
import { Driver, GetDriverDetailsServiceResponse, GetDriversServiceResponse } from '../types/drivers';
import { log } from 'console';
import { EMPTY_STRING } from '../constants';

export const driverRoutes: Route[] = [
  {
    method: 'GET',
    path: '/drivers',
    callbackFunction: async (request: Request, response: Response) => {
      try {
        const MongoDBObject = new MongoDB();

        if ((await MongoDBObject.db.collection('drivers').countDocuments()) === 0) {
          const responseJson: ServiceErrorResponse = {
            message: 'No records found',
            description: 'No documents were found in the database.'
          };
          response.status(404).json(responseJson);
          return;
        }

        const drivers: Driver[] = [];
        const cursor = MongoDBObject.db.collection('drivers').find();
        await cursor.forEach(function (document) {
          drivers.push({
            _id: document._id.toString(),
            name: document.name,
            phoneNumber: document.phoneNumber
          });
        });

        MongoDBObject.close();

        const responseJson: GetDriversServiceResponse = {
          drivers
        };
        response.status(200).json(responseJson);
      } catch (error) {
        const responseJson: ServiceErrorResponse = {
          message: error.class + ': ' + error.message,
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
