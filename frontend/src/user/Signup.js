/**
 * @author: Sakhr Al-absi
 * @Gruppe: 6
 * @Matrikelnummer: s0562218
 */
import React, { useState, useEffect } from "react";
import { Redirect, Link } from "react-router-dom";
import Layout from "../core/Layout";
import { signup } from "../auth";

/**
 * Das hier ist unser State. Immer wenn die Eingabe sich ändert, 
 * dann wird diese (Change Event) aufgegriffen aus dem signupForm und
 * die state wird geändert.
 * Der Name, email, pass werden per Dafault leer sein
 * @returns 
 */
const Signup = () => {
    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        error: "",
        success: false
    });

    const { name, email, password, success, error } = values;

    /**
     * Immer wenn eine Änderung in der input elemnt in der signup form 
     * D.h. wenn onChange aufgerufen wird, dann wird diese Methode ausgeführt.
     * 
     * Das Event kann entweder den Name, die Email oder das Passwort sein. 
     * 
     * event.target.value: der Wert der Eingabe in handleChange, den von der signUpFrom oder
     * irgendwelche andere Elemente, die benutzt werden können, herausgenommen wird
     * 
     * Das setValues aus dem useState wird benutzt um den state zu ändern.
     * @param {*} name ist dynamisch, kann immer anders eingegeben werden
     * @returns das neue geänderte Wert (value)
     */
    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value });
    };

    /**
     * wenn auf submit geklickt wird, dann werden die gehandelte Werte 
     * gesetzt.
     * 
     * 1) preventDefault(), damit die Seite sich nicht immer aktualisiert, wenn 
     *    man auf das Btn klickt
     * 2) signup(name,..) aus auth/index.js benutzen um die eingaben zu fetchen und sie an den backend zu senden.
     *      -> wenn es klappt dann wird ein successMessage aufgezeigt, sonst 
     *          werden die values gesetzt und ein SuccessMessage aufgezeigt
     * 
     * @param {*} event 
     */
    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: false });
        signup({ name, email, password }).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error, success: false });
            } else {
                setValues({
                    ...values,
                    name: "",
                    email: "",
                    password: "",
                    error: "",
                    success: true
                });
            }
        });
    };
    /**
     * Ein Form wird erstellt und diese werden 3 divs gehandelt:
     * Name, email und passwort
     * Ein button wurde auch erstellt um die neue werte zu registerieren
     * @returns gibt ein Form-element zurück 
     */
    const signUpForm = () => (
        <form>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input
                    onChange={handleChange("name")}
                    type="text"
                    className="form-control"
                    value={name}
                />
            </div>

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
 * @returns  <div> mit der nachricht drine </div>
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
* Aufzeigen einer Meldung, wenn es true ist
* @returns <div> mit der nachricht drine </div>
*/
    const showSuccess = () => (
        <div
            className="alert alert-info"
            style={{ display: success ? "" : "none" }}
        >
            Ein neues Konto wurde erstellt. Bitte <Link to="/signin">Loggen Sie ein</Link>
        </div>
    );

    return (
        <Layout
            title="Registerieren"
            description="Registerieren Sie sich zum Florentina"
            className="container col-md-8 offset-md-2"
        >
            {showSuccess()}
            {showError()}
            {signUpForm()}
        </Layout>
    );
};

export default Signup;
