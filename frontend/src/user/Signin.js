/**
 * @author: Sakhr Al-absi
 * @Gruppe: 6
 * @Matrikelnummer: s0562218
 */
import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import Layout from "../core/Layout";
import { signin, authenticate, isAuthenticated } from "../auth";

/**
 * wie signup aber hier wurde die email und pass per default gesetzt
 * @returns 
 */
const Signin = () => {
    const [values, setValues] = useState({
        email: "s0562218@htw-berlin.de",
        password: "s123456789",
        error: "",
        loading: false,
        redirectToReferrer: false
    });

    const { email, password, loading, error, redirectToReferrer } = values;
    const { user } = isAuthenticated();

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value });
    };

    /**
 * wenn auf submit geklickt wird, dann werden die gehandelte Werte 
 * gesetzt.
 * 
 * 1) preventDefault(), damit die Seite sich nicht immer aktualisiert, wenn 
 *    man auf das Btn klickt
 * 2) signin(name,..) aus auth/index.js benutzen um die eingaben zu fetchen und sie an den backend zu senden.
 *      -> wenn es klappt dann wird ein successMessage aufgezeigt, sonst 
 *          werden die values gesetzt und ein SuccessMessage aufgezeigt
 * 3) hier haben wir auch loading, damit es aufgezeigt wird, wenn 
 * die Seite geloadet wird
 * 
 * 4) Wenn der User authentisiert ist und admin zugriffsrechte hat,
 *  dann wird er/sie zu /admin/dashboard weitergeleitet.
 * Wenn sie einen normalen Nutzer sind, dann an /user/dashboard  weitergeleitet
 * das passiert mit der Verwendung von redirectToReferrrer in redirectUser
 * Der admin hat die nummer 1 zum ihm zugewiesen.
 * @param {*} event 
 */
    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: false, loading: true });
        signin({ email, password }).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error, loading: false });
            } else {
                authenticate(data, () => {
                    setValues({
                        ...values,
                        redirectToReferrer: true
                    });
                });
            }
        });
    };

    /**
     * wie bei signUpForm
     * @returns 
     */
    const signInForm = () => (
        <form>
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input
                    onChange={handleChange("email")}
                    type="email"
                    className="form-control"
                    value={email}
                />
            </div>

            <div className="form-group">
                <label className="text-muted">Passwort</label>
                <input
                    onChange={handleChange("password")}
                    type="password"
                    className="form-control"
                    value={password}
                />
            </div>
            <button onClick={clickSubmit} className="btn btn-primary">
                Einreichen
            </button>
        </form>
    );

    /**
     * Aufzeigen einer Fehlermeldung
     * @returns 
     */
    const showError = () => (
        <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
        >
            {error}
        </div>
    );

    /**
     * bitte warten aufzeigen, wenn es auf true gesetzt ist
     * @returns <div> mit bitte warten drinne </div>
     */
    const showLoading = () =>
        loading && (
            <div className="alert alert-info">
                <h2>Bitte Warten...</h2>
            </div>
        );

    /**
     * leitet der Nutzer zum der richtigen Seite anhand ihre Zugriffsrechte
     * @returns die richtige Seite 
     */
    const redirectUser = () => {
        if (redirectToReferrer) {
            if (user && user.role === 1) {
                return <Redirect to="/admin/dashboard" />;
            } else {
                return <Redirect to="/user/dashboard" />;
            }
        }
        if (isAuthenticated()) {
            return <Redirect to="/" />;
        }
    };

    return (
        <Layout
            title="Einloggen"
            description="Loggen Sie sich zum Florentina ein"
            className="container col-md-8 offset-md-2"
        >
            {showLoading()}
            {showError()}
            {signInForm()}
            {redirectUser()}
        </Layout>
    );
};

export default Signin;
