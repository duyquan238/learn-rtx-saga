import * as React from 'react';
import { Redirect, Route, RouteProps } from 'react-router';

export interface PrivateRouteProps {}

export function PrivateRoute(props: RouteProps) {
  //Check if user is logged in or not
  const isLoggedIn = Boolean(localStorage.getItem('access_token'));
  if (!isLoggedIn) return <Redirect to="/login" />;
  return <Route {...props} />;
}
