/**
 * @author: Sakhr Al-absi
 * @Gruppe: 6
 * @Matrikelnummer: s0562218
 */
 import React, { Component } from "react";
 import { Route, Redirect } from "react-router-dom";
 import { isAuthenticated } from "./index";
 
 // to make the output of the component dynamich
 /**
  * Function Quelle: https://reactrouter.com/web/example/auth-workflow
  * 
  * props is used here to unpack various types of properties accordingly
  * and makes passing the values to the component more flexible
  * Ex: var props = {x: 1, y:2, z:3 };--> <Component {...props} />
  * 
  * if the user is authenticated the component is going to be returned
  * else redirect to the signin page
  * @param {*} param0 
  * @returns 
  */
 const PrivateRoute = ({ component: Component, ...rest }) => (
     <Route
         {...rest}
         render={props =>
             isAuthenticated() ? (
                 <Component {...props} />
             ) : (
                 <Redirect
                     to={{
                         pathname: "/signin",
                         state: { from: props.location }
                     }}
                 />
             )
         }
     />
 );
 
 export default PrivateRoute;
 