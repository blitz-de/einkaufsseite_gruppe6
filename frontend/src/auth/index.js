/**
 * @author: Sakhr Al-absi
 * @Gruppe: 6
 * @Matrikelnummer: s0562218
 */
import { API } from "../config";

/**
 * fetcht die Daten von dem Front- zum Backend mit POST
 * @param {*} user der zum backend geschickt wird
 * @returns 
 */
export const signup = user => {
    return fetch(`${API}/signup`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
};

/**
 * fetcht die Daten von dem Front- zum Backend mit POST
 * @param {*} user der zum backend geschickt wird
 * @returns 
 */
export const signin = user => {
    return fetch(`${API}/signin`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
};

/**
 * Authentifiziert den benutzer und addiert ein token in das localstorage
 * @param {*} data 
 * @param {*} next 
 */
export const authenticate = (data, next) => {
    if (typeof window !== "undefined") {
        localStorage.setItem("jwt", JSON.stringify(data));
        next();
    }
};

/** Beim ausloggen nimmt das gespeicherte Token heraus
 * und leitet den nutzer zur /signout weiter über GET
*/
export const signout = next => {
    if (typeof window !== "undefined") {
        localStorage.removeItem("jwt");
        next();
        return fetch(`${API}/signout`, {
            method: "GET"
        })
            .then(response => {
                console.log("signout", response);
            })
            .catch(err => console.log(err));
    }
};

/**
 * jwt in den localstorage setzen, falls benutzer authentifiziert ist 
 * sie wird z.B. benutzt, um auch in Menu zu zeigen, falls den Benutzer
 * authentiziert ist, dann wird das unaktive leiste nicht gezeigt
 * @returns das token von jwt
 */
export const isAuthenticated = () => {
    if (typeof window == "undefined") {
        return false;
    }
    if (localStorage.getItem("jwt")) {
        return JSON.parse(localStorage.getItem("jwt"));
    } else {
        return false;
    }
};