/**
 * @author: Sakhr Al-absi
 * @Gruppe: 6
 * @Matrikelnummer: s0562218
 */

const Category = require("../models/category");
const { errorHandler } = require("../helpers/dbErrorHandler");

/**
 * 
 * @param {*} req using to assign the requested category to the category id
 * @param {*} res to response with an error if there category is not found
 * @param {*} next will go to next category after finding the requested category
 * @param {*} id will be used to find the required category id
 */
exports.categoryById = (req, res, next, id) => {
    Category.findById(id).exec((err, category) => {
        if (err || !category) {
            return res.status(400).json({
                error: "Kategorie existiert nicht"
            });
        }
        req.category = category;
        next();
    });
};

/**
 * @param {*} req will request the created category from the body of the page
 * @param {*} res will response with data of the created category
 * 
 * A category is going to be created using the modules/category.js
 * the created category is going to be saved. 
 * 
 */
exports.create = (req, res) => {
    const category = new Category(req.body);
    category.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json({ data });
    });
};

/**
 * @param {*} req requests the category by id and
 * @param {*} res send a response with that category
 * @returns returns the category we want to get 
 */
exports.read = (req, res) => {
    return res.json(req.category);
};
/**
 * 
 * @param {*} req We already have a category. 
 *                This existing category will be assigned a new
 *                information. this new information will be edited on the page. 
 *                the const category will be then given this edited value of category from the page using req.category
 *                 category.name will be also updated by the same principal on the comment above
 * @param {*} res will response with the new data which got edited
 * 
 * The new edited category will be saved
 */
exports.update = (req, res) => {
    const category = req.category;
    category.name = req.body.name;
    category.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json(data);
    });
};

/**
 * 
 * @param {*} req the category in the page (requested with req.category) is going to be removed using exports.emove
 * @param {*} res the page will response with message "Kategorie geloescht"
 */
exports.remove = (req, res) => {
    const category = req.category;
    category.remove((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json({
            message: "Kategorie wurde gelöscht"
        });
    });
};

/**
 * 
 * @param {*} req 
 * @param {*} res will try to find all data bzw categories and return them as a repsonse
 */
exports.list = (req, res) => {
    Category.find().exec((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json(data);
    });
};
