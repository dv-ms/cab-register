import { Route } from '../types/routing';
import { driverRoutes } from './drivers';

const routes: Route[] = [];

driverRoutes.map(function (driverRoute: Route) {
  routes.push(driverRoute);
});

export default routes;
