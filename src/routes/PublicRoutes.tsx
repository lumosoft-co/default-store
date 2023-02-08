/******************************* PUBLIC ROUTES *********************************/
//                                                                             //
//          This file holds ALL PUBLIC ROUTES needed for the app.              //
//          Public routes are all routes that DOES NOT need authentication.    //
//                                                                             //
//          In order to the route perform as expected, use THE EXACT SAME      //
//                          SYNTAX shown bellow:                               //
//                                                                             //
/*******************************************************************************/

import { RouteProps } from 'react-router-dom';
import {
    Categories,
    Home,
    Products
} from '../pages';

const PublicRoutes: RouteProps[] = [
    {
        path: '/',
        element: <Home />
    },
    {
        path: 'categories',
        element: <Categories />
    },
    {
        path: 'products',
        element: <Products />
    }
];

export default PublicRoutes;
