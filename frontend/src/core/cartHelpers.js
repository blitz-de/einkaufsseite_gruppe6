/**
 * @author: Sakhr Al-absi
 * @Gruppe: 6
 * @Matrikelnummer: s0562218
 */
 export const addItem = (item, next) => {
    let cart = [];
    if (typeof window !== "undefined") {
        if (localStorage.getItem("cart")) {
            cart = JSON.parse(localStorage.getItem("cart"));
        }
        cart.push({
            ...item,
            count: 1
        });

        // Duplikate entfernen
        // bildet ein Array von new Set und sie zum Array.form umwandeln
        // damit man später sie nochmal mappen kann
        // new set wird nur einzigartige Werte in sich erlauben
        // deswegen sollte man die eindeutige id's von jeder Objekt/Produkt übergeben
        // Wenn die Schleife versucht den gleichen Wert 2 Mal hinzufügen wird sie ignoriert
        // ...mit dem Array von id's, die wir beim ersten Mappen erhalten haben
        // map() nochmal ausführen und das aktuelle Produkt vom Cart zurückgeben

        cart = Array.from(new Set(cart.map(p => p._id))).map(id => {
            return cart.find(p => p._id === id);
        });

        localStorage.setItem("cart", JSON.stringify(cart));
        next();
    }
};

export const itemTotal = () => {
    if (typeof window !== "undefined") {
        if (localStorage.getItem("cart")) {
            return JSON.parse(localStorage.getItem("cart")).length;
        }
    }
    return 0;
};

export const getCart = () => {
    if (typeof window !== "undefined") {
        if (localStorage.getItem("cart")) {
            return JSON.parse(localStorage.getItem("cart"));
        }
    }
    return [];
};

export const updateItem = (productId, count) => {
    let cart = [];
    if (typeof window !== "undefined") {
        if (localStorage.getItem("cart")) {
            cart = JSON.parse(localStorage.getItem("cart"));
        }

        cart.map((product, i) => {
            if (product._id === productId) {
                cart[i].count = count;
            }
        });

        localStorage.setItem("cart", JSON.stringify(cart));
    }
};

export const removeItem = productId => {
    let cart = [];
    if (typeof window !== "undefined") {
        if (localStorage.getItem("cart")) {
            cart = JSON.parse(localStorage.getItem("cart"));
        }

        cart.map((product, i) => {
            if (product._id === productId) {
                cart.splice(i, 1);
            }
        });

        localStorage.setItem("cart", JSON.stringify(cart));
    }
    return cart;
};

export const emptyCart = next => {
    if (typeof window !== "undefined") {
        localStorage.removeItem("cart");
        next();
    }
};
