/**
 * @author: Sakhr Al-absi
 * @Gruppe: 6
 * @Matrikelnummer: s0562218
 */
import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { isAuthenticated } from "./index";

/**
 * genauso wie bei privateRoute aber hier ist der user.role auch da, um 
 * herauszufinden welche rolle der benutzer hat
 * @param {*} param0 
 * @returns 
 */
const AdminRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            isAuthenticated() && isAuthenticated().user.role === 1 ? (
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

export default AdminRoute;
