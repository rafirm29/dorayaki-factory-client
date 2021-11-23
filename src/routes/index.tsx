import React from 'react';
import { Route } from 'react-router-dom';
import RouteGuard, { RouteProps } from './routeGuard';
import Login from '../pages/login';
import Ingridients from '../pages/ingredients';
import Request from '../pages/request';
import Home from '../pages/home';
import RecipesList from '../pages/recipeslist';
import RecipesAdd from '../pages/recipesadd';
export const routes: RouteProps[] = [
  {
    Component: Home,
    path: '/home',
  },
  {
    Component: Login,
    path: '/',
    beforeLoggedIn: true,
  },
  {
    Component: Ingridients,
    path: '/ingredients',
    afterLoggedIn: true,
  },
  {
    Component: Request,
    path: '/request',
    afterLoggedIn: true,
  },
  {
    Component: RecipesList,
    path: '/recipes/list',
    beforeLoggedIn: true,
  },
  {
    Component: RecipesAdd,
    path: '/recipes/add',
    beforeLoggedIn: true,
  },
];

const renderRoutes = () => {
  return routes.map((route) => (
    <Route
      key={route.path}
      path={route.path}
      element={
        <RouteGuard {...route}>
          <route.Component></route.Component>
        </RouteGuard>
      }
    ></Route>
  ));
};

export default renderRoutes;
