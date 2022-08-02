import { Request, Response } from 'express';

export interface Route {
  method: 'GET' | 'HEAD' | 'OPTIONS' | 'POST' | 'PUT' | 'DELETE';
  path: string;
  callbackFunction: (request: Request, response: Response) => void;
}

export interface ServiceErrorResponse {
  message: string;
  description: string;
}



