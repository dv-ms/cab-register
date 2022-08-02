import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';

import MongoDB from '../db';

import { Route, ServiceErrorResponse } from '../types/routing';
import { Driver, GetDriverDetailsServiceResponse, GetDriversServiceResponse } from '../types/drivers';

export const driverRoutes: Route[] = [
  {
    method: 'GET',
    path: '/drivers',
    callbackFunction: async (request: Request, response: Response) => {
      try {
        const mongoDBObject = new MongoDB();

        if ((await mongoDBObject.db.collection('drivers').countDocuments()) === 0) {
          const responseJson: ServiceErrorResponse = {
            message: 'No records found',
            description: 'No documents were found in the database.'
          };
          response.status(404).json(responseJson);
          return;
        }

        const drivers: Driver[] = [];
        const cursor = mongoDBObject.db.collection('drivers').find();
        await cursor.forEach(function (document) {
          drivers.push({
            _id: document._id.toString(),
            name: document.name,
            phoneNumber: document.phoneNumber
          });
        });

        mongoDBObject.close();

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
    callbackFunction: async (request: Request, response: Response) => {
      try {
        const mongoDBObject = new MongoDB();

        const result = await mongoDBObject.db.collection('drivers').findOne({ _id: new ObjectId(request.params.id) });

        mongoDBObject.close();

        if (result === null) {
          const responseJson: ServiceErrorResponse = {
            message: 'No record found',
            description: 'No document was found in the database with given id'
          };
          response.status(404).json(responseJson);
          return;
        } else {
          const driver: Driver = {
            _id: result._id.toString(),
            name: result.name,
            phoneNumber: result.phoneNumber
          };
          const responseJson: GetDriverDetailsServiceResponse = {
            driver
          };
          response.status(200).json(responseJson);
        }
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
