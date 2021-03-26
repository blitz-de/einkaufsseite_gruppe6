/**
 * @author: Sakhr Al-absi
 * @Gruppe: 6
 * @Matrikelnummer: s0562218
 */
const User = require("../models/user");

/** 
 * @param: req, res, next, id - to find the user by id and request their profule accordingly
 * Any time we request :userId route, this middleware is going to
 * check if the :userId exist, or if it does not it is going to
 * throw a 400 error
*/
exports.userById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: "Benutzer wurde nicht gefunden"
            });
        }
        req.profile = user;
        next();
    });
};

/**
 * @param: req, res - to request for the password and response with the request profile
 * @returns: res.json(req.profile) - this will response with the requested profile
 * returns the requested profile, in this case the user */
exports.read = (req, res) => {
    req.profile.hashed_password = undefined;
    req.profile.salt = undefined;
    return res.json(req.profile);
};

/** 
 * @param: req, res - will request the id and set new information to the body
 * @return: res.json(user): response with the new edited information  of the user 
 * update will find the user by id and update it using $set accordingly. Then 
 * a json response with the user is going to be returned */
exports.update = (req, res) => {
    User.findOneAndUpdate(
        { _id: req.profile._id },
        { $set: req.body },
        { new: true },
        (err, user) => {
            if (err) {
                return res.status(400).json({
                    error: "Sie haben keine Zugriffsrechte um das zu machen"
                });
            }
            user.hashed_password = undefined;
            user.salt = undefined;
            res.json(user);
        }
    );
};
