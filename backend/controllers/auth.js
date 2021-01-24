const User = require("../models/user");
const jwt = require("jsonwebtoken"); // um ein 'signed token' zu generieren
const expressJwt = require("express-jwt"); // für Autorisationscheck
const { errorHandler } = require("../helpers/dbErrorHandler");

exports.signup = (req, res) => {
    // console.log("req.body", req.body);
    const user = new User(req.body);
    user.save((err, user) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        user.salt = undefined;
        user.hashed_password = undefined;
        res.json({
            user
        });
    });
};

exports.signin = (req, res) => {
    // Finde den Benutzer basierend auf seine/ihre Email adresse
    const { email, password } = req.body;
    User.findOne({ email }, (err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: "Benutzer mit dieser Emailadresse existiert nicht. Bitte registerieren Sie sich"
            });
        }
        // Wenn der Benutzer gefunden wird, dann sei noch sicher, ob das Passwort und die Emailadresse miteinander übereinstimmen
        // Erstelle eine authenticate Methode in user model
        if (!user.authenticate(password)) {
            return res.status(401).json({
                error: "Email und Passwort stimmen nicht überein"
            });
        }
        // Generieret eine signed token mit einem BenuterID und ein Geheimnis 
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
        // hält das Token als "t" in Cookie mit einem Ablaufsdatum
        res.cookie("t", token, { expire: new Date() + 9999 });
        // Gibt eine Antwort mit benutzer und Token zum Frontend-Client
        const { _id, name, email, role } = user;
        return res.json({ token, user: { _id, email, name, role } });
    });
};

exports.signout = (req, res) => {
    res.clearCookie("t");
    res.json({ message: "Ausloggen war erfolgreich" });
};

exports.requireSignin = expressJwt({
    secret: process.env.JWT_SECRET,
    userProperty: "auth"
});

exports.isAuth = (req, res, next) => {
    let user = req.profile && req.auth && req.profile._id == req.auth._id;
    if (!user) {
        return res.status(403).json({
            error: "Zugriff wurde verweigert"
        });
    }
    next();
};

exports.isAdmin = (req, res, next) => {
    if (req.profile.role === 0) {
        return res.status(403).json({
            error: "Admin Resource! Zugriff wurde verweigert"
        });
    }
    next();
};
