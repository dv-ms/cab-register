import express, { Express } from 'express';

// Types
import { Route } from './types/routing';

// Routes
import routes from './routes';

// Server
const expressApp: Express = express();
const port = process.env.SERVER_PORT || 3000;

// Routes
routes.map(function (route: Route) {
  if (route.method === 'GET') {
    return expressApp.get(route.path, route.callbackFunction);
  }

  if (route.method === 'POST') {
    return expressApp.post(route.path, route.callbackFunction);
  }

  if (route.method === 'PUT') {
    return expressApp.put(route.path, route.callbackFunction);
  }

  if (route.method === 'DELETE') {
    return expressApp.delete(route.path, route.callbackFunction);
  }
});

// Server Start
expressApp.listen(port, () => {
  return console.log(`Node server listening on port ${port}`);
});
