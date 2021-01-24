exports.userSignupValidator = (req, res, next) => {
    req.check("name", "Name muss eingegeben werden").notEmpty();
    req.check("email", "Email muss zwischen 3 und 32 Zeichenketten behalten")
        .matches(/.+\@.+\..+/)
        .withMessage("Email must contain @")
        .isLength({
            min: 4,
            max: 32
        });
    req.check("password", "Passwort ist nötig").notEmpty();
    req.check("password")
        .isLength({ min: 6 })
        .withMessage("Passwort muss mindests 6 Zeichen enthalten")
        .matches(/\d/)
        .withMessage("Passwort muss eine Nummer enthalten");
    const errors = req.validationErrors();
    if (errors) {
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({ error: firstError });
    }
    next();
};
